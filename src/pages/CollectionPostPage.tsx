import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import OutfitSelector from '../components/collection/OutfitSelector';
import OutfitDetail from '../components/collection/OutfitDetail';
import OutfitItemsList from '../components/collection/OutfitItemsList';
import ImageModal from '../components/collection/ImageModal';

// Types
interface OutfitItem {
  imageURL: string;
  productLink: string;
  storeName: string;
}

interface Outfit {
  description: string;
  imageURL: string;
  outfitItems: OutfitItem[];
}

interface Collection {
  collectionId: number;
  collectionImage: string;
  creatorID: number;
  creatorName: string;
  creatorUsername: string;
  creatorProfileImage?: string;
  title: string;
  description: string;
  genres: number[];
  isPaid: boolean;
  outfits: Outfit[];
  seasons: string[];
}

const MOCK_COLLECTION: Collection = {
  collectionId: 1,
  collectionImage: 'https://picsum.photos/900/300?random=1',
  creatorID: 1,
  creatorName: 'FiniteVoid',
  creatorUsername: 'finitevoid',
  creatorProfileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  title: 'Spring Streetwear',
  description: 'A curated collection of streetwear outfits for spring.',
  genres: [1, 2],
  isPaid: true,
  outfits: [
    {
      description: 'Urban casual with a pop of color',
      imageURL: 'https://picsum.photos/400/300?random=11',
      outfitItems: [
        {
          imageURL: 'https://picsum.photos/100/100?random=21',
          productLink: 'https://store.com/item1',
          storeName: 'Store 1',
        },
        {
          imageURL: 'https://picsum.photos/100/100?random=22',
          productLink: 'https://store.com/item2',
          storeName: 'Store 2',
        },
      ],
    },
    {
      description: 'Minimalist monochrome',
      imageURL: 'https://picsum.photos/400/300?random=12',
      outfitItems: [
        {
          imageURL: 'https://picsum.photos/100/100?random=23',
          productLink: 'https://store.com/item3',
          storeName: 'Store 3',
        },
      ],
    },
  ],
  seasons: ['Spring', 'Summer'],
};

const CollectionPostPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  // In real app, fetch collection by collectionId
  const collection = MOCK_COLLECTION;
  const [selectedOutfitIdx, setSelectedOutfitIdx] = useState<number | null>(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

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
            alt={collection.creatorName}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white mb-2"
            style={{ zIndex: 2 }}
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 text-center">{collection.creatorName}</h1>
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
      {/* Outfits Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-black">Outfits</h2>
        <div className="flex gap-4 mb-8 overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent pr-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {collection.outfits.map((outfit, idx) => (
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
          ))}
        </div>
        {/* Show selected outfit image and description below the cards */}
        {selectedOutfitIdx !== null && (
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
      {selectedOutfitIdx !== null && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-black">Outfit Items</h3>
          <div className="space-y-4">
            {collection.outfits[selectedOutfitIdx].outfitItems.map((item, idx) => (
              <div key={idx} className="flex items-center bg-indigo-50/60 rounded-xl border border-indigo-100 p-4 gap-4 shadow-sm">
                <img
                  src={item.imageURL}
                  alt={item.storeName}
                  className="w-16 h-16 rounded-lg object-cover border border-indigo-100"
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPostPage; 