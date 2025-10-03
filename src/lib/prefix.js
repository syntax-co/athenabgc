// src/lib/prefix.js
export const prefix =
  process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH !== "/"
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

export const withPrefix = (p = "") =>
  `${prefix}${p.startsWith("/") ? p : `/${p}`}`;
