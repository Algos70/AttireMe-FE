import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';
import { getDetailedCollectionById, getCreatorById } from '../utils/api';
import ImageModal from '../components/collection/ImageModal';
import Loading from '../components/creator/Loading';

// Types
interface OutfitItem {
  id?: number;
  outfitId?: number;
  imageURL: string;
  productLink: string;
  storeName: string;
}

interface Outfit {
  id?: number;
  description: string;
  imageURL: string;
  outfitItems: OutfitItem[];
}

interface Collection {
  collectionId: number;
  collectionImage: string;
  creatorID: number;
  creatorUsername: string;
  creatorProfileImage?: string;
  title: string;
  description: string;
  genres: number[];
  isPaid: boolean;
  outfits: Outfit[];
  seasons: string[];
}

const CollectionPostPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { profile } = useUserProfile();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [selectedOutfitIdx, setSelectedOutfitIdx] = useState<number | null>(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user ID from profile (handle both ID and UserID)
  const userId = profile && ('ID' in profile ? profile.ID : ('UserID' in profile ? profile.UserID : null));

  useEffect(() => {
    let isMounted = true;
    if (!collectionId || !userId) return;
    setLoading(true);
    setError(null);
    getDetailedCollectionById(Number(collectionId), userId)
      .then(async (response) => {
        const data = response.data;
        if (!data) throw new Error('No collection data found');
        // İlk olarak temel mapping
        let mappedCollection: Collection = {
          collectionId: data.ID,
          collectionImage: data.CollectionImage,
          creatorID: data.CreatorID,
          creatorUsername: '',
          creatorProfileImage: '',
          title: data.Title,
          description: data.Description,
          genres: data.Genres || [],
          isPaid: data.IsPaid,
          outfits: Array.isArray(data.Outfits) ? data.Outfits.map((outfit: any) => ({
            id: outfit.ID,
            description: outfit.Description,
            imageURL: outfit.ImageURL,
            outfitItems: Array.isArray(outfit.OutfitItems) ? outfit.OutfitItems.map((item: any) => ({
              id: item.ID,
              outfitId: item.OutfitID,
              imageURL: item.ImageURL,
              storeName: item.StoreName,
              productLink: item.ProductLink,
            })) : [],
          })) : [],
          seasons: data.Seasons || [],
        };
        // Creator bilgilerini çek
        try {
          const creatorResponse = await getCreatorById(data.CreatorID);
          const creatorData = creatorResponse?.data;
          if (creatorData) {
            mappedCollection.creatorUsername = creatorData.Username || '';
            mappedCollection.creatorProfileImage = creatorData.ProfileImage || '';
          }
        } catch (e) {
          // Creator bilgisi alınamazsa boş bırak
        }
        if (isMounted) {
          setCollection(mappedCollection);
          setSelectedOutfitIdx(0);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch collection');
      })
      .finally(() => setLoading(false));
    return () => { isMounted = false; };
  }, [collectionId, userId]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-red-500">{error}</div>;
  }
  if (!collection) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-gray-500">Collection not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-2 sm:px-4 min-h-screen">
      {/* Modal for enlarged image */}
      {enlargedImage && (
        <ImageModal imageURL={enlargedImage} onClose={() => setEnlargedImage(null)} />
      )}
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 mb-10 overflow-visible">
        {/* Cover image with overlay */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-t-2xl">
          <img
            src={collection.collectionImage}
            alt={collection.title}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        </div>
        {/* Avatar, name, subtitle, and meta OUTSIDE the cover image */}
        <div className="flex flex-col items-center -mt-16 pb-8 px-4">
          <img
            src={collection.creatorProfileImage!}
            alt={collection.creatorUsername}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white mb-2"
            style={{ zIndex: 2 }}
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 text-center">{collection.creatorUsername}</h1>
          <p className="text-indigo-600 text-base sm:text-lg text-center mb-2 max-w-xl">{collection.description}</p>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {collection.seasons.map(season => (
              <span key={season} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200">{season}</span>
            ))}
            {collection.isPaid && (
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold border border-yellow-200">Paid</span>
            )}
          </div>
        </div>
      </div>
      {/* Collection Title below the card */}
      <div className="text-2xl sm:text-3xl font-bold text-black mb-8 text-center">{collection.title}</div>
      {/* Outfits Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-black">Outfits</h2>
        <div className="flex gap-4 mb-8 overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent pr-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {Array.isArray(collection.outfits) && collection.outfits.length > 0 ? (
            collection.outfits.map((outfit, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOutfitIdx(idx)}
                className={`rounded-xl border-2 transition-all duration-150 bg-white shadow-sm flex flex-col items-center px-2 py-2 min-w-[120px] max-w-[140px] cursor-pointer
                  ${selectedOutfitIdx === idx ? 'border-indigo-500 shadow-md' : 'border-indigo-100 hover:border-indigo-300'}`}
              >
                <img
                  src={outfit.imageURL}
                  alt={`Outfit ${idx + 1}`}
                  className="rounded-lg object-cover w-24 h-20 mb-2 border border-indigo-100"
                />
                <span className="font-medium text-black text-sm">Outfit {idx + 1}</span>
              </button>
            ))
          ) : (
            <div className="text-gray-500">No outfits found.</div>
          )}
        </div>
        {/* Show selected outfit image and description below the cards */}
        {selectedOutfitIdx !== null && Array.isArray(collection.outfits) && collection.outfits[selectedOutfitIdx] && (
          <div className="bg-white rounded-xl border border-indigo-100 shadow p-6 mb-8 flex flex-col items-center">
            <img
              src={collection.outfits[selectedOutfitIdx].imageURL}
              alt={`Outfit ${selectedOutfitIdx + 1}`}
              className="rounded-xl object-cover w-full max-w-md max-h-72 mb-4 border border-indigo-100"
              onClick={() => setEnlargedImage(collection.outfits[selectedOutfitIdx].imageURL)}
              style={{ cursor: 'pointer' }}
            />
            <div className="text-lg font-semibold text-black mb-2 text-center">{collection.outfits[selectedOutfitIdx].description}</div>
          </div>
        )}
      </div>
      {/* Outfit Items */}
      {selectedOutfitIdx !== null && Array.isArray(collection.outfits) && collection.outfits[selectedOutfitIdx] && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-black">Outfit Items</h3>
          <div className="space-y-4">
            {Array.isArray(collection.outfits[selectedOutfitIdx].outfitItems) && collection.outfits[selectedOutfitIdx].outfitItems.length > 0 ? (
              collection.outfits[selectedOutfitIdx].outfitItems.map((item, idx) => (
                <div key={idx} className="flex items-center bg-indigo-50/60 rounded-xl border border-indigo-100 p-4 gap-4 shadow-sm">
                  <img
                    src={item.imageURL}
                    alt={item.storeName}
                    className="w-16 h-16 rounded-lg object-cover border border-indigo-100 cursor-pointer"
                    onClick={() => setEnlargedImage(item.imageURL)}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-black text-base mb-1">{item.storeName}</div>
                  </div>
                  <a
                    href={item.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-black transition text-sm"
                  >
                    View Product
                  </a>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No items found for this outfit.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPostPage;
