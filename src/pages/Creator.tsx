import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCreatorById } from '../utils/api';
import { CollectionCard, Collection } from '../components/after-login/CollectionCard';

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

const Creator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getCreatorById(id)
      .then((res) => {
        setCreator(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load creator');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading creator...</div>;
  }
  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }
  if (!creator) {
    return <div className="text-center py-12 text-gray-500">No creator found.</div>;
  }

  // Map API fields to UI fields
  const vendorProfile = {
    name: creator.Username,
    username: creator.Username,
    description: creator.Bio || '',
    followers: creator.Followers,
    subscribers: creator.Subscribers,
    avatar: creator.ProfileImage || '',
    banner: creator.BannerImage || '',
  };

  const collections: Collection[] = [
    {
      collectionId: 1,
      collectionImage: 'https://picsum.photos/900/300?random=1',
      creatorID: 1,
      creatorName: vendorProfile.name,
      creatorUsername: vendorProfile.username,
      creatorProfileImage: vendorProfile.avatar,
      title: 'Collection 1',
    },
    {
      collectionId: 2,
      collectionImage: 'https://picsum.photos/900/300?random=2',
      creatorID: 1,
      creatorName: vendorProfile.name,
      creatorUsername: vendorProfile.username,
      creatorProfileImage: vendorProfile.avatar,
      title: 'Collection 2',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Banner/Header */}
      <div className="relative w-full h-40 sm:h-56 md:h-72 bg-black flex items-end justify-center">
        {vendorProfile.banner ? (
          <img
            src={vendorProfile.banner}
            alt="Vendor banner"
            className="absolute inset-0 w-full h-full object-cover opacity-80 blur-md"
          />
        ) : (
          <div
            className="absolute inset-0 w-full h-full opacity-80 blur-md"
            style={{ backgroundColor: stringToColor(vendorProfile.username || 'U', 'banner') }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      {/* Avatar - Overlapping Banner */}
      <div className="relative flex flex-col items-center">
        {vendorProfile.avatar ? (
          <img
            src={vendorProfile.avatar}
            alt="Vendor avatar"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover -mt-12 sm:-mt-16 z-20 bg-white"
          />
        ) : (
          <span
            className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-white font-bold text-4xl rounded-full border-4 border-white shadow-lg -mt-12 sm:-mt-16 z-20"
            style={{ backgroundColor: stringToColor(vendorProfile.username || 'U') }}
          >
            {vendorProfile.username ? vendorProfile.username.charAt(0).toUpperCase() : 'U'}
          </span>
        )}
        {/* Profile Info */}
        <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center">{vendorProfile.name}</h1>
        <div className="text-indigo-700 text-base sm:text-lg font-medium text-center">{vendorProfile.description}</div>
        <div className="flex gap-2 sm:gap-4 mt-2 text-indigo-900 text-xs sm:text-sm justify-center">
          <span>{vendorProfile.followers} followers</span>
          <span>•</span>
          <span>{vendorProfile.subscribers} subscribers</span>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full max-w-xs sm:max-w-none justify-center items-center">
          <button className="w-full sm:w-auto px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition-colors">
            Subscribe {typeof creator.SubscriptionFee === 'number' ? (creator.SubscriptionFee > 0 ? `$${creator.SubscriptionFee}/mo` : 'Free') : ''}
          </button>
          <button className="w-full sm:w-auto px-6 py-2 rounded-full bg-white text-black font-semibold border border-black/10 shadow hover:bg-gray-100 transition-colors">Follow</button>
        </div>
      </div>
      {/* Decorative Separator */}
      <div className="w-full flex flex-col items-center my-12">
        <div className="relative w-full max-w-2xl flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
          <span className="mx-4 text-2xl text-indigo-400 drop-shadow-sm">★</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        </div>
      </div>
      {/* Collections Grid */}
      <section className="max-w-3xl mx-auto py-8 sm:py-12 px-2 sm:px-4">
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {collections.map((col, idx) => (
            <CollectionCard key={idx} collection={col} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Creator; 