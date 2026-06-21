import { getStandings } from "@/lib/api";

export default async function StandingsPage() {
  const data = await getStandings();

  return (
    <main>
      <h1>Standings</h1>

      {data.standings.map((standing) => (
        <section key={standing.group}>
          <h2>{standing.group}</h2>

          <ul>
            {standing.table.map((field) => (
              <li key={field.team.id}>
                {field.position} - {field.team.name} - Played:{" "}
                {field.playedGames} | Win: {field.won} | Draw: {field.draw} |
                Lost: {field.lost} | Total points: {field.points}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}