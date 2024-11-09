"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Presentation, MoreVertical, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - replace with actual data fetching
const mockPresentations = [
  {
    id: 1,
    title: "Q1 Business Review",
    slides: 12,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-21"),
  },
  {
    id: 2,
    title: "Product Launch Strategy",
    slides: 8,
    createdAt: new Date("2024-03-19"),
    updatedAt: new Date("2024-03-19"),
  },
];

export function PresentationList() {
  const [presentations] = useState(mockPresentations);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Recent Presentations
          </h2>
          <p className="text-sm text-muted-foreground">
            Create and manage your presentations
          </p>
        </div>
        <Link href="/presentations/new">
          <Button>New Presentation</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {presentations.map((presentation) => (
          <div
            key={presentation.id}
            className="group relative rounded-lg border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Presentation className="h-6 w-6" />
                <h3 className="font-semibold">{presentation.title}</h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {presentation.slides} slides
              </p>
              <p className="text-sm text-muted-foreground">
                Created {format(presentation.createdAt, "PPP")}
              </p>
            </div>
            <Link
              href={`/presentations/${presentation.id}`}
              className="absolute inset-0"
            >
              <span className="sr-only">View presentation</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}