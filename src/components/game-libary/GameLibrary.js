"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { normalizeGames } from "./normalize";

import games from "@/json_files/game-inventory.json";
import GameControls from "./GameControls";
import GameGrid from "./GameGrid";
import PaginationBar from "./PaginationBar";




export default function GameLibrary() {
  const data = useMemo(() => normalizeGames(games), [games]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [playersFilter, setPlayersFilter] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => setPage(1), [query, category, playersFilter, sortBy, data.length]);

  const categories = useMemo(() => {
    const set = new Set();
    data.forEach((g) => g.category && set.add(g.category));
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const nPlayers = Number(playersFilter) || null;

    let arr = data.filter((g) => {
      const matchesQuery =
        !q || g.title.toLowerCase().includes(q) || (g.description || "").toLowerCase().includes(q) || (g.category || "").toLowerCase().includes(q);

      const matchesCategory = category === "all" || (g.category || "") === category;

      const matchesPlayers = nPlayers
        ? (g.playersMin == null && g.playersMax == null) ||
          (g.playersMin != null && g.playersMax != null && nPlayers >= g.playersMin && nPlayers <= g.playersMax) ||
          (g.playersMin != null && g.playersMax == null && nPlayers >= g.playersMin) ||
          (g.playersMin == null && g.playersMax != null && nPlayers <= g.playersMax)
        : true;

      return matchesQuery && matchesCategory && matchesPlayers;
    });

    switch (sortBy) {
      case "title-asc":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        arr.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "playtime-asc":
        arr.sort((a, b) => (a.playtimeMinutes ?? 1e9) - (b.playtimeMinutes ?? 1e9));
        break;
      case "playtime-desc":
        arr.sort((a, b) => (b.playtimeMinutes ?? -1) - (a.playtimeMinutes ?? -1));
        break;
    }

    return arr;
  }, [data, query, category, playersFilter, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSlice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);


  const changePage = (newpage) => {
    setPage(newpage)
    
  }


  return (
    <div className="w-full">
      <Card className="w-full max-w-7xl mx-auto border-none bg-[#d1d1d100]">
        <CardContent className="space-y-4">
          <GameControls
            query={query}
            setQuery={setQuery}
            category={category}
            setCategory={setCategory}
            categories={categories}
            playersFilter={playersFilter}
            setPlayersFilter={setPlayersFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <div className="text-sm text-muted-foreground">
            {total} game{total === 1 ? "" : "s"} • Page {page} of {totalPages}
          </div>

          <GameGrid games={pageSlice} />

          <PaginationBar page={page} setPage={changePage} total={total} totalPages={totalPages} pageSize={pageSize} />
        </CardContent>
      </Card>
    </div>
  );
}
