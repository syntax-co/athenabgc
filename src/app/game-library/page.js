// src/app/game-library/page.js (or wherever this file lives)
import GameLibrary from "@/components/game-libary/GameLibrary";
import Header from "@/components/header";
import { withPrefix } from "@/lib/prefix";
import Image from "next/image";

export default function Library() {
  return (
    <div className="w-full min-h-screen bg-primary">
      <Header />

      {/* Hero background via next/image (no BASE needed) */}
      <section className="relative h-screen w-full flex flex-col bg-center bg-fixed overflow-hidden">
        <Image
          src={withPrefix("/images/castle_scene.png")}
          alt=""
          fill
          sizes="100vw"
          priority={false}
          style={{ objectFit: "cover" }}
        />
        <div
          className="text-background font-display mt-auto flex justify-center
                     text-[20vw] md:text-[16vw] lg:text-[13vw] xl:text-[10vw]"
        >
          <div className="w-5/6">Games</div>
        </div>
      </section>

      <div className="bg-primary z-30 relative pt-24">
        <GameLibrary />
      </div>
    </div>
  );
}
