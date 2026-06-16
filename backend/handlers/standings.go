package handlers

import (
	"net/http"
	"time"
	"worldcup2026/services"
)

func GetStandings(w http.ResponseWriter, h *http.Request) {
	data, err := services.Fetch("/competitions/WC/standings", map[string]string{}, 1*time.Hour)

	if err != nil {
		http.Error(w, `{"error": "failed to fetch standings"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
