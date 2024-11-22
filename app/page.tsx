"use server";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { HomeForm } from "@/app/home-form";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
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
    .select(`id, name, current_room_id, room (id, code)`)
    .eq("id", user?.id)
    .single();

  return (
    <div className="flex h-screen w-full items-start pt-8 md:pt-0 md:items-center justify-center px-4">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <Logo />
        </CardHeader>
        <CardContent>
          <HomeForm
            name={player?.name || null}
            roomCode={player?.room?.code || null}
          />
        </CardContent>
      </Card>
    </div>
  );
}
