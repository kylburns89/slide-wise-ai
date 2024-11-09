"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Presentation, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Presentation className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              SlideAI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/presentations"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/presentations" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Presentations
            </Link>
            <Link
              href="/templates"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/templates" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Templates
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
              <span className="sr-only">New presentation</span>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}