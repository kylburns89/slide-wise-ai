"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorSidebarProps {
  slides: Array<{ id: string; content: string }>;
  currentSlide: number;
  onSlideSelect: (index: number) => void;
}

export function EditorSidebar({
  slides,
  currentSlide,
  onSlideSelect,
}: EditorSidebarProps) {
  return (
    <div 
      className="w-64 border-r bg-muted/40"
      role="complementary"
      aria-label="Slide navigation"
    >
      <div className="p-4 border-b">
        <Button 
          className="w-full" 
          size="sm"
          aria-label="Add new slide"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Slide
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => onSlideSelect(index)}
              className={cn(
                "w-full p-2 text-left rounded-md hover:bg-accent transition-colors",
                currentSlide === index && "bg-accent"
              )}
              aria-label={`Slide ${index + 1}`}
              aria-current={currentSlide === index ? "true" : undefined}
            >
              <div className="text-xs font-medium">Slide {index + 1}</div>
              <div className="text-xs text-muted-foreground truncate">
                {slide.content.split("\n")[0]}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}