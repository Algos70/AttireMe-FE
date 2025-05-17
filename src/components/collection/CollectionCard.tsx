import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAverageRating } from '../../utils/api';
import StarRating from './review/StarRating';

export interface Collection {
  collectionId: number;
  collectionImage: string;
  creatorID: number;
  creatorName: string;
  creatorUsername: string;
  creatorProfileImage?: string;
  title: string;
}

const MOCK_PROFILE_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

export const CollectionCard: FC<{ collection: Collection }> = ({ collection }) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    getAverageRating(collection.collectionId)
      .then(res => {
        if (res && typeof res.data === 'number') setAverageRating(res.data);
      })
      .catch(() => setAverageRating(null));
  }, [collection.collectionId]);

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg text-black max-w-2xl mx-auto min-h-[400px] w-full border border-indigo-100 cursor-pointer hover:shadow-xl transition-shadow flex flex-col"
      onClick={() => navigate(`/h/post/${collection.collectionId}`)}
    >
      {/* Profile Header */}
      <div className="flex items-center gap-4 px-6 py-5 bg-indigo-50/40 border-b border-indigo-100">
        <img src={collection.creatorProfileImage || MOCK_PROFILE_IMAGE} alt="profile" className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500" />
        <div className="flex flex-col">
          <span className="font-bold text-lg text-black leading-tight">{collection.creatorName}</span>
          <span className="text-sm text-gray-500">@{collection.creatorUsername}</span>
        </div>
        <div className="flex-1" />
        {averageRating !== null && (
          <div className="flex items-center gap-2">
            <StarRating value={averageRating} readOnly />
            <span className="text-gray-700 font-medium text-sm">{averageRating.toFixed(1)} / 5</span>
          </div>
        )}
      </div>
      {/* Collection Image */}
      <div className="relative bg-indigo-50 flex items-center justify-center border-b border-indigo-100">
        <img
          src={collection.collectionImage}
          alt={collection.title}
          className="w-full object-cover aspect-video max-h-64 min-h-[220px] rounded-none"
        />
      </div>
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="text-xl font-bold mb-2 text-black line-clamp-2">{collection.title}</div>
      </div>
    </div>
  );
}
