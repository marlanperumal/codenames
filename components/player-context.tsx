"use client";

import { createClient } from "@/utils/supabase/client";
import {
  createContext,
  Dispatch,
  useContext,
  useOptimistic,
  ReactNode,
  useEffect,
} from "react";

type Tile = {
  id: number;
  position: number;
  team: string;
  is_selected: boolean | null;
  word: {
    word: string;
  } | null;
};

type Game = {
  id: number;
  code: string | null;
  is_complete: boolean;
  tiles: Tile[];
};

type Room = {
  id: number;
  code: string | null;
  current_game: Game | null;
};

type Player = {
  id: string;
  name: string;
  current_room_id: number | null;
  team: string | null;
  is_spymaster: boolean | null;
  room: Room | null;
};

type PlayerContext = {
  player: Player;
  setPlayer: Dispatch<Player>;
};

const PlayerContext = createContext<PlayerContext>({
  player: {
    id: "",
    name: "Player",
    current_room_id: null,
    team: null,
    is_spymaster: null,
    room: null,
  },
  setPlayer: () => {},
});

export function PlayerContextProvider({
  children,
  initialPlayer,
}: {
  children: ReactNode;
  initialPlayer: Player;
}) {
  const [player, setPlayer] = useOptimistic(initialPlayer);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase.channel(player?.room?.code || "");
    channel.on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "tile",
        filter: `game_id=eq.${player?.room?.current_game?.id}`,
      },
      (payload) => {
        setPlayer({
          ...player,
          room: {
            ...(player?.room as Room),
            current_game: {
              ...(player?.room?.current_game as Game),
              tiles:
                player?.room?.current_game?.tiles.map((tile) =>
                  tile.id === payload.new.id ? (payload.new as Tile) : tile
                ) ?? [],
            },
          },
        });
      }
    );
  }, [
    supabase,
    player,
    player?.room?.code,
    player?.room?.current_game?.id,
    player?.room?.current_game?.tiles,
    setPlayer,
  ]);

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error(
      "usePlayerContext must be used within a PlayerContextProvider"
    );
  }
  return context;
};
