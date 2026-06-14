package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
	"worldcup2026/cache"
)

const (
	baseURL = "https://v3.football.api-sports.io/"
	league  = "1"
	season  = "2026"
)

type APIResponse struct {
	Response json.RawMessage `json:"response"`
	Errors   json.RawMessage `json:"errors"`
	Result   int             `json:"result"`
}

var apiCache = cache.New()

func Fetch(endpoint string, params map[string]string, ttl time.Duration) ([]byte, error) {
	cacheKey := buildCacheKey(endpoint, params)
	if cached, ok := apiCache.Get(cacheKey); ok {
		return cached, nil
	}

	req, err := http.NewRequest("GET", baseURL+endpoint, nil)

	if err != nil {
		return nil, fmt.Errorf("faled to create request; %w", err)
	}

	req.Header.Set("x-apisports-key", os.Getenv("KEY"))

	q := req.URL.Query()
	q.Set("league", league)
	q.Set("season", season)

	// Loops through extra params
	for k, v := range params {
		q.Set(k, v)
	}
	req.URL.RawQuery = q.Encode()

	// Timeout
	client := http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)

	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API returned status: %d", resp.StatusCode)
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	apiCache.Set(cacheKey, data, ttl)

	return data, nil
}

func buildCacheKey(endpoint string, params map[string]string) string {
	key := endpoint
	for k, v := range params {
		key += fmt.Sprintf("_%s=%s", k, v)
	}

	return key
}
