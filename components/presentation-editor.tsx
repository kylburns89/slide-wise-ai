"use client";

import { useState, useEffect } from 'react';
import { Editor } from '@/components/editor/editor';
import { EditorSidebar } from '@/components/editor/editor-sidebar';
import { SlidePreview } from '@/components/editor/slide-preview';
import { getPresentation } from '@/lib/api';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Slide {
  id: string;
  content: string;
  notes?: string;
  background?: string;
}

interface Presentation {
  id: string;
  title: string;
  theme: string;
  slides: Slide[];
}

export function PresentationEditor({ presentationId }: { presentationId: string }) {
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPresentation() {
      try {
        const data = await getPresentation(presentationId);
        setPresentation(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load presentation');
        toast.error('Failed to load presentation');
      } finally {
        setLoading(false);
      }
    }

    loadPresentation();
  }, [presentationId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !presentation) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Failed to load presentation</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <EditorSidebar
        slides={presentation.slides}
        currentSlide={currentSlide}
        onSlideSelect={setCurrentSlide}
      />
      <div className="flex-1 flex flex-col">
        <Editor
          slide={presentation.slides[currentSlide]}
          onChange={(content) => {
            const newSlides = [...presentation.slides];
            newSlides[currentSlide] = { ...newSlides[currentSlide], content };
            setPresentation({ ...presentation, slides: newSlides });
          }}
        />
        <SlidePreview
          slide={presentation.slides[currentSlide]}
          theme={presentation.theme}
        />
      </div>
    </div>
  );
}