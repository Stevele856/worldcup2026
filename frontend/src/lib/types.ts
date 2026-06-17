export type Team = {
    id: number;
    name: string;
    crest: string;
}

// standings
export type StandingData = {
    position: string;
    team: Team;
    playGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}

export type StandingResponse = {
    stage: string;
    group: string;
    table: StandingData[]
}[]

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
    match: Match[]
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
}

export type ScorersResponse = {
    scorers: Scorer[]
}