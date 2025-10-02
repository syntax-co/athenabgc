"use client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GameCard({ game }) {
  return (
    <Card className="overflow-hidden max-h-[45vh]">
      {
        game.image? (
          <div className="h-[65%] w-full ">
            <img src={game.image} alt={game.title} className="w-full h-full object-contain" loading="lazy" />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-muted grid place-items-center text-xs text-muted-foreground">
            No image
          </div>
        )
      }

      <CardHeader className="">
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
