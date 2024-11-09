"use client";

import { ExportDialog } from '@/components/export/export-dialog';
import { AISuggestions } from './ai-suggestions';
import { ImageGenerator } from './image-generator';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Presentation } from '@/lib/types';

interface EditorToolbarProps {
  presentation: Presentation;
  currentSlide: {
    content: string;
  };
  onContentChange: (content: string) => void;
  onSave: () => Promise<void>;
}

export function EditorToolbar({
  presentation,
  currentSlide,
  onContentChange,
  onSave,
}: EditorToolbarProps) {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await onSave();
      toast({
        title: 'Saved',
        description: 'Your changes have been saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save changes',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border-b" role="toolbar">
      <div className="flex items-center gap-4">
        <ImageGenerator onImageGenerated={(url) => {
          const imageMarkdown = `\n![Generated Image](${url})\n`;
          onContentChange(currentSlide.content + imageMarkdown);
        }} />
        <AISuggestions
          content={currentSlide.content}
          onSuggestionApply={onContentChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
        <ExportDialog presentation={presentation} />
      </div>
    </div>
  );
}