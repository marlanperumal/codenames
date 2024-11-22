"use client";

import React, { useOptimistic } from "react";

import { cn } from "@/lib/utils";
import { flipTile } from "@/app/actions";

const colorVariants = {
  unknown: "bg-tile-unknown-background text-tile-unknown-foreground ",
  neutral:
    "bg-tile-neutral-background text-tile-neutral-background hover:text-tile-neutral-foreground",
  red: "bg-tile-red-background text-tile-red-background hover:text-tile-red-foreground",
  blue: "bg-tile-blue-background text-tile-blue-background hover:text-tile-blue-foreground",
  death:
    "bg-tile-death-background text-tile-death-background hover:text-tile-death-foreground",
};

export type WordVariant = "blue" | "red" | "unknown" | "neutral" | "death";

const Tile = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    tileId: number;
    variant?: WordVariant;
    selected?: boolean;
    word?: string;
  }
>(
  (
    {
      className,
      tileId,
      variant = "unknown",
      selected = false,
      word,
      ...props
    },
    ref
  ) => {
    const [optimisticSelected, setOptimisticSelected] =
      useOptimistic<boolean>(selected);
    const flipTileHandler = async () => {
      setOptimisticSelected((prev) => !prev);
      await flipTile(tileId);
    };
    return (
      <form action={flipTileHandler} className="flex">
        <button
          role="button"
          ref={ref}
          className={cn(
            `flex w-full items-center justify-center rounded-xl p-1 lg:p-4 border shadow-md uppercase cursor-pointer transition-all ease-in-out duration-500 text-xs lg:text-lg ${
              optimisticSelected
                ? colorVariants[variant]
                : colorVariants["unknown"]
            }`,
            className
          )}
          disabled={optimisticSelected}
          aria-label={word}
          {...props}
        >
          <span>{word}</span>
        </button>
      </form>
    );
  }
);
Tile.displayName = "Tile";

const TileBoard = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-5 gap-1 lg:gap-4 p-1 lg:p-4 flex-grow",
        className
      )}
      {...props}
    />
  )
);
TileBoard.displayName = "TileBoard";

export { Tile, TileBoard };
