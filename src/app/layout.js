// app/layout.js
import "./globals.css";
import { Montserrat_Alternates, Raleway } from "next/font/google";

// ✅ Use next/font to avoid the warning about custom fonts
const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  variable: "--font-montserrat-alt",
  display: "swap",
});
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata = {
  title: "Athena Gaming Cafe",
  description: "",
  icons: {
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
      <head>
        {/* next/font handles font loading; no need for <link> tags */}
      </head>
      <body className="antialiased bg-primary">{children}</body>
    </html>
  );
}
