"use client";

import { useEffect, useState } from 'react';

interface CursorProps {
  user: {
    name: string;
    color: string;
  };
  position: {
    x: number;
    y: number;
  };
}

export function Cursor({ user, position }: CursorProps) {
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 2000);
    return () => clearTimeout(timer);
  }, [position]);

  return (
    <div
      className="absolute pointer-events-none transition-transform duration-200"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={user.color}
        style={{ transform: "rotate(-45deg)" }}
      >
        <path d="M12 0L24 12L12 24L0 12L12 0Z" />
      </svg>
      
      {showLabel && (
        <div
          className="absolute left-4 top-0 px-2 py-1 rounded-md text-xs text-white transition-opacity duration-200"
          style={{ backgroundColor: user.color }}
        >
          {user.name}
        </div>
      )}
    </div>
  );
}