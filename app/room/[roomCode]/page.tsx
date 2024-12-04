import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GameBoard } from "@/components/game-board";
import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/utils/supabase/server";
import { TeamVariant } from "@/components/ui/tile";
import { LogSidebar } from "@/components/log-sidebar";
import { AppTopbar } from "@/components/app-topbar";

export default async function Room({
  params,
}: {
  params: Promise<{ roomCode: string }>;
}) {
  const { roomCode } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    await supabase.auth.signInAnonymously();
    return;
  }

  const { data: player } = await supabase
    .from("player")
    .select(
      `id, name, current_room_id, team, is_spymaster, room (
        id, code, current_game:game!room_current_game_id_fkey (
          id, code, is_complete, tiles:tile (
            id, position, team, is_selected, word (
              word 
            ) 
          )
        )
      )`
    )
    .eq("id", user?.id)
    .single();

  const orderedTiles =
    player?.room?.current_game?.tiles?.sort(
      (a, b) => a.position - b.position
    ) || [];

  const tileCounts = {
    red: orderedTiles.filter((tile) => tile.team === "red" && !tile.is_selected)
      .length,
    neutral: orderedTiles.filter(
      (tile) => tile.team === "neutral" && !tile.is_selected
    ).length,
    blue: orderedTiles.filter(
      (tile) => tile.team === "blue" && !tile.is_selected
    ).length,
  };

  return (
    <SidebarProvider>
      <AppSidebar
        isSpymaster={player?.is_spymaster || false}
        tileCounts={tileCounts}
        gameId={player?.room?.current_game?.id || 0}
        roomCode={roomCode}
      />
      <SidebarInset>
        <AppTopbar
          roomCode={roomCode}
          gameCode={player?.room?.current_game?.code || ""}
          team={(player?.team as "neutral" | "red" | "blue") || "neutral"}
        />
        <GameBoard
          tiles={orderedTiles}
          team={(player?.team as TeamVariant) || "neutral"}
          isSpymaster={player?.is_spymaster || false}
          isComplete={player?.room?.current_game?.is_complete || false}
        />
      </SidebarInset>
      <LogSidebar
        roomCode={roomCode}
        roomId={player?.room?.id || 0}
        gameId={player?.room?.current_game?.id || 0}
        name={player?.name || "Player"}
        team={(player?.team as "red" | "blue" | "neutral") || "neutral"}
        isSpymaster={player?.is_spymaster || false}
      />
    </SidebarProvider>
  );
}
