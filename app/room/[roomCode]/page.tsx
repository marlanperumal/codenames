import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { GameBoard } from "@/components/game-board";
import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/utils/supabase/server";
import { TeamVariant } from "@/components/ui/tile";
import { LogSidebar } from "@/components/log-sidebar";

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
        <header className="flex sticky top-0 bg-tile-neutral-background text-tile-neutral-foreground h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          {/* <Separator orientation="vertical" className="my-4 hidden md:block" /> */}
          <h2 className="hidden md:block text-yellow-800">Room</h2>
          <span>{roomCode}</span>
          {/* <Separator orientation="vertical" className="hidden md:block" /> */}
          <h2 className="hidden md:block text-yellow-800">Game</h2>
          <span>{player?.room?.current_game?.code}</span>
        </header>
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
        team={player?.team || "neutral"}
      />
    </SidebarProvider>
  );
}
