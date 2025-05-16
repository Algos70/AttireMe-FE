import React from 'react';

interface CollectionHeaderCardProps {
  collectionImage: string;
  creatorProfileImage: string;
  creatorUsername: string;
  description: string;
  seasons: string[];
  genres: string[];
  isPaid: boolean;
  onUsernameClick?: () => void;
  isOwner?: boolean;
  onEditClick?: () => void;
}

const CollectionHeaderCard: React.FC<CollectionHeaderCardProps> = ({
  collectionImage,
  creatorProfileImage,
  creatorUsername,
  description,
  seasons,
  genres,
  isPaid,
  onUsernameClick,
  isOwner = false,
  onEditClick,
}) => (
  <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 mb-10 overflow-visible relative">
    {/* Cover image with overlay */}
    <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-t-2xl">
      <img
        src={collectionImage}
        alt={creatorUsername}
        className="w-full h-full object-cover filter brightness-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      {isOwner && (
        <button
          type="button"
          onClick={onEditClick}
          title="Edit Collection"
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-indigo-100 text-indigo-600 hover:text-black rounded-full p-2 shadow-lg border border-indigo-200 transition-colors"
          style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 5.487a2.1 2.1 0 1 1 2.97 2.97L8.978 19.312a4.2 4.2 0 0 1-1.768 1.06l-3.07.878a.6.6 0 0 1-.74-.74l.878-3.07a4.2 4.2 0 0 1 1.06-1.768L16.862 5.487Z" />
          </svg>
        </button>
      )}
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
      {/* Paid/Free pill row */}
      <div className="flex justify-center mb-1">
        {isPaid ? (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold border border-yellow-200">Paid</span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold border border-green-200">Free</span>
        )}
      </div>
      {/* Genres row - visually distinct from seasons */}
      {genres && genres.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-1 mb-1">
          {genres.map((genre, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold border border-pink-200">
              {genre}
            </span>
          ))}
        </div>
      )}
      {/* Seasons row */}
      <div className="flex flex-wrap gap-2 justify-center mt-1">
        {seasons.map(season => (
          <span key={season} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200">{season}</span>
        ))}
      </div>
    </div>
  </div>
);

export default CollectionHeaderCard; 