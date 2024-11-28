import "./globals.css";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { ThemeProvider } from "@/components/theme-provider";
import { PlayerContextProvider } from "../components/player-context";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Codenames",
  description:
    "An implementation of the popular boardgame Codenames using Next.js, Supabase Realtime, Shadcn, Tailwind, Typescript and Vercel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  if (!player) {
    return;
  }

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={"antialiased"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PlayerContextProvider initialPlayer={player}>
            <main>{children}</main>
          </PlayerContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
