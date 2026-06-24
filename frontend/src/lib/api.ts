import { MatchesResponse, ScorersResponse, StandingResponse, Match } from "./types"

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

export async function getJSON<T>(path: string): Promise<T>{
    const res = await fetch(`${BASE}${path}`, {cache: "no-store"})
    if (!res.ok){
       throw new Error(`API error ${res.status}`) 
    }

    return res.json() as Promise<T>
}

export function getMatches() {
    return getJSON<MatchesResponse>("/api/matches")
}

export function getStandings() {
    return getJSON<StandingResponse>("/api/standings")
}

export function getScorers() {
    return getJSON<ScorersResponse>("/api/scorers")
}

export function getMatchDetail(id: string){
    return getJSON<Match>(`/api/matches/detail?id=${id}`)
}