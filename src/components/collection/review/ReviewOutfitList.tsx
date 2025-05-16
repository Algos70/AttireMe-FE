import React from 'react';
import ReviewOutfitCard from './ReviewOutfitCard';

interface OutfitItem {
  imageURL: string;
  storeName: string;
  productLink: string;
}

interface Outfit {
  description: string;
  imageURL: string;
  outfitItems: OutfitItem[];
}

interface ReviewOutfitListProps {
  outfits: Outfit[];
}

const ReviewOutfitList: React.FC<ReviewOutfitListProps> = ({ outfits }) => (
  <div>
    <h3 className="font-semibold text-lg text-black mb-4">Outfits</h3>
    <div className="space-y-6">
      {outfits.map((outfit, idx) => (
        <ReviewOutfitCard key={idx} outfit={outfit} index={idx} />
      ))}
    </div>
  </div>
);

export default ReviewOutfitList; 