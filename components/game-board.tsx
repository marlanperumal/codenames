"use client";

import { Tile, TileBoard, WordVariant } from "./ui/tile";

export function GameBoard({
  tiles,
}: {
  tiles: {
    id: number;
    position: number | null;
    team: string;
    is_selected: boolean | null;
    word: { word: string } | null;
  }[];
}) {
  return (
    <TileBoard>
      {tiles.map((tile) => (
        <Tile
          tileId={tile.id}
          key={tile.id}
          variant={tile.team as WordVariant}
          word={tile.word?.word}
          selected={tile.is_selected || false}
        />
      ))}
    </TileBoard>
  );
}
