import React from 'react';

// Helper to generate a color from a string, with optional salt
function stringToColor(str: string, salt: string = '') {
  let hash = 0;
  const fullStr = str + salt;
  for (let i = 0; i < fullStr.length; i++) {
    hash = fullStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

const CreatorBanner: React.FC<{ banner: string; username: string }> = ({ banner, username }) => (
  <div className="relative w-full h-40 sm:h-56 md:h-72 bg-black flex items-end justify-center">
    {banner ? (
      <img
        src={banner}
        alt="Vendor banner"
        className="absolute inset-0 w-full h-full object-cover opacity-80 blur-md"
      />
    ) : (
      <div
        className="absolute inset-0 w-full h-full opacity-80 blur-md"
        style={{ backgroundColor: stringToColor(username || 'U', 'banner') }}
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
  </div>
);

export default CreatorBanner; 