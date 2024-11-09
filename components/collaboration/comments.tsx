"use client";

import { useState } from 'react';
import { MessageSquare, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import type { Comment } from '@/lib/collaboration/store';

interface CommentsProps {
  comments: Comment[];
  currentSlideId: string;
  onAddComment: (content: string) => void;
  onResolveComment: (commentId: string) => void;
}

export function Comments({
  comments,
  currentSlideId,
  onAddComment,
  onResolveComment,
}: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const slideComments = comments.filter(c => c.slideId === currentSlideId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-4 py-4">
              {slideComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`flex gap-4 p-4 rounded-lg ${
                    comment.resolved ? 'bg-muted/50' : 'bg-muted'
                  }`}
                >
                  <Avatar>
                    <AvatarFallback>
                      {comment.userId.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">User {comment.userId.slice(0, 4)}</p>
                      <time className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                      </time>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                  </div>
                  {!comment.resolved && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onResolveComment(comment.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSubmit} className="border-t pt-4 mt-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button type="submit" disabled={!newComment.trim()}>
                Comment
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}