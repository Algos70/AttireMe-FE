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
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white min-h-screen">
      {/* Modal for enlarged image */}
      {enlargedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadein"
          onClick={() => setEnlargedImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-full max-h-full flex flex-col items-center animate-scalein"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-4 -right-4 bg-white/90 hover:bg-gray-100 text-black rounded-full p-2 shadow transition-colors z-10 border border-gray-200"
              onClick={() => setEnlargedImage(null)}
              aria-label="Kapat"
              style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={enlargedImage} alt="Enlarged" className="max-w-[80vw] max-h-[80vh] rounded-xl shadow-lg object-contain" />
          </div>
        </div>
      )}
      <div className="relative mb-16">
        {/* 1) Cover image with dark overlay + blur */}
        <div className="h-60 w-full overflow-hidden relative">
          <img
            src={collection.collectionImage}
            alt={collection.title}
            className="w-full h-full object-cover filter blur-sm"
          />
          <div className="absolute inset-0 bg-black opacity-25" />
        </div>

        {/* 2) Avatar overlapping bottom-center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <img
            src={collection.creatorProfileImage!}
            alt={collection.creatorName}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* 3) Centered name and subtitle only */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">{collection.creatorName}</h1>
        <p className="text-indigo-600 mt-1">
          {collection.description}
        </p>
      </div>

      {/* Outfits List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-black">Outfits</h2>
        <div className="bg-white border border-indigo-100 rounded-2xl shadow-sm px-4 py-4 overflow-x-auto">
          <div className="flex flex-row gap-4 flex-nowrap min-w-max">
            {collection.outfits.map((outfit, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center p-2 rounded-xl transition-all cursor-pointer shadow-sm bg-white hover:shadow-md hover:-translate-y-1 duration-200 min-w-[7.5rem] w-28 ${selectedOutfitIdx === idx ? 'border-2 border-indigo-500' : 'border-none'}`}
                onClick={() => setSelectedOutfitIdx(idx)}
              >
                <img src={outfit.imageURL} alt={`Outfit ${idx + 1}`} className="w-20 h-16 object-cover rounded-lg shadow mb-1" />
                <div className="text-sm font-semibold text-black">Outfit {idx + 1}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Show selected outfit image and description below the cards */}
        {selectedOutfitIdx !== null && (
          <div className="mt-6 mb-2 text-center flex flex-col items-center">
            <img
              src={collection.outfits[selectedOutfitIdx].imageURL}
              alt={collection.outfits[selectedOutfitIdx].description}
              className="w-full max-w-3xl h-[28rem] object-cover rounded-lg shadow mb-4"
            />
            <div className="text-lg text-black font-semibold">{collection.outfits[selectedOutfitIdx].description}</div>
          </div>
        )}
      </div>
      {/* Outfit Items */}
      {selectedOutfitIdx !== null && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-black">Outfit Items</h3>
          <div className="flex flex-col gap-8">
            {collection.outfits[selectedOutfitIdx].outfitItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-2 py-4 transition-all duration-200 hover:bg-indigo-50 hover:shadow-md rounded-xl"
                style={{ minHeight: '90px' }}
              >
                <div className="flex items-center">
                  <img
                    src={item.imageURL}
                    alt={item.storeName}
                    className="w-20 h-20 object-cover rounded-2xl mr-6 shadow-sm cursor-pointer"
                    onClick={() => setEnlargedImage(item.imageURL)}
                  />
                  <div className="flex flex-col justify-center">
                    <div className="text-lg font-semibold text-black mb-1">{item.storeName}</div>
                  </div>
                </div>
                <a
                  href={item.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium shadow hover:bg-indigo-700 transition-colors whitespace-nowrap"
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