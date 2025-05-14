import React from 'react';

interface CreatorProfileInfoProps {
  name: string;
  description: string;
  followers: number;
  subscribers: number;
}

const CreatorProfileInfo: React.FC<CreatorProfileInfoProps> = ({ name, description, followers, subscribers }) => (
  <>
    <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center">{name}</h1>
    <div className="text-indigo-700 text-base sm:text-lg font-medium text-center">{description}</div>
    <div className="flex gap-2 sm:gap-4 mt-2 text-indigo-900 text-xs sm:text-sm justify-center">
      <span>{followers} followers</span>
      <span>•</span>
      <span>{subscribers} subscribers</span>
    </div>
  </>
);

export default CreatorProfileInfo; 