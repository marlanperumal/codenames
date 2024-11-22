"use client";

import { Tile, TileBoard, WordVariant } from "./ui/tile";

export function GameBoard({
  tiles,
}: {
  tiles: {
    position: number;
    team: WordVariant;
    is_selected: boolean | null;
    word: { word: string };
  }[];
}) {
  return (
    <TileBoard>
      {tiles.map((tile) => (
        <Tile
          key={tile.word.word}
          variant={tile.team}
          word={tile.word.word}
          selected={tile.is_selected || false}
        />
      ))}
    </TileBoard>
  );
}
