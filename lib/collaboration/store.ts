import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { Awareness } from 'y-protocols/awareness';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  slideId: string;
  resolved: boolean;
}

const colors = [
  '#f87171', '#fb923c', '#fbbf24', '#a3e635',
  '#34d399', '#22d3ee', '#60a5fa', '#a78bfa',
];

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export class CollaborationStore {
  doc: Y.Doc;
  provider: WebrtcProvider;
  persistence: IndexeddbPersistence;
  awareness: Awareness;
  slides: Y.Array<any>;
  comments: Y.Map<Comment>;
  currentUser: User;

  constructor(presentationId: string) {
    this.doc = new Y.Doc();
    this.provider = new WebrtcProvider(`presentation-${presentationId}`, this.doc);
    this.persistence = new IndexeddbPersistence(presentationId, this.doc);
    this.awareness = this.provider.awareness;

    this.slides = this.doc.getArray('slides');
    this.comments = this.doc.getMap('comments');

    this.currentUser = {
      id: uuidv4(),
      name: `User ${Math.floor(Math.random() * 1000)}`,
      color: getRandomColor(),
    };

    this.awareness.setLocalState({
      user: this.currentUser,
      cursor: null,
    });
  }

  updateCursor(position: { x: number; y: number } | null) {
    this.awareness.setLocalState({
      ...this.awareness.getLocalState(),
      cursor: position,
    });
  }

  addComment(slideId: string, content: string): Comment {
    const comment: Comment = {
      id: uuidv4(),
      userId: this.currentUser.id,
      content,
      timestamp: Date.now(),
      slideId,
      resolved: false,
    };

    this.comments.set(comment.id, comment);
    return comment;
  }

  resolveComment(commentId: string) {
    const comment = this.comments.get(commentId);
    if (comment) {
      comment.resolved = true;
      this.comments.set(commentId, comment);
    }
  }

  destroy() {
    this.provider.destroy();
    this.persistence.destroy();
    this.doc.destroy();
  }
}