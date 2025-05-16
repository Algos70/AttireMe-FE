import React from 'react';

interface OutfitDetailCardProps {
  imageURL: string;
  description: string;
  onImageClick: (url: string) => void;
}

const OutfitDetailCard: React.FC<OutfitDetailCardProps> = ({ imageURL, description, onImageClick }) => (
  <div className="bg-white rounded-xl border border-indigo-100 shadow p-6 mb-8 flex flex-col items-center">
    <img
      src={imageURL}
      alt="Outfit"
      className="rounded-xl object-cover w-full max-w-md max-h-72 mb-4 border border-indigo-100 cursor-pointer"
      onClick={() => onImageClick(imageURL)}
      style={{ cursor: 'pointer' }}
    />
    <div className="text-lg font-semibold text-black mb-2 text-center">{description}</div>
  </div>
);

export default OutfitDetailCard; 