"use client";

import { useEffect, useState } from 'react';
import { CollaborationStore, Comment } from '@/lib/collaboration/store';

export function useCollaboration(presentationId: string) {
  const [store, setStore] = useState<CollaborationStore | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const collaborationStore = new CollaborationStore(presentationId);
    setStore(collaborationStore);

    const handleCommentUpdate = () => {
      const newComments = Array.from(collaborationStore.comments.values());
      setComments(newComments);
    };

    collaborationStore.comments.observe(handleCommentUpdate);
    handleCommentUpdate();

    return () => {
      collaborationStore.destroy();
    };
  }, [presentationId]);

  const addComment = (content: string) => {
    if (store) {
      const comment = store.addComment(presentationId, content);
      return comment;
    }
  };

  const resolveComment = (commentId: string) => {
    if (store) {
      store.resolveComment(commentId);
    }
  };

  return {
    store,
    comments,
    addComment,
    resolveComment,
  };
}