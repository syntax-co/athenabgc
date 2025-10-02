// src/lib/base-path.js
export const BASE =
  process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH !== "/"
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

export const asset = (p = "") => `${BASE}${p.startsWith("/") ? p : `/${p}`}`;
