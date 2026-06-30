//  match detail

import { TeamFlag } from "@/components/ui/team-flag";
import { getMatchDetail } from "@/lib/api";

export default async function GetMatchDetail({params,}:{params: Promise<{id: string}>}) {
    const { id } = await params;
    const match = await getMatchDetail(id)

    const {home, away} = match.score.fullTime
    const played = home !== null && away !== null

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-10">
            <p className="text-sm text-zinc-500">{match.status}</p>

            <div className="mt-4 flex items-center justify-center gap-6 text-2xl font-bold">
                <span className="flex items-center gap-2">
                    <TeamFlag crest={match.homeTeam.crest} name={match.homeTeam.name} className="size-7" />
                    {match.homeTeam.name}
                </span>
                <span>{played ? `${home} - ${away}`: "vs"}</span>
                  <span className="flex items-center gap-2">
                    <TeamFlag crest={match.awayTeam.crest} name={match.awayTeam.name} className="size-7" />
                    {match.awayTeam.name}
                </span>
            </div>

            <p className="mt-4 text-center text-zinc-500">
                {new Date(match.utcDate).toLocaleString()}
            </p>
        </main>
    )
}
