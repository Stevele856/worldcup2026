export type Team = {
    id: number;
    name: string;
    crest: string;
}

// standings
export type StandingData = {
    group: string;
    table: {
        position: number;
        team: Team;
        playedGames: number;
        won: number;
        draw: number;
        lost: number;
        points: number;
    }[];
}

export type StandingResponse = {
    standings: StandingData[]
}

// matches
export type Match = {
    id: number;
    utcDate: string;
    status: string;
    homeTeam: Team;
    awayTeam: Team;
    score: {
        fullTime:{
            home: number | null;
            away : number | null;
        }
    }
}

export type MatchesResponse = {
    matches: Match[]
}

// scorers
export type Scorer = {
    player: {
        id: number;
        name: string
    }
    team: Team;
    goals: number;
    assists: number | null;
    penalties: number | null;
    playedMatches: number | null;
}

export type ScorersResponse = {
    scorers: Scorer[]
}