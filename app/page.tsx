import Link from "next/link";
import { ArrowRight, Presentation, Sparkles, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Presentation className="h-16 w-16 text-primary" />
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create stunning presentations with AI
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Transform your ideas into professional presentations in minutes. Powered by AI, designed for you.
          </p>
          <div className="space-x-4">
            <Link href="/presentations/new">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Sparkles className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Generate professional content and layouts with advanced AI
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Palette className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">Customizable</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from beautiful themes and customize every detail
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <svg
                className="h-12 w-12 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <div className="space-y-2">
                <h3 className="font-bold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Create presentations in minutes, not hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}