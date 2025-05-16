import React from 'react';

interface ReviewCollectionInfoProps {
  image: string;
  title: string;
  description: string;
  genres: string[];
  seasons: string[];
  isPaid: boolean;
}

const ReviewCollectionInfo: React.FC<ReviewCollectionInfoProps> = ({
  image,
  title,
  description,
  genres,
  seasons,
  isPaid,
}) => (
  <div className="flex flex-col items-center">
    {image && (
      <img src={image} alt="Collection" className="rounded-2xl border border-indigo-200 shadow w-full max-w-xs sm:max-w-md max-h-72 object-contain mb-6" />
    )}
    <div className="w-full max-w-lg bg-indigo-50/40 border border-indigo-100 rounded-xl p-6 mb-8">
      <div className="mb-3 flex flex-col gap-1">
        <div className="text-base text-gray-700"><span className="font-semibold text-black">Title:</span> {title}</div>
        <div className="text-base text-gray-700"><span className="font-semibold text-black">Description:</span> {description}</div>
        <div className="text-base text-gray-700"><span className="font-semibold text-black">Genres:</span> {genres.join(', ')}</div>
        <div className="text-base text-gray-700"><span className="font-semibold text-black">Seasons:</span> {seasons.join(', ')}</div>
        <div className="text-base text-gray-700"><span className="font-semibold text-black">Paid:</span> {isPaid ? 'Yes' : 'No'}</div>
      </div>
    </div>
  </div>
);

export default ReviewCollectionInfo; 