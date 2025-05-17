import React from 'react';
import OutfitSelector from './OutfitSelector';
import OutfitDetailCard from './OutfitDetailCard';
import OutfitItemsList from './OutfitItemsList';

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

interface OutfitSectionProps {
  outfits: Outfit[];
  selectedOutfitIdx: number | null;
  setSelectedOutfitIdx: (idx: number) => void;
  onImageClick: (imageURL: string) => void;
}

const OutfitSection: React.FC<OutfitSectionProps> = ({
  outfits,
  selectedOutfitIdx,
  setSelectedOutfitIdx,
  onImageClick,
}) => {
  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-black">Outfits</h2>
        <OutfitSelector
          outfits={outfits}
          selectedOutfitIdx={selectedOutfitIdx}
          setSelectedOutfitIdx={setSelectedOutfitIdx}
        />
        {selectedOutfitIdx !== null && Array.isArray(outfits) && outfits[selectedOutfitIdx] && (
          <OutfitDetailCard
            imageURL={outfits[selectedOutfitIdx].imageURL}
            description={outfits[selectedOutfitIdx].description}
            onImageClick={onImageClick}
          />
        )}
      </div>
      {selectedOutfitIdx !== null && Array.isArray(outfits) && outfits[selectedOutfitIdx] && (
        <OutfitItemsList
          items={outfits[selectedOutfitIdx].outfitItems}
          onImageClick={onImageClick}
        />
      )}
    </>
  );
};

export default OutfitSection; 