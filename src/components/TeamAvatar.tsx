import React from 'react';

interface TeamAvatarProps {
  image?: string;
  emoji: string;
  name: string;
  size?: number;
  className?: string;
}

function TeamAvatar({ 
  image, 
  emoji, 
  name, 
  size = 80, 
  className = "" 
}: TeamAvatarProps) {
  return (
    <div 
      className={`relative flex-shrink-0 rounded-2xl border border-bronze/40 bg-gradient-to-br from-bronze/20 to-obsidian-surface overflow-hidden shadow-inner ${className}`}
      style={{ width: size, height: size }}
    >
      {image ? (
        <img
          src={image}
          alt={`${name}'s photo`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl select-none">
          {emoji}
        </div>
      )}
    </div>
  );
}

export default TeamAvatar;     // ← Changed to default export