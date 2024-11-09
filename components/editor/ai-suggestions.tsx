"use client";

import { useState } from 'react';
import { Lightbulb, Clock, Mic, Layout, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { estimateDuration } from '@/lib/ai-helpers';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AISuggestionsProps {
  content: string;
  onSuggestionApply: (content: string) => void;
}

export function AISuggestions({ content, onSuggestionApply }: AISuggestionsProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const duration = estimateDuration(content);

  const getSuggestion = async (type: 'layout' | 'content' | 'notes') => {
    setLoading(true);
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type }),
      });

      if (!response.ok) throw new Error('Failed to get suggestion');

      const data = await response.json();
      
      if (type === 'notes') {
        toast({
          title: 'Speaker Notes Generated',
          description: data.suggestion,
        });
      } else {
        onSuggestionApply(data.suggestion);
        toast({
          title: 'Suggestion Applied',
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} improvements applied`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get suggestion',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2" role="toolbar" aria-label="AI Suggestions">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => getSuggestion('layout')}
              disabled={loading}
              aria-label="Improve layout"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Layout className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Suggest better layout</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => getSuggestion('content')}
              disabled={loading}
              aria-label="Improve content"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Improve content</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => getSuggestion('notes')}
              disabled={loading}
              aria-label="Generate speaker notes"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Generate speaker notes</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{duration}m</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Estimated presentation duration</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}