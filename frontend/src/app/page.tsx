import { MatchList } from "@/components/ui/match-lists";
import { getMatches } from "@/lib/api";

export default async function Home() {
  const data = await getMatches();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
        {/* Hero banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-sky-500 to-violet-600 px-8 py-14 text-center text-white shadow-lg">
        {/* soft glow accents */}
        <div className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-8 size-44 rounded-full bg-amber-300/30 blur-3xl" />

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">FIFA World Cup</p>
        <h1 className="mt-2 text-6xl font-black tracking-tight drop-shadow-sm">2026 ⚽</h1>
        <p className="mt-4 text-lg font-semibold text-white/95">🇺🇸 USA · 🇨🇦 Canada · 🇲🇽 Mexico</p>
        <p className="mt-1 text-sm text-white/75">48 teams · 104 matches · one trophy 🏆</p>
      </section>

      <h2 className="mt-10 text-2xl font-bold">Matches</h2>

      <MatchList matches={data.matches} />
    </main>
  );
}
