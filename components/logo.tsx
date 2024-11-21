import { Egg } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center">
      <div className="flex aspect-square size-8 rounded-lg items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
        <Egg className="size-4" />
      </div>
      <div className="ml-2">
        <span className="text-2xl">codenames</span>
      </div>
    </div>
  );
}
