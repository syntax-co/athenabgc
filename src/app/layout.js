// app/layout.js
import "./globals.css";
import { Montserrat_Alternates, Raleway } from "next/font/google";

// Explicit weights are required for these families
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
      <head>{/* next/font handles loading; no <link> tags needed */}</head>
      <body className="antialiased bg-primary">{children}</body>
    </html>
  );
}
