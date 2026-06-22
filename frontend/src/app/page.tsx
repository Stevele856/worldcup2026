import { getMatches } from "@/lib/api";

export default async function Home() {
  const data = await getMatches();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">World Cup 2026</h1>
      <p className="mt-1 text-zinc-600">Matches overview</p>

      <ul className="mt-6 flex flex-col gap-3">
        {data.matches.map((match) => {
          const { home, away } = match.score.fullTime;
          const played = home !== null && away !== null;

          return (
            <li
              key={match.id}
              className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3"
            >
              <span className="font-medium">
                {match.homeTeam.name} vs {match.awayTeam.name}
              </span>

              <span className="text-zinc-600">
                {played ? `${home} - ${away}` : match.status}
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
