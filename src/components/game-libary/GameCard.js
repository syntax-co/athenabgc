"use client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { withPrefix } from "@/lib/prefix";

export default function GameCard({ game }) {
  return (
    <Card className="overflow-hidden 
    py-1 md:py-2 lg:py-6 xl:py-6
    flex-row md:flex-row lg:flex-col xl:flex-col 

    max-h-[12vh]
    md:max-h-[12vh]
    lg:max-h-[45vh]
    xl:max-h-[45vh]
    ">
      {
        game.image? (
          <div className="
          h-full md:h-full lg:h-[65%] xl:h-[65%]  
          w-1/4 md:w-1/4 lg:w-full xl:w-full
          ">
            <img src={withPrefix(game.image)} alt={game.title} className="w-full h-full object-contain" loading="lazy" />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-muted grid place-items-center text-xs text-muted-foreground">
            No image
          </div>
        )
      }

      <CardHeader className="flex-1">
        <CardTitle className="text-base leading-tight line-clamp-2">{game.title}</CardTitle>
        <CardDescription className="flex flex-wrap gap-1">
          {game.category && <Badge variant="outline">{game.category}</Badge>}
          {game.playersText && <Badge variant="outline">{game.playersText} players</Badge>}
          {game.playtimeText && <Badge variant="outline">{game.playtimeText}</Badge>}
          {game.price && <Badge variant="secondary">{game.price}</Badge>}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
