"use client";

import { useEffect, useRef } from "react";
import { ImageGenerator } from "./image-generator";
import { AISuggestions } from "./ai-suggestions";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorProps {
  slide: {
    id: string;
    content: string;
  };
  onChange: (content: string) => void;
}

export function Editor({ slide, onChange }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [slide.content]);

  const handleImageGenerated = (imageUrl: string) => {
    const imageMarkdown = `\n![Generated Image](${imageUrl})\n`;
    onChange(slide.content + imageMarkdown);
  };

  return (
    <Card className="flex-1 p-4 m-4 overflow-auto" role="region" aria-label="Slide editor">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mb-4">
                  <ImageGenerator onImageGenerated={handleImageGenerated} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate AI images for your slides</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AISuggestions content={slide.content} onSuggestionApply={onChange} />
        </div>
        <Textarea
          ref={textareaRef}
          value={slide.content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your slide content..."
          className="w-full h-full min-h-[200px] resize-none border-none focus-visible:ring-0"
          aria-label="Slide content"
        />
      </div>
    </Card>
  );
}