"use client"

import { Match } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TeamFlag } from "./team-flag";

const LIST = 10

export function MatchList({matches}: {matches: Match[]}) {
    const [visibleCount, setVisibleCount] = useState(LIST)
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    const hasMore = visibleCount < matches.length

    useEffect(() =>{
        if (!hasMore) return
        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting){
                setVisibleCount((c) => Math.min(c + LIST, matches.length))
            }
        })

        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [hasMore, matches.length])

    return (
        <>
            <ul className="mt-4 flex flex-col gap-3">
                {matches.slice(0, visibleCount).map((match,index) =>{
                    const {home, away} = match.score.fullTime
                    const played = home !== null && away !== null;

                    return(
                    <li 
                        key={match.id}
                        className="flex animate-in items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 fade-in slide-in-from-bottom-4 fill-mode-both duration-800"
                        style={{animationDelay: `${(index % LIST)*120}ms`}}
                    >
                        <Link href={`/matches/${match.id}`} className="flex w-full items-center justify-between">
                            
                            <div className="flex items-center justify-between">
                            <TeamFlag crest={match.homeTeam.crest} name={match.homeTeam.name} className="mr-2"/>
                            {match.homeTeam.name}
                            <span className="px-4 text-zinc-400">vs</span>
                            <TeamFlag crest={match.awayTeam.crest} name={match.awayTeam.name} className="mr-2"/>
                            {match.awayTeam.name}
                            </div>

                            <span className="text-zinc-600">
                            {played ? `${home} - ${away}` : match.status}
                            </span>
                        </Link>
                    </li>
                )
                })}
            </ul>
            {hasMore && (
                <div ref={sentinelRef} className="py-6 text-center text-sm text-zinc-400">
                    Loading more...
                </div>
            )}
        </>

    )
}

