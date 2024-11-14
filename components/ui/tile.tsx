import React from "react";

import { cn } from "@/lib/utils";

const colorVariants = {
  unknown: "bg-tile-unknown-background text-tile-unknown-foreground ",
  neutral:
    "bg-tile-neutral-background text-tile-neutral-background hover:text-tile-neutral-foreground",
  red: "bg-tile-red-background text-tile-red-background hover:text-tile-red-foreground",
  blue: "bg-tile-blue-background text-tile-blue-background hover:text-tile-blue-foreground",
  death:
    "bg-tile-death-background text-tile-death-background hover:text-tile-death-foreground",
};

type WordVariant = "blue" | "red" | "unknown" | "neutral" | "death";

const Tile = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    variant?: WordVariant;
    selected?: boolean;
    word?: string;
  }
>(
  (
    { className, variant = "unknown", selected = false, word, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        `flex items-center justify-center rounded-xl p-4 border ${
          selected ? colorVariants[variant] : colorVariants["unknown"]
        } shadow-md uppercase cursor-pointer transition-all ease-in-out duration-500`,
        className
      )}
      aria-label={word}
      {...props}
    >
      <span>{word}</span>
    </div>
  )
);
Tile.displayName = "Tile";

const TileBoard = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid grid-cols-5 gap-4 p-4 flex-grow", className)}
      {...props}
    />
  )
);
TileBoard.displayName = "TileBoard";

export { Tile, TileBoard };
