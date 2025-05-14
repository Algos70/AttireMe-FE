import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

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

const ProfileCard: FC<{ creator: any }> = ({ creator }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (creator.UserID) {
      navigate(`/h/creator/${creator.UserID}`);
    }
  };
  return (
    <div
      className="flex items-center h-16 bg-white rounded-xl shadow-sm transition-all border-2 border-gray-110 hover:border-indigo-500 cursor-pointer"
      style={{ borderWidth: 2 }}
      onClick={handleClick}
    >
      {creator.ProfileImage ? (
        <img
          src={creator.ProfileImage}
          alt={creator.Username}
          className="h-full w-20 rounded-l-md object-cover"
        />
      ) : (
        <span
          className="h-full w-20 flex items-center justify-center text-white font-bold text-lg rounded-l-md"
          style={{ backgroundColor: stringToColor(creator.Username || 'U') }}
        >
          {creator.Username ? creator.Username.charAt(0).toUpperCase() : 'U'}
        </span>
      )}
      <span className="text-black text-lg font-bold ml-6">{creator.Username || 'Unknown'}</span>
    </div>
  );
};

export default ProfileCard; 