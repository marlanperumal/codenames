import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GameBoard } from "@/components/game-board";
import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function Room({
  params,
}: {
  params: { roomCode: string };
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

  let { data: player } = await supabase
    .from("player")
    .select(
      `id, name, current_room_id, room (id, code, current_game:game!room_current_game_id_fkey (id, code, is_complete, tiles:tile ( position, team, is_selected, word ( word ) )))`
    )
    // .order("position", { referencedTable: "tiles" })
    .eq("id", user?.id)
    .single();

  console.log(player);

  if (player?.room?.code !== roomCode) {
    const { data: room } = await supabase
      .from("room")
      .select()
      .eq("code", roomCode)
      .single();
    ({ data: player } = await supabase
      .from("player")
      .update({
        id: user.id,
        current_room_id: room?.id,
      })
      .eq("id", user.id)
      .select()
      .single());
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Room</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>{roomCode}</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block">
                |
              </BreadcrumbSeparator>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">Game</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {player?.room?.current_game?.code}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <GameBoard tiles={player?.room?.current_game?.tiles} />
      </SidebarInset>
    </SidebarProvider>
  );
}
