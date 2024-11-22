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

  const newRoomCode =
    roomCode?.toUpperCase() ||
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

  await supabase
    .from("tile")
    .update({
      is_selected: true,
    })
    .eq("id", tileId)

  revalidatePath(`/room/[roomCode]`, 'page');
}
