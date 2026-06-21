import { getMatches } from "@/lib/api";

export default async function MatchesPage() {
  const data = await getMatches()
  return (
    <main>
      <h1>Matches</h1>

      <ul>
        {data.matches.map((match) => (
          <li key={match.id}>
            {match.homeTeam.name} vs {match.awayTeam.name}
          </li>
        ))}
      </ul>
    </main>
  );
}