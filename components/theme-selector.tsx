"use client";

import Image from "next/image";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeSelect: (themeId: string) => void;
}

export function ThemeSelector({ selectedTheme, onThemeSelect }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeSelect(theme.id)}
          className={cn(
            "relative aspect-video rounded-lg overflow-hidden group",
            "ring-2 ring-transparent transition-all",
            selectedTheme === theme.id && "ring-primary"
          )}
        >
          <Image
            src={theme.preview}
            alt={theme.name}
            className="object-cover"
            fill
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white font-medium">{theme.name}</span>
          </div>
          {selectedTheme === theme.id && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
              <Check className="h-4 w-4" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}