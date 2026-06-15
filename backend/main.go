package main

import (
	"log"
	"net/http"
	"os"
	"worldcup2026/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main(){
	r :=  chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:3000",
			"https://*.vercel.app",
		},
		AllowedMethods: []string{"GET"},
		AllowedHeaders: []string{"Accept", "Content-Type"},
	}))

	// Routes
	r.Route("/api", func(r chi.Router) {
		r.Get("/matches", handlers.GetMatches)
		r.Get("/matches/live", handlers.GetLiveMatches)
		r.Get("/matches/detail", handlers.GetMatchDetail)
		r.Get("/matches/events", handlers.GetMatchEvents)
		r.Get("/standings", handlers.GetStandings)
		r.Get("/scorers", handlers.GetTopScorers)
		r.Get("/assists", handlers.GetTopAssists)
	})

	// Start server
	port := os.Getenv("PORT")
	if port == ""{
		port = "8080"
	}

	log.Println("Server running on port " + port)
	if err := http.ListenAndServe(":"+port,r); err != nil {
		log.Fatal(err)
	}
}