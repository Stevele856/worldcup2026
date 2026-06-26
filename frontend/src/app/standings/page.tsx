import { TeamFlag } from "@/components/ui/team-flag";
import { getStandings } from "@/lib/api";

export default async function StandingsPage() {
  const data = await getStandings();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Standings</h1>

      <div className="mt-6 flex flex-col gap-8">
        {data.standings.map((standing) => (
          <section key={standing.group}>
            <h2 className="mb-2 font-semibold">{standing.group}</h2>

            <table className="w-full table-fixed border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-zinc-500">
                  <th className="w-8 py-2 pr-2">#</th>
                  <th className="w-16 py-2 pr-2">Team</th>
                  <th className="w-16 py-2 pr-2 text-center">P</th>
                  <th className="w-16 py-2 pr-2 text-center">W</th>
                  <th className="w-16 py-2 pr-2 text-center">D</th>
                  <th className="w-16 py-2 pr-2 text-center">L</th>
                  <th className="w-12 py-2 pr-2 text-center font-semibold">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standing.table.map((field) => (
                  <tr key={field.team.id} className="border-b border-zinc-100">
                    <td className="py-2 pr-2 text-zinc-500">{field.position}</td>
                    <td className="py-2 pr-2">
                      <div className="flex items-center gap-2">
                        <TeamFlag crest={field.team.crest} name={field.team.name} />
                        <span className="min-w-0 truncate font-medium">{field.team.name}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-2 text-center">{field.playedGames}</td>
                    <td className="py-2 pr-2 text-center">{field.won}</td>
                    <td className="py-2 pr-2 text-center">{field.draw}</td>
                    <td className="py-2 pr-2 text-center">{field.lost}</td>
                    <td className="py-2 pr-2 text-center font-semibold">{field.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </main>
  );
}