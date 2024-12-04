"use client";

import React from "react";

import { Home, CirclePlus, CircleCheck, Glasses, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { ThemeSelector } from "@/components/theme-selector";
import { Logo } from "@/components/logo";
import { UserMenu } from "@/components/user-menu";
import Link from "next/link";
import {
  changeTeam,
  toggleSpymaster,
  completeGame,
  newGame,
} from "@/app/actions";
import { cn } from "@/lib/utils";

const TeamButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    team: string;
    remaining: number;
  }
>(({ className, team, remaining, ...props }, ref) => {
  const changeTeamHandler = async () => {
    await changeTeam(team);
  };
  return (
    <button
      ref={ref}
      className={cn(
        `flex grow items-center justify-center bg-tile-${team}-background text-tile-${team}-foreground p-2 rounded-lg shadow-md`,
        className
      )}
      formAction={changeTeamHandler}
      aria-label={team}
      {...props}
    >
      {remaining}
    </button>
  );
});
TeamButton.displayName = "TeamButton";

export function AppSidebar({
  isSpymaster,
  tileCounts,
  gameId,
  roomCode,
}: {
  isSpymaster: boolean;
  tileCounts: Record<string, number>;
  gameId: number;
  roomCode: string;
}) {
  const toggleSpymasterHandler = async () => {
    await toggleSpymaster(!isSpymaster);
  };
  const completeGameHandler = async () => {
    await completeGame(gameId);
  };
  const newGameHandler = async () => {
    await newGame(roomCode);
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <>
                  <Home />
                  <span>Home</span>
                </>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={newGameHandler}>
                <>
                  <CirclePlus />
                  <span>New Game</span>
                </>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={completeGameHandler}>
                <>
                  <CircleCheck />
                  <span>End Game</span>
                </>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button onClick={toggleSpymasterHandler}>
                <>
                  {isSpymaster ? <Search /> : <Glasses />}
                  <span>Become {isSpymaster ? "Normal" : "Spymaster"}</span>
                </>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form className="flex items-center justify-items p-2 gap-2">
              <TeamButton team="red" remaining={tileCounts.red} />
              <TeamButton team="neutral" remaining={tileCounts.neutral} />
              <TeamButton team="blue" remaining={tileCounts.blue} />
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-stretch">
          <UserMenu />
          <div className="flex items-center justify-end ml-2">
            <ThemeSelector />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
