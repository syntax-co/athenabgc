"use client";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { withPrefix } from "@/lib/prefix";
import { ChevronRight, MapPin } from "lucide-react";
import React from "react";




// Athena Board Game Cafe – Human-crafted Landing Page
// React + Tailwind (no external UI libs). Designed to feel warm, real, and neighborhood-specific.
// Notes:
// - Purposefully asymmetric layout, tactile shadows, microcopy, and a photo collage to avoid a "template" feel.
// - Replace Unsplash photos with your own when ready (credit photographers as needed on your site).


const BASE = process.env.NEXT_PUBLIC_BASE_PATH || 'http://localhost:3000'
console.log(process.env.NEXT_PUBLIC_BASE_PATH)


const hours = [
  { day: "Wed – Fri", time: "5 pm – 9 pm" },
  { day: "Sat – Sun", time: "11 am – 9 pm" },
];

const address = {
  line1: "1412 W Lunt Ave",
  city: "Chicago, IL 60626",
  email: "contact@athenabgc.com",
};

// Simple, subtle noise texture as a data URL so there are no asset deps
const Noise = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
    style={{
      backgroundImage:
        "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'.8\' numOctaves=\'2\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.9\'/></svg>')",
    }}
  />
);

const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-300/70 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-[0_1px_0_rgba(0,0,0,.04)]">{children}</span>
);

const Polaroid = ({ src, alt, caption, rotate = "rotate-0", className = "" }) => (
  <figure className={`relative ${rotate} ${className}`}>
    <div className="bg-white p-2 rounded-[14px] shadow-[0_12px_30px_rgba(0,0,0,.18)] ring-1 ring-zinc-900/5">
      <img src={src} alt={alt} className="rounded-[10px] object-cover aspect-[4/3] w-full" loading="lazy" />
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

    // iOS → Apple Maps
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      window.location.href = `maps://maps.apple.com/?q=${address}`;
      return;
    }

    // Android → Google Maps App
    if (/android/i.test(navigator.userAgent)) {
      window.location.href = `geo:0,0?q=${address}`;
      return;
    }

    // Fallback → Google Maps in browser
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${address}`;
  }



  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory text-zinc-900 selection:bg-amber-200/60
    scroll-smooth scrollbar-minimal">
      <Header />

      {/* Hero: editorial headline + collage */}
      <section
        className="h-screen relative z-10 bg-cover bg-no-repeat bg-bottom bg-fixed flex flex-col snap-start"
        style={{ backgroundImage: `url(${withPrefix('/images/athena-background-2.png')})` }}
      >
        <div className="w-full  mt-auto px-16 
        flex items-center justify-center space-x-[6vw] font-display text-background
        
        text-[20vw] md:text-[11vw] lg:text-[11vw] xl:text-[11vw]
        h-1/3 md:h-1/4 lg:h-1/3 xl:h-1/3
        
        flex-col md:flex-col lg:flex-row xl:flex-row
        ">
          <div>Athena</div>
          <div className="ml-auto">Games</div>
        </div>
      </section>


      {/* Shop / Library — center snap target */}
      <section className="h-screen bg-primary flex items-center snap-center snap-always">
        <div
          className="h-full bg-no-repeat bg-fixed
          w-full md:w-full lg:w-1/3 xl:w-1/3 
          
          "
          style={{
            boxShadow: "6px 6px 10px #1d1d1d48",
            backgroundImage: `url(${withPrefix('/images/library.png')})`,
          }}
        >

          
          <div
          className="flex flex-col items-center justify-center
          h-full 
          lg:hidden xl:hidden
          "
          >

            <div className="mt-auto mb-auto
            flex flex-col items-center p-6" 
            >

              <div className="font-display text-background text-5xl mb-4"
              >
                Welcome!
              </div>
              
              <div className="indent-4 text-background font-primary
              backdrop-blur-[2px] bg-primary/50 rounded-md
              p-2 py-6"
              >
                Welcome! Come explore our shop and game library, where you’ll find a variety of board games. 
                <br /> <br />
                <div>
                  Whether you’re looking to try something new or bring home a classic favorite, we’ve got something for everyone to enjoy.
                </div>
              </div>


            </div>

            <div className="w-5/6 h-fit bg-foreground/50
            backdrop-blur-[2px] text-background
            flex items-center 
            rounded-md mb-3 p-4"
            >
              <div className="text-xl font-display">Explore Our Library</div>

              <ChevronRight size={40} 
              className="ml-auto"
              />
            </div>

            <div className="w-5/6 h-fit bg-foreground/50
            backdrop-blur-[2px] text-background
            flex items-center 
            rounded-md mb-3 p-4"
            >
              <div className="text-xl font-display">Peruse Our Shop</div>

              <ChevronRight size={40} 
              className="ml-auto"
              />
            </div>
          </div>


          

        </div>

        <div className="
        hidden md:hidden lg:flex xl:flex
        flex-1 h-full  flex-col items-center justify-center">
          <div className="w-full h-1/2 bg-primary flex justify-center">
            <div className="w-4/6 h-full text-background p-10 flex flex-col items-center justify-center">
              <div>
                <div className="text-3xl font-display">Explore Our Library</div>
                <div className="w-3/4 max-w-6xl text-lg mt-8 indent-3 font-primary leading-[170%] ml-6">
                  Bring the fun home! Our store is stocked with exclusive board games, accessories,
                  and must-have merch to level up your collection.
                  Whether you’re after a fan favorite or a hidden gem, we’ve got something for every kind of player.
                </div>
              </div>
              <div className="flex mt-5 w-full">
                <Button className="w-fit h-full ml-auto bg-secondary font-primary px-10 py-2 cursor-pointer text-lg hover:bg-secondary/80">
                  Explore
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full h-1/2 bg-secondary flex justify-center">
            <div className="w-4/6 h-full text-background p-10 flex flex-col items-center justify-center">
              <div>
                <div className="text-3xl font-display">Peruse The Shop</div>
                <div className="w-3/4 max-w-6xl text-lg mt-8 indent-3 font-primary leading-[170%] ml-6">
                  Bring the fun home! Our store is stocked with exclusive board games, accessories,
                  and must-have merch to level up your collection.
                  Whether you’re after a fan favorite or a hidden gem, we’ve got something for every kind of player.
                </div>
              </div>
              <div className="flex mt-5 w-full">
                <Button className="w-fit h-full ml-auto font-primary px-10 py-2 cursor-pointer text-lg">
                  Peruse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>







      <section
        className="h-screen  bg-cover bg-fixed flex items-center snap-start"
      style={{
        backgroundImage:`url(${withPrefix('/images/castle_valley_scene.png')})`
      }}
      >
        <div className="h-5/6 md:h-5/6 lg:h-4/6 xl:h-4/6 
        w-full mx-auto max-w-7xl px-4 sm:px-6  
        flex flex-col-reverse lg:flex-row xl:flex-row
        items-center md:items-center lg:items-start xl:items-start 
        ">
          <div className="h-full flex-1 
          bg-white rounded-md overflow-hidden ring-1 ring-zinc-900/5 shadow-[0_18px_40px_rgba(0,0,0,.12)]">
            <iframe
              title="Map to Athena Board Game Café"
              src="https://www.google.com/maps?q=1412%20W%20Lunt%20Ave%2C%20Chicago%2C%20IL%2060626&z=15&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className=" h-fit 
          ml-0 md:ml-0 lg:ml-6 xl:ml-6 
          w-full md:w-full lg:w-1/3 xl:w-1/3
          ">
            <div className=" font-display-bold text-background px-4 py-6 rounded-md
            text-2xl md:text-2xl lg:text-4xl xl:text-4xl
            ">
              Looking For Us?
            </div>
            <div className="px-6 indent-4 rounded-md text-background font-primary text-lg leading-[150%]
            bg-primary py-4 
            hidden md:hidden xl:block lg:block
            ">
              Come roll the dice in person! Our space is designed for players to gather,
              compete, and connect. Whether you’re here for a quick game, a full tournament,
              or just to explore the shelves, we’ve got a seat waiting for you.
            </div>

            <div className="flex mt-2 w-fit mb-4 mx-auto
            text-background bg-secondary p-2 rounded-md"
            >
              <MapPin />

              <div className="ml-2 cursor-pointer"
              onClick={() => {openInMaps()}}
              >
                1412 W Lunt Ave, Chicago, IL 60626
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}