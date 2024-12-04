import { SidebarTrigger } from "./ui/sidebar";

export function AppTopbar({
  roomCode,
  gameCode,
  team = "neutral",
}: {
  roomCode: string;
  gameCode: string;
  team: "neutral" | "red" | "blue";
}) {
  return (
    <header
      className={`flex sticky top-0 bg-tile-${team}-background text-tile-${team}-foreground h-16 shrink-0 items-center gap-2 border-b px-4`}
    >
      <SidebarTrigger className="-ml-1" />
      {/* <Separator orientation="vertical" className="my-4 hidden md:block" /> */}
      <h2 className="hidden md:block">Room</h2>
      <span>{roomCode}</span>
      {/* <Separator orientation="vertical" className="hidden md:block" /> */}
      <h2 className="hidden md:block">Game</h2>
      <span>{gameCode}</span>
    </header>
  );
}
