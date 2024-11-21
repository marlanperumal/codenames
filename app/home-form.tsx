"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/theme-selector";
import { useUserContext } from "../components/user-context";
import { useEffect } from "react";

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

export function HomeForm() {
  const router = useRouter();
  const { name, roomCode, setName, setRoomCode } = useUserContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      roomCode: "",
    },
  });

  useEffect(() => {
    form.setValue("name", name);
  }, [form, name]);

  useEffect(() => {
    form.setValue("roomCode", roomCode);
  }, [form, roomCode]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    setName(data.name);
    if (data.roomCode) {
      setRoomCode(data.roomCode);
      router.push(`/room/${data.roomCode}`);
    } else {
      const newRoomCode = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      setRoomCode(newRoomCode);
      router.push(`/room/${newRoomCode}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your Room Code"
                />
              </FormControl>
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
      </form>
    </Form>
  );
}
