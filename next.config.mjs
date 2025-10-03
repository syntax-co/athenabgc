// next.config.mjs
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: base,                 // "/athenabgc" on Pages, "" locally
  assetPrefix: base || undefined, // <-- important tweak
};

export default nextConfig;
