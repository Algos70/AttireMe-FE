import React, { FC } from 'react';

const ProfileCard: FC<{ creator: any }> = ({ creator }) => (
  <div
    className="flex items-center h-16 bg-white rounded-xl shadow-sm transition-all border-2 border-gray-110 hover:border-indigo-500 cursor-pointer"
    style={{ borderWidth: 2 }}
  >
    {creator.ProfileImage && (
      <img
        src={creator.ProfileImage}
        alt={creator.Username}
        className="h-full w-20 rounded-l-md object-cover"
      />
    )}
    <span className="text-black text-lg font-bold ml-6">{creator.Username || 'Unknown'}</span>
  </div>
);

export default ProfileCard; 