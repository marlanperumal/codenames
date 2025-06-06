"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  roomCode: z
    .union([
      z.string().length(6, {
        message: "Room Code must be exactly 6 characters.",
      }),
      z.string().length(0),
    ])
    .transform((code) => code.toUpperCase())
    .optional(),
});

export async function launchFromHome(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    await supabase.auth.signInAnonymously();
    return redirect("/");
  }

  const validatedFormData = formSchema.safeParse({
    name: formData.get("name"),
    roomCode: formData.get("roomCode"),
  });

  if (!validatedFormData.success) {
    return redirect("/");
  }

  const { name, roomCode } = validatedFormData.data;

  const newRoomCode = roomCode?.toUpperCase() ||
    Math.random().toString(36).substring(2, 8).toUpperCase();

  let { data: room } = await supabase
    .from("room")
    .select()
    .eq("code", newRoomCode)
    .single();

  if (!room) {
    ({ data: room } = await supabase
      .from("room")
      .insert({
        code: newRoomCode,
      })
      .select()
      .single());
  }

  await supabase.from("player").upsert({
    id: user.id,
    name: name,
    current_room_id: room?.id,
  });

  return redirect(`/room/${newRoomCode}`);
}

export const flipTile = async (tileId: number) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase
    .from("tile")
    .update({
      is_selected: true,
      selected_by_user_id: user?.id,
    })
    .eq("id", tileId);

  revalidatePath(`/room/[roomCode]`, "page");
};

export const changeTeam = async (team: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    await supabase.auth.signInAnonymously();
    return;
  }

  await supabase
    .from("player")
    .update({
      team,
    })
    .eq("id", user.id);

  revalidatePath(`/room/[roomCode]`, "page");
};

export const toggleSpymaster = async (isSpymaster: boolean) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    await supabase.auth.signInAnonymously();
    return;
  }

  await supabase
    .from("player")
    .update({
      is_spymaster: isSpymaster,
    })
    .eq("id", user.id);

  revalidatePath(`/room/[roomCode]`, "page");
};

export const changeName = async (name: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    await supabase.auth.signInAnonymously();
    return;
  }

  await supabase
    .from("player")
    .update({
      name,
    })
    .eq("id", user.id);

  revalidatePath(`/room/[roomCode]`, "page");
};

export const completeGame = async (gameId: number) => {
  const supabase = await createClient();

  await supabase
    .from("game")
    .update({
      is_complete: true,
    })
    .eq("id", gameId);

  revalidatePath(`/room/[roomCode]`, "page");
};

export const newGame = async (roomCode: string) => {
  const supabase = await createClient();

  const { data: room } = await supabase.from("room").select().eq(
    "code",
    roomCode,
  ).single();

  if (!room) {
    redirect("/");
  }

  const { data: game } = await supabase.from("game").insert({
    room_id: room.id,
  }).select().single();

  if (!game) {
    redirect("/");
  }

  await supabase.from("room").update({ current_game_id: game.id }).eq(
    "id",
    room.id,
  );

  revalidatePath(`/room/[roomCode]`, "page");
};
