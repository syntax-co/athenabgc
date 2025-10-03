// app/layout.js
import "./globals.css";
import { Montserrat_Alternates, Raleway } from "next/font/google";

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-montserrat-alt",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-raleway",
  display: "swap",
});

// Read from your build env (the workflow already sets this), fall back to your Pages URL:
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://syntax-co.github.io/athenabgc";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/athenabgc";

export const metadata = {
  title: "Athena Gaming Cafe",
  description: "",
  metadataBase: new URL(BASE_PATH), // ✅ critical for Pages

  // If you have social images, make them basePath-aware:
  // openGraph: { images: [`${BASE_PATH}/og-cover.jpg`] },
  // twitter: { images: [`${BASE_PATH}/og-cover.jpg`] },

  icons: {
    // Root-relative is fine; Next will resolve using metadataBase
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scrollbar-minimal ${montserrat.variable} ${raleway.variable}`}
    >
      <head>{/* next/font handles loading */}</head>
      <body className="antialiased bg-primary">{children}</body>
    </html>
  );
}
