package handlers

import (
	"net/http"
	"time"
	"worldcup2026/services"
)

func GetMatches(w http.ResponseWriter, r *http.Request) {
	date := r.URL.Query().Get("date")

	params := map[string]string{}
	if date != "" {
		params["dateFrom"] = date
		params["dateTo"] = date
	}

	data, err := services.Fetch("/competitions/WC/matches", params, 30*time.Minute)
	if err != nil {
		http.Error(w, `{"error": "failed to fetch matches"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func GetMatchDetail(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"error": "match ID is required"}`, http.StatusBadRequest)
		return
	}

	data, err := services.Fetch("/matches/"+id, map[string]string{}, 10*time.Minute)
	if err != nil {
		http.Error(w, `{"error": "failed to fetch match detail"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func GetLiveMatches(w http.ResponseWriter, r *http.Request) {
	data, err := services.Fetch("/competitions/WC/matches", map[string]string{"status": "LIVE"}, 10*time.Minute)
	if err != nil {
		http.Error(w, `{"error": "failed to fetch live matches"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
