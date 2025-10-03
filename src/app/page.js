"use client";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
 
// No BASE here — next/image will automatically apply basePath from next.config.mjs.

const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-300/70 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-[0_1px_0_rgba(0,0,0,.04)]">
    {children}
  </span>
);

const Polaroid = ({ src, alt, caption, rotate = "rotate-0", className = "" }) => (
  <figure className={`relative ${rotate} ${className}`}>
    <div className="bg-white p-2 rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,.18)] ring-1 ring-zinc-900/5">
      <div className="relative aspect-[4/3] w-full rounded-[10px] overflow-hidden">
        <Image
          src={src}           // pass root-relative paths like "/images/foo.png"
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          priority={false}
          style={{ objectFit: "cover" }}
        />
      </div>
      {caption && (
        <figcaption className="text-[11px] text-zinc-600 mt-1 px-1">{caption}</figcaption>
      )}
    </div>
    <svg className="absolute -top-3 -left-3" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <circle cx="18" cy="18" r="18" className="fill-amber-400/90" />
    </svg>
  </figure>
);

export default function AthenaLandingPage() {
  const openInMaps = () => {
    const address = encodeURIComponent("1412 W Lunt Ave, Chicago, IL 60626");
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      window.location.href = `maps://maps.apple.com/?q=${address}`;
      return;
    }
    if (/android/i.test(navigator.userAgent)) {
      window.location.href = `geo:0,0?q=${address}`;
      return;
    }
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_BASE_PATH)
    console.log(process.env.NEXT_PUBLIC_SITE_URL)
  }, []);

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory text-zinc-900 selection:bg-amber-200/60 scroll-smooth scrollbar-minimal">
      <Header />

      {/* Hero with background image using <Image fill /> */}
      <section className="h-screen relative z-10 flex flex-col snap-start">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/athena-background-2.png"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "bottom" }}
          />
        </div>

        <div className="w-full mt-auto px-16 flex items-center justify-center space-x-[6vw] font-display text-background
                        text-[20vw] md:text-[11vw] lg:text-[11vw] xl:text-[11vw]
                        h-1/3 md:h-1/4 lg:h-1/3 xl:h-1/3
                        flex-col md:flex-col lg:flex-row xl:flex-row">
          <div>Athena</div>
          <div className="ml-auto">Games</div>
        </div>
      </section>

      {/* Shop / Library — left image panel now uses <Image /> instead of CSS background */}
      <section className="h-screen bg-primary flex items-center snap-center snap-always">
        <div className="relative h-full w-full md:w-full lg:w-1/3 xl:w-1/3 " style={{ boxShadow: "6px 6px 10px #1d1d1d48" }}>
          <Image className=""
            src="/images/library.png"
            alt="Game library shelves"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />

          {/* mobile overlay content */}
          <div className="flex flex-col items-center justify-center h-full lg:hidden xl:hidden relative z-10">
            {/* ... unchanged ... */}
          </div>
        </div>  

        {/* right column ... unchanged ... */}
      </section>

      {/* Bottom section with scenic background via <Image fill /> */}
      <section className="h-screen relative bg-cover bg-fixed flex items-center snap-start">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/castle_valley_scene.png"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        </div>

        <div className="h-5/6 md:h-5/6 lg:h-4/6 xl:h-4/6 w-full mx-auto max-w-7xl px-4 sm:px-6 flex flex-col-reverse lg:flex-row xl:flex-row items-center md:items-center lg:items-start xl:items-start">
          {/* map + text ... unchanged ... */}
        </div>
      </section>
    </main>
  );
}
