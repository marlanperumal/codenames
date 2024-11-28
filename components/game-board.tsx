"use client";

import { Tile, TileBoard, WordVariant, TeamVariant } from "./ui/tile";

export function GameBoard({
  tiles,
  isSpymaster = false,
  isComplete = false,
}: {
  tiles: {
    id: number;
    position: number | null;
    team: string;
    is_selected: boolean | null;
    word: { word: string } | null;
  }[];
  team: TeamVariant;
  isSpymaster: boolean;
  isComplete: boolean;
}) {
  return (
    <div className="flex flex-col flex-1 p-2">
      <TileBoard>
        {tiles.map((tile) => (
          <Tile
            tileId={tile.id}
            key={tile.id}
            variant={tile.team as WordVariant}
            word={tile.word?.word}
            selected={tile.is_selected || false}
            isComplete={isComplete}
            isSpymaster={isSpymaster}
          />
        ))}
      </TileBoard>
    </div>
  );
}
