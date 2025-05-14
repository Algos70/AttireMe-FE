import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const [selectedOutfitIdx, setSelectedOutfitIdx] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white min-h-screen">
      {/* Collection Header */}
      <div className="flex items-center gap-4 mb-8">
        <img src={collection.creatorProfileImage} alt="profile" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500" />
        <div>
          <div className="font-bold text-2xl text-black">{collection.creatorName}</div>
          <div className="text-sm text-black/60">@{collection.creatorUsername}</div>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border border-black/10 mb-6 bg-white shadow-sm">
        <img src={collection.collectionImage} alt={collection.title} className="w-full object-cover aspect-video" />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-black">{collection.title}</h1>
      <div className="text-lg text-black mb-3">{collection.description}</div>
      <div className="mb-6 flex flex-wrap gap-3 text-sm">
        <span className="px-3 py-1 rounded-full border border-indigo-200 text-indigo-700 bg-indigo-50 font-medium">Genres: {collection.genres.join(', ')}</span>
        <span className="px-3 py-1 rounded-full border border-indigo-200 text-indigo-700 bg-indigo-50 font-medium">Seasons: {collection.seasons.join(', ')}</span>
        <span className={`px-3 py-1 rounded-full border font-medium ${collection.isPaid ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-black/20 text-black bg-white'}`}>{collection.isPaid ? 'Paid' : 'Free'}</span>
      </div>
      {/* Outfits List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">Outfits</h2>
        <div className="flex flex-col gap-4">
          {collection.outfits.map((outfit, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors cursor-pointer shadow-sm ${selectedOutfitIdx === idx ? 'border-indigo-500 bg-indigo-50' : 'border-black/10 bg-white hover:border-indigo-300'}`}
              onClick={() => setSelectedOutfitIdx(idx)}
            >
              <img src={outfit.imageURL} alt="outfit" className="w-28 h-24 object-cover rounded-lg border border-black/10" />
              <div className="text-lg font-medium text-black">{outfit.description}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Outfit Items */}
      {selectedOutfitIdx !== null && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-black">Outfit Items</h3>
          <div className="flex flex-wrap gap-6">
            {collection.outfits[selectedOutfitIdx].outfitItems.map((item, i) => (
              <a
                key={i}
                href={item.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center border rounded-xl p-4 w-36 bg-white hover:shadow-lg transition-shadow border-indigo-100 hover:border-indigo-400"
              >
                <img src={item.imageURL} alt={item.storeName} className="w-20 h-20 object-cover rounded mb-2 border border-black/10" />
                <div className="text-sm font-semibold text-center mb-1 text-black">{item.storeName}</div>
                <div className="text-xs text-indigo-700 underline">View Product</div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPostPage; 