"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RealtimePresenceState } from "@supabase/realtime-js";

export function LogSidebar({
  roomCode,
  roomId,
  gameId,
  name,
  team,
}: {
  roomCode: string;
  roomId: number;
  gameId: number;
  name: string;
  team: string;
}) {
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [players, setPlayers] = useState<
    { name: string; team: string; presence_ref: string }[]
  >([]);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase.channel(roomCode);
    channel
      .on("presence", { event: "sync" }, () => {
        const newState: RealtimePresenceState<{ name: string; team: string }> =
          channel.presenceState();
        console.log("sync", newState);
        setPlayers(Object.entries(newState).map(([, value]) => value[0]));
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("join", key, newPresences);
        setLogMessages((messages) => [
          ...messages,
          `${newPresences[0].name} joined the room`,
        ]);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("leave", key, leftPresences);
        setLogMessages((messages) => [
          ...messages,
          `${leftPresences[0].name} left the room`,
        ]);
      })
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
        });
        console.log(presenceTrackStatus);
      });

    return () => {
      channel.untrack();
      channel.unsubscribe();
    };
  }, [supabase, roomCode, roomId, name, team, gameId, router]);
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Teams</SidebarGroupLabel>
          <SidebarMenu>
            {players.map((player) => (
              <SidebarMenuItem key={player.presence_ref}>
                {player.name} {player.team}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Log</SidebarGroupLabel>
          <SidebarMenu>
            {logMessages.map((message, i) => (
              <SidebarMenuItem key={i}>{message}</SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
