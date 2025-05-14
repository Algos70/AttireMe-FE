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
  const [selectedOutfitIdx, setSelectedOutfitIdx] = useState<number | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white min-h-screen">
      {/* Modal for enlarged image */}
      {enlargedImage && (
        <ImageModal imageURL={enlargedImage} onClose={() => setEnlargedImage(null)} />
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
        <OutfitSelector
          outfits={collection.outfits}
          selectedOutfitIdx={selectedOutfitIdx}
          setSelectedOutfitIdx={setSelectedOutfitIdx}
        />
        {/* Show selected outfit image and description below the cards */}
        {selectedOutfitIdx !== null && (
          <OutfitDetail
            imageURL={collection.outfits[selectedOutfitIdx].imageURL}
            description={collection.outfits[selectedOutfitIdx].description}
          />
        )}
      </div>
      {/* Outfit Items */}
      {selectedOutfitIdx !== null && (
        <OutfitItemsList
          items={collection.outfits[selectedOutfitIdx].outfitItems}
          onImageClick={setEnlargedImage}
        />
      )}
    </div>
  );
};

export default CollectionPostPage; 