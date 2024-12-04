"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RealtimePresenceState } from "@supabase/realtime-js";
import { Search, Glasses } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

function PlayerList({
  players,
}: {
  players: {
    name: string;
    team: string;
    isSpymaster: boolean;
    presence_ref: string;
  }[];
}) {
  return (
    <div className="flex-1 flex-col gap-1">
      {players.map((player) => (
        <SidebarMenuItem
          className={`bg-tile-${player.team}-background text-tile-${player.team}-foreground pl-2 flex-1 rounded-sm mb-1`}
          key={player.presence_ref}
        >
          <div className="flex items-center justify-center text-center text-sm gap-1">
            {player.isSpymaster ? <Glasses size={16} /> : <Search size={16} />}
            <span>{player.name}</span>
          </div>
        </SidebarMenuItem>
      ))}
    </div>
  );
}

export function LogSidebar({
  roomCode,
  roomId,
  gameId,
  name,
  team,
  isSpymaster,
}: {
  roomCode: string;
  roomId: number;
  gameId: number;
  name: string;
  team: string;
  isSpymaster: boolean;
}) {
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [players, setPlayers] = useState<
    { name: string; team: string; isSpymaster: boolean; presence_ref: string }[]
  >([]);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase.channel(roomCode);
    channel
      .on("presence", { event: "sync" }, () => {
        const newState: RealtimePresenceState<{
          name: string;
          team: string;
          isSpymaster: boolean;
        }> = channel.presenceState();
        console.log("sync", newState);
        setPlayers(Object.entries(newState).map(([, value]) => value[0]));
      })
      // .on("presence", { event: "join" }, ({ key, newPresences }) => {
      //   console.log("join", key, newPresences);
      //   setLogMessages((messages) => [
      //     ...messages,
      //     `${newPresences[0].name} joined the room`,
      //   ]);
      // })
      // .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      //   console.log("leave", key, leftPresences);
      //   setLogMessages((messages) => [
      //     ...messages,
      //     `${leftPresences[0].name} left the room`,
      //   ]);
      // })
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "tile",
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log(payload);
          setLogMessages((messages) => [
            ...messages,
            `Tile ${payload.new.id} flipped`,
          ]);
          router.refresh();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "game",
          filter: `id=eq.${gameId}`,
        },
        (payload) => {
          console.log(payload);
          setLogMessages((messages) => [...messages, `Game completed`]);
          router.refresh();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "room",
          filter: `id=eq.${roomId}`,
        },
        (payload) => {
          console.log(payload);
          setLogMessages((messages) => [...messages, `New game started`]);
          router.refresh();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "player",
          filter: `current_room_id=eq.${roomId}`,
        },
        (payload) => {
          console.log(payload);
          setLogMessages((messages) => [
            ...messages,
            `${payload.new.name} became ${
              payload.new.is_spymaster ? "spymaster" : "normal"
            } on the ${payload.new.team} team`,
          ]);
        }
      )
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }

        const presenceTrackStatus = await channel.track({
          name,
          team,
          isSpymaster,
        });
        console.log(presenceTrackStatus);
      });

    return () => {
      channel.untrack();
      channel.unsubscribe();
    };
  }, [supabase, roomCode, roomId, name, team, isSpymaster, gameId, router]);
  return (
    <Sidebar
      collapsible="none"
      side="right"
      className="sticky hidden xl:flex top-0 h-svh border-l xl:w-[360px] overflow-hidden"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Players</SidebarGroupLabel>
          <SidebarMenu>
            <div className="flex gap-1">
              <PlayerList
                players={players.filter((player) => player.team === "red")}
              />
              <PlayerList
                players={players.filter((player) => player.team === "blue")}
              />
            </div>
            <PlayerList
              players={players.filter((player) => player.team === "neutral")}
            />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Log</SidebarGroupLabel>
          <SidebarMenu className="overflow-auto max-h-[600px]">
            {logMessages.toReversed().map((message, i) => (
              <SidebarMenuItem key={i} className="text-sm">
                {message}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
