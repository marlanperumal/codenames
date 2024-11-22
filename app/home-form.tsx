"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/theme-selector";
import { launchFromHome } from "./actions";

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

export function HomeForm({
  name,
  roomCode,
}: {
  name: string | null;
  roomCode: string | null;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      roomCode: roomCode || "",
    },
  });

  return (
    <Form {...form}>
      <form action={launchFromHome} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter your Name" />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Code</FormLabel>
              <FormControl>
                <Input {...field} type="text" className="uppercase" />
              </FormControl>
              <FormDescription>
                Leave this empty to start a new room
              </FormDescription>
              <FormMessage>
                {form.formState.errors.roomCode?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-stretch">
          <Button type="submit">Join Room</Button>
          <div className="flex items-center justify-end ml-2">
            <ThemeSelector />
          </div>
        </div>
        <input hidden {...form.register("roomCode")} />
      </form>
    </Form>
  );
}
