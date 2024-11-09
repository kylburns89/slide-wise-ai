"use client";

import { useEffect, useRef } from "react";
import Reveal from 'reveal.js';
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import { Card } from "@/components/ui/card";

interface SlidePreviewProps {
  slide: {
    content: string;
    background?: string;
  };
  theme: string;
}

export function SlidePreview({ slide, theme }: SlidePreviewProps) {
  const deckRef = useRef<Reveal.Api | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initReveal = async () => {
      if (!previewRef.current) return;

      // Cleanup previous instance
      if (deckRef.current) {
        try {
          const slides = previewRef.current.querySelector('.slides');
          if (slides) {
            slides.innerHTML = ''; // Clear existing content
          }
          deckRef.current = null;
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }

      try {
        // Create new instance
        deckRef.current = new Reveal(previewRef.current, {
          embedded: true,
          controls: false,
          progress: false,
          width: 960,
          height: 540,
          margin: 0.1,
          keyboard: false,
          touch: false,
          center: false,
          mouseWheel: false,
          viewDistance: 2,
          transition: 'none'
        });

        await deckRef.current.initialize();
      } catch (error) {
        console.error('Reveal initialization error:', error);
      }
    };

    initReveal();

    return () => {
      if (deckRef.current) {
        try {
          const slides = previewRef.current?.querySelector('.slides');
          if (slides) {
            slides.innerHTML = '';
          }
          deckRef.current = null;
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
    };
  }, [slide.content, theme]); // Only re-run when content or theme changes

  return (
    <Card className="w-full overflow-hidden">
      <div 
        className="reveal" 
        ref={previewRef}
        style={{ position: 'relative', height: '400px' }}
      >
        <div className="slides">
          <section 
            style={{ 
              background: slide.background,
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: slide.content }} />
          </section>
        </div>
      </div>
    </Card>
  );
}