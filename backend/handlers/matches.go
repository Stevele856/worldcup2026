package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	"worldcup2026/services"
)

func GetMatches(w http.ResponseWriter, r *http.Request) {
	date := r.URL.Query().Get("date")

	params := map[string]string{}
	if date != "" {
		params["date"] = date
	}

	data, err := services.Fetch("/fixtures", params, 30*time.Minute)
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

	data, err := services.Fetch("/fixtures", map[string]string{"id": id}, 10*time.Minute)
	if err != nil {
		http.Error(w, `{"error": "failed to fetch match detail"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func GetLiveMatches(w http.ResponseWriter, r *http.Request) {
	data, err := services.Fetch("/fixtures", map[string]string{"live": "all"}, 10*time.Minute)
	if err != nil {
		http.Error(w, `{"error": "failed to fetch live matches"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func GetMatchEvents(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, `{"error": "match ID is required"}`, http.StatusBadRequest)
		return
	}

	type MatchEvents struct {
		Events json.RawMessage `json:"events"`
	}

	data, err := services.Fetch("/fixtures/events", map[string]string{"fixture": id}, 10*time.Minute)
	if err != nil {
		http.Error(w, `{"error": "failed to fetch matche events"}`, http.StatusBadGateway)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)

}
