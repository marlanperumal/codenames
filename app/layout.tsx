import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserContextProvider } from "../components/user-context";

export const metadata: Metadata = {
  title: "Codenames",
  description:
    "An implementation of the popular boardgame Codenames using Next.js, Supabase Realtime, Shadcn, Tailwind, Typescript and Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"antialiased"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserContextProvider>
            <main>{children}</main>
          </UserContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
