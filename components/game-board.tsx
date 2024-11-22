"use client";

import { Tile, TileBoard, WordVariant } from "./ui/tile";

export function GameBoard({
  tiles,
}: {
  tiles: {
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
          key={tile.word?.word}
          variant={tile.team as WordVariant}
          word={tile.word?.word}
          selected={tile.is_selected || false}
        />
      ))}
    </TileBoard>
  );
}
