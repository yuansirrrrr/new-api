package controller

import (
	"bytes"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/dto"
	"github.com/QuantumNous/new-api/logger"
	"github.com/QuantumNous/new-api/model"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/QuantumNous/new-api/relay/helper"
	"github.com/QuantumNous/new-api/service"
	"github.com/QuantumNous/new-api/types"

	"github.com/gin-gonic/gin"
)

const assetAuditTrackIDBytes = 16

func RelayAssetAuditUploadSync(c *gin.Context) {
	relayAssetAudit(c, http.MethodPost, "/api/asset/upload/sync")
}

func RelayAssetAuditUploadAsync(c *gin.Context) {
	relayAssetAudit(c, http.MethodPost, "/api/asset/upload/async")
}

func RelayAssetAuditTask(c *gin.Context) {
	taskID := strings.TrimSpace(c.Param("task_id"))
	if taskID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    "invalid_request",
			"message": "task_id is required",
		})
		return
	}
	relayAssetAudit(c, http.MethodGet, "/api/task/"+url.PathEscape(taskID))
}

func relayAssetAudit(c *gin.Context, method string, upstreamPath string) {
	if common.GetContextKeyInt(c, constant.ContextKeyChannelType) != constant.ChannelTypeZLHubAsset {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    "invalid_channel_type",
			"message": "asset audit requests require a ZLHubAsset channel",
		})
		return
	}

	info := newAssetAuditRelayInfo(c)
	priceData, err := helper.ModelPriceHelperPerCall(c, info)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    "model_price_error",
			"message": err.Error(),
		})
		return
	}
	info.PriceData = priceData

	if !priceData.FreeModel {
		if apiErr := service.PreConsumeBilling(c, priceData.Quota, info); apiErr != nil {
			c.JSON(apiErr.StatusCode, gin.H{"error": apiErr.ToOpenAIError()})
			return
		}
	}

	resp, respBody, err := doAssetAuditRequest(c, method, upstreamPath)
	if err != nil {
		if info.Billing != nil {
			info.Billing.Refund(c)
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    "do_request_failed",
			"message": err.Error(),
		})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode >= http.StatusBadRequest {
		if info.Billing != nil {
			info.Billing.Refund(c)
		}
		service.IOCopyBytesGracefully(c, resp, respBody)
		return
	}

	if err := service.SettleBilling(c, info, priceData.Quota); err != nil {
		logger.LogError(c, fmt.Sprintf("asset audit settle billing failed: %v", err))
	}
	recordAssetAuditConsumeLog(c, info, priceData.Quota, upstreamPath)

	service.IOCopyBytesGracefully(c, resp, respBody)
}

func newAssetAuditRelayInfo(c *gin.Context) *relaycommon.RelayInfo {
	startTime := common.GetContextKeyTime(c, constant.ContextKeyRequestStartTime)
	if startTime.IsZero() {
		startTime = time.Now()
	}
	tokenGroup := common.GetContextKeyString(c, constant.ContextKeyTokenGroup)
	if tokenGroup == "" {
		tokenGroup = common.GetContextKeyString(c, constant.ContextKeyUserGroup)
	}
	info := &relaycommon.RelayInfo{
		RequestId:       c.GetString(common.RequestIdKey),
		UserId:          common.GetContextKeyInt(c, constant.ContextKeyUserId),
		UsingGroup:      common.GetContextKeyString(c, constant.ContextKeyUsingGroup),
		UserGroup:       common.GetContextKeyString(c, constant.ContextKeyUserGroup),
		UserQuota:       common.GetContextKeyInt(c, constant.ContextKeyUserQuota),
		UserEmail:       common.GetContextKeyString(c, constant.ContextKeyUserEmail),
		TokenId:         common.GetContextKeyInt(c, constant.ContextKeyTokenId),
		TokenKey:        common.GetContextKeyString(c, constant.ContextKeyTokenKey),
		TokenUnlimited:  common.GetContextKeyBool(c, constant.ContextKeyTokenUnlimited),
		TokenGroup:      tokenGroup,
		OriginModelName: constant.AssetAuditModelName,
		StartTime:       startTime,
		RelayFormat:     types.RelayFormatOpenAI,
	}
	info.InitChannelMeta(c)
	return info
}

func doAssetAuditRequest(c *gin.Context, method string, upstreamPath string) (*http.Response, []byte, error) {
	var body io.Reader
	if method != http.MethodGet {
		storage, err := common.GetBodyStorage(c)
		if err != nil {
			return nil, nil, err
		}
		bodyBytes, err := storage.Bytes()
		if err != nil {
			return nil, nil, err
		}
		body = bytes.NewReader(bodyBytes)
	}

	baseURL := strings.TrimRight(common.GetContextKeyString(c, constant.ContextKeyChannelBaseUrl), "/")
	if baseURL == "" {
		baseURL = strings.TrimRight(constant.ChannelBaseURLs[constant.ChannelTypeZLHubAsset], "/")
	}
	req, err := http.NewRequestWithContext(c.Request.Context(), method, baseURL+upstreamPath, body)
	if err != nil {
		return nil, nil, err
	}

	trackID, err := newAssetAuditTrackID()
	if err != nil {
		return nil, nil, err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("X-Access-Token", common.GetContextKeyString(c, constant.ContextKeyChannelKey))
	req.Header.Set("X-Track-Id", trackID)

	proxy := ""
	if setting, ok := common.GetContextKeyType[dto.ChannelSettings](c, constant.ContextKeyChannelSetting); ok {
		proxy = setting.Proxy
	}
	client, err := service.GetHttpClientWithProxy(proxy)
	if err != nil {
		return nil, nil, err
	}
	resp, err := client.Do(req)
	if err != nil {
		if resp != nil && resp.Body != nil {
			_ = resp.Body.Close()
		}
		return nil, nil, err
	}
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		_ = resp.Body.Close()
		return nil, nil, err
	}
	resp.Body = io.NopCloser(bytes.NewReader(respBody))
	return resp, respBody, nil
}

func newAssetAuditTrackID() (string, error) {
	buf := make([]byte, assetAuditTrackIDBytes)
	if _, err := rand.Read(buf); err != nil {
		return "", err
	}
	return hex.EncodeToString(buf), nil
}

func recordAssetAuditConsumeLog(c *gin.Context, info *relaycommon.RelayInfo, quota int, upstreamPath string) {
	model.RecordConsumeLog(c, info.UserId, model.RecordConsumeLogParams{
		ChannelId:      info.ChannelId,
		ModelName:      constant.AssetAuditModelName,
		TokenName:      c.GetString("token_name"),
		Quota:          quota,
		Content:        fmt.Sprintf("asset audit request: %s", upstreamPath),
		TokenId:        info.TokenId,
		UseTimeSeconds: int(time.Since(info.StartTime).Seconds()),
		Group:          info.UsingGroup,
		Other: map[string]interface{}{
			"asset_audit": true,
			"path":        upstreamPath,
		},
	})
}
