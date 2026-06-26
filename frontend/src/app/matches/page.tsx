import { TeamFlag } from "@/components/ui/team-flag";
import { getMatches } from "@/lib/api";
import Link from "next/link";

export default async function MatchesPage() {
  const data = await getMatches()
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Matches</h1>

      <ul className="mt-6 flex flex-col gap-3">
        {data.matches.map((match) => (
          <li key={match.id}>
            <Link href={`/matches/${match.id}`} className="block rounded-lg border border-zinc-200 px-4 py-3 hover:bg-zinc-50">
              <div className="flex items-center gap-2">
                  <TeamFlag 
                    crest={match.homeTeam.crest} 
                    name={match.homeTeam.name}
                  />
                  {match.homeTeam.name}
                  vs
                  <TeamFlag 
                    crest={match.awayTeam.crest} 
                    name={match.awayTeam.name}
                  />
                  {match.awayTeam.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}