"use client";

import React from "react";

import { Home, CirclePlus, CircleCheck, Glasses } from "lucide-react";
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
import { changeTeam } from "@/app/actions";
import { cn } from "@/lib/utils";

const TeamButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    team: string;
  }
>(({ className, team, ...props }, ref) => {
  const changeTeamHandler = async () => {
    await changeTeam(team);
  };
  return (
    <button
      ref={ref}
      className={cn(
        `flex grow items-center justify-center bg-tile-${team}-background text-tile-${team}-foreground p-2 rounded-lg shadow-md w-10`,
        className
      )}
      formAction={changeTeamHandler}
      aria-label={team}
      {...props}
    >
      {team}
    </button>
  );
});
TeamButton.displayName = "TeamButton";

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
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
              <Link href="#">
                <>
                  <CirclePlus />
                  <span>New Game</span>
                </>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <>
                  <CircleCheck />
                  <span>End Game</span>
                </>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <>
                  <Glasses />
                  <span>Become Spymaster</span>
                </>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form className="flex items-center justify-items gap-2">
              <TeamButton team="red" />
              <TeamButton team="neutral" />
              <TeamButton team="blue" />
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
