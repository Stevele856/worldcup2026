import { getScorers } from "@/lib/api";


export default async function ScorersPage() {
  const data = await getScorers()
  return (
    <main>
      <h1>Scorers</h1>

      <ul>
        {data.scorers.map((scorer) => (
          <li key={scorer.player.id}>
            {scorer.player.name} | Team: {scorer.team.name} | Played: {scorer.playedMatches} | Scored: {scorer.goals}
          </li>
        ))}
      </ul>
    </main>
  )
}