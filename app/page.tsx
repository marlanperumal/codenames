import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { HomeForm } from "@/app/home-form";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-start pt-8 lg:pt-0 lg:items-center justify-center px-4">
      <Card className="w-full max-w-xs">
        <CardHeader>
          <Logo />
        </CardHeader>
        <CardContent>
          <HomeForm />
        </CardContent>
      </Card>
    </div>
  );
}
