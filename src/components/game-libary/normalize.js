// Utility + normalization helpers

export function lowerKeyMap(obj = {}) {
  const map = new Map();
  Object.keys(obj).forEach((k) => map.set(k.toLowerCase(), obj[k]));
  return map;
}

export function pick(obj, candidates = []) {
  const m = lowerKeyMap(obj);
  for (const c of candidates) {
    const v = m.get(c.toLowerCase());
    if (v !== undefined && v !== null && String(v).trim() !== "") return v;
  }
  return "";
}

export function pickNumber(obj, candidates = []) {
  const v = pick(obj, candidates);
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function derivePlayers(obj) {
  const text = pick(obj, ["players", "player", "player count", "# players", "num players", "playersText"]);
  const min = pickNumber(obj, ["playersMin", "min players", "min"]);
  const max = pickNumber(obj, ["playersMax", "max players", "max"]);

  if (min && max) return { text: `${min}–${max}`, min, max };
  if (min && !max) return { text: `${min}+`, min, max: null };
  if (!min && max) return { text: `Up to ${max}`, min: null, max };
  if (text) return { text, min: null, max: null };
  return { text: "", min: null, max: null };
}

export function derivePlaytime(obj) {
  const playtimeText = pick(obj, ["playtime", "play time", "time", "minutes", "mins", "duration", "playtimeText"]);
  const playtimeMinutes = pickNumber(obj, ["playtimeMinutes", "minutes", "mins"]);
  return { playtimeText, playtimeMinutes: Number.isFinite(playtimeMinutes) ? playtimeMinutes : null };
}

export function normalizeGames(games) {
  return (games || []).map((g) => {
    const title = pick(g, ["title", "game", "name", "game title"]);
    const category = pick(g, ["category", "type", "genre", "collection"]);
    const image = pick(g, ["image", "image url", "img", "cover", "thumbnail", "photo"]);
    const description = pick(g, ["description", "desc", "about", "notes", "details"]);
    const price = pick(g, ["price", "msrp", "cost"]);
    const link = pick(g, ["link", "url", "website", "page"]);

    const { text: playersText, min: playersMin, max: playersMax } = derivePlayers(g);
    const { playtimeText, playtimeMinutes } = derivePlaytime(g);

    return {
      title: title || "Untitled",
      category,
      image,
      description,
      price,
      link,
      playersText,
      playersMin,
      playersMax,
      playtimeText,
      playtimeMinutes,
      _raw: g,
    };
  });
}
