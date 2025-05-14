import React from 'react';

interface OutfitDetailProps {
  imageURL: string;
  description: string;
}

const OutfitDetail: React.FC<OutfitDetailProps> = ({ imageURL, description }) => (
  <div className="mt-6 mb-2 text-center flex flex-col items-center">
    <img
      src={imageURL}
      alt={description}
      className="w-full max-w-3xl h-[28rem] object-cover rounded-lg shadow mb-4"
    />
    <div className="text-lg text-black font-semibold">{description}</div>
  </div>
);

export default OutfitDetail; 