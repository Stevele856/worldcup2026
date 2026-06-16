package services

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
	"worldcup2026/cache"
)

const baseURL = "https://api.football-data.org/v4"

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

	req.Header.Set("X-Auth-Token", os.Getenv("KEY"))

	q := req.URL.Query()
	// Loops through extra params
	for k, v := range params {
		q.Set(k, v)
	}
	req.URL.RawQuery = q.Encode()

	// Timeout
	client := &http.Client{Timeout: 10 * time.Second}

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
