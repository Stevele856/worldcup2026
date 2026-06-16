package handlers

import (
	"net/http"
	"time"
	"worldcup2026/services"
)

func GetTopScorers(w http.ResponseWriter, r *http.Request) {
	data, err := services.Fetch("/competitions/WC/scorers", map[string]string{}, 1*time.Hour)
	if err != nil {
		http.Error(w, `{"error": "failed to fetch top scorers"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func GetTopAssists(w http.ResponseWriter, r *http.Request) {
	data, err := services.Fetch("/competitions/WC/scorers", map[string]string{}, 1*time.Hour)

	if err != nil {
		http.Error(w, `{"error": "failed to fetch top assists"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
