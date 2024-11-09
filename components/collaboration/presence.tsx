"use client";

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Cursor } from './cursor';
import type { User } from '@/lib/collaboration/store';

interface PresenceProps {
  awareness: any;
}

export function Presence({ awareness }: PresenceProps) {
  const [users, setUsers] = useState<Map<number, { user: User; cursor: any }>>(new Map());

  useEffect(() => {
    const handleUpdate = () => {
      const states = awareness.getStates();
      setUsers(new Map(Array.from(states.entries())));
    };

    awareness.on('change', handleUpdate);
    return () => awareness.off('change', handleUpdate);
  }, [awareness]);

  return (
    <>
      <div className="fixed top-4 right-4 flex -space-x-2">
        {Array.from(users.values()).map(({ user }, index) => (
          <HoverCard key={user.id}>
            <HoverCardTrigger asChild>
              <Avatar
                className="border-2 border-background cursor-pointer"
                style={{ backgroundColor: user.color }}
              >
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-40" align="end">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{user.name}</h4>
                  <p className="text-xs text-muted-foreground">Currently editing</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>

      {Array.from(users.values()).map(({ user, cursor }) => (
        cursor && <Cursor key={user.id} user={user} position={cursor} />
      ))}
    </>
  );
}