import React from 'react';

interface CollectionHeaderCardProps {
  collectionImage: string;
  creatorProfileImage: string;
  creatorUsername: string;
  description: string;
  seasons: string[];
  isPaid: boolean;
  onUsernameClick?: () => void;
}

const CollectionHeaderCard: React.FC<CollectionHeaderCardProps> = ({
  collectionImage,
  creatorProfileImage,
  creatorUsername,
  description,
  seasons,
  isPaid,
  onUsernameClick,
}) => (
  <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 mb-10 overflow-visible">
    {/* Cover image with overlay */}
    <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-t-2xl">
      <img
        src={collectionImage}
        alt={creatorUsername}
        className="w-full h-full object-cover filter brightness-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
    </div>
    {/* Avatar, name, subtitle, and meta OUTSIDE the cover image */}
    <div className="flex flex-col items-center -mt-16 pb-8 px-4">
      <img
        src={creatorProfileImage}
        alt={creatorUsername}
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white mb-2"
        style={{ zIndex: 2 }}
      />
      <button
        type="button"
        onClick={onUsernameClick}
        className="text-3xl sm:text-4xl font-bold text-black mb-2 text-center hover:text-indigo-600 transition-colors focus:outline-none"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        {creatorUsername}
      </button>
      <p className="text-indigo-600 text-base sm:text-lg text-center mb-2 max-w-xl">{description}</p>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        {seasons.map(season => (
          <span key={season} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200">{season}</span>
        ))}
        {isPaid && (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold border border-yellow-200">Paid</span>
        )}
      </div>
    </div>
  </div>
);

export default CollectionHeaderCard; 