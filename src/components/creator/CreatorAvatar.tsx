import React from 'react';

// Helper to generate a color from a string
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

const CreatorAvatar: React.FC<{ avatar: string; username: string }> = ({ avatar, username }) => (
  avatar ? (
    <img
      src={avatar}
      alt="Vendor avatar"
      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover -mt-12 sm:-mt-16 z-20 bg-white"
    />
  ) : (
    <span
      className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-white font-bold text-4xl rounded-full border-4 border-white shadow-lg -mt-12 sm:-mt-16 z-20"
      style={{ backgroundColor: stringToColor(username || 'U') }}
    >
      {username ? username.charAt(0).toUpperCase() : 'U'}
    </span>
  )
);

export default CreatorAvatar; 