"use client";
import GameCard from "./GameCard";

export default function GameGrid({ games }) {
  return (
    <div className="min-h-[80vh] grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((g, i) => (
        <GameCard key={`${g.title}-${i}`} game={g} />
      ))}
    </div>
  );
}
