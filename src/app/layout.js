// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Athena Gaming Cafe",
  description: "",
  // Point metadataBase to your Pages site root
  // For user/org root site: https://username.github.io
  // For project pages: https://username.github.io/repo-name
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://syntax-co.github.io/athenabgc"),
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
    <html lang="en" className="scrollbar-minimal">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;200;300;400;500;600;700;800;900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-primary">{children}</body>
    </html>
  );
}
