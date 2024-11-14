"use client";

import { useImmer } from "use-immer";
import { Tile, TileBoard, WordVariant } from "./ui/tile";

function generateWordArray(wordCounts: {
  [key: string]: number;
}): WordVariant[] {
  const words: WordVariant[] = [];

  for (const [word, count] of Object.entries(wordCounts)) {
    for (let i = 0; i < count; i++) {
      words.push(word as WordVariant);
    }
  }

  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  return words;
}

const wordVariants = generateWordArray({
  red: 9,
  blue: 8,
  neutral: 7,
  death: 1,
  unknown: 0,
});

const initialTiles = Array.from({ length: 25 }).map((_, index) => ({
  id: index,
  word: `Card ${index + 1}`,
  variant: wordVariants[index],
  selected: false,
}));

export function GameBoard() {
  const [tiles, setTiles] = useImmer(initialTiles);

  const toggleSelected = (id: number) => {
    setTiles((draft) => {
      draft[id].selected = !draft[id].selected;
    });
  };
  return (
    <TileBoard>
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          variant={tile.variant}
          word={tile.word}
          selected={tile.selected}
          onClick={() => toggleSelected(tile.id)}
        />
      ))}
    </TileBoard>
  );
}
