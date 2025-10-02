// app/layout.js
import "./globals.css";

const BASE =
  process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH !== "/"
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

export const metadata = {
  title: "Athena Gaming Cafe",
  description: "",
  // Next.js will prefix these with basePath when they're absolute or when using metadataBase,
  // but we’ll be explicit to avoid surprises.
  icons: {
    icon: [
      { url: `${BASE}/favicon.ico` },
      { url: `${BASE}/favicon.png`, sizes: "32x32", type: "image/png" },
      { url: `${BASE}/favicon.svg`, type: "image/svg+xml" },
    ],
    apple: { url: `${BASE}/apple-touch-icon.png`, sizes: "180x180" },
    shortcut: `${BASE}/favicon.ico`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scrollbar-minimal">
      <head>
        {/* These are fine as-is; they don't depend on your base path */}
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
        {/* Remove the hard-coded favicon tag since metadata.icons covers it with BASE */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
      <body className="antialiased bg-primary">{children}</body>
    </html>
  );
}
