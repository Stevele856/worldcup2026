import { getScorers } from "@/lib/api";


export default async function ScorersPage() {
  const data = await getScorers()

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold">Top Scorers</h1>

      <table className="mt-6 w-full table-fixed border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-left text-zinc-500">
            <th className="w-8 py-2 pr-2">#</th>
            <th className="py-2 pr-2">Player</th>
            <th className="py-2 pr-2">Team</th>
            <th className="w-12 py-2 pr-2">P</th>
            <th className="w-14 py-2 pr-2 text-center font-semibold">Goals</th>
          </tr>
        </thead>

        <tbody>
          {data.scorers.map((scorer,index) => (
            <tr key={scorer.player.id} className="border-b border-zinc-100">
              <td className="py-2 pr-2 text-zinc-500">{index + 1}</td>
              <td className="truncate py-2 pr-2 font-medium">
                {scorer.player.name}
              </td>
              <td className="truncate py-2 pr02 text-zinc-600">
                {scorer.team.name}
              </td>

              <td className="py-2 pr-2">
                {scorer.playedMatches ?? "-"}
              </td>

              <td className="py-2 pr-2 text-center font-semibold">
                {scorer.goals}
              </td>
            </tr>
          ))}
        </tbody>  
      </table>    
    </main>
  )
}