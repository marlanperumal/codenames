"use client";

import { useState, useOptimistic } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronUp, User } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { changeName } from "@/app/actions";

const changeNameSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export function UserMenu({ name }: { name: string }) {
  const form = useForm<z.infer<typeof changeNameSchema>>({
    resolver: zodResolver(changeNameSchema),
    defaultValues: {
      name: name || "",
    },
  });
  const [open, setOpen] = useState(false);
  const [optimisticName, setOptimisticName] = useOptimistic(name);

  const changeNameHandler = async () => {
    const name = form.getValues("name");
    console.log(name);
    setOptimisticName(name);
    await changeName(name);
    setOpen(false);
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User /> {optimisticName || "Player"}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <span>Change Name</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <Form {...form}>
              <form action={changeNameHandler}>
                <DialogHeader>
                  <DialogTitle>Change Name</DialogTitle>
                  <DialogDescription>
                    This is the name other players will see you displayed as
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder={optimisticName}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button>Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
