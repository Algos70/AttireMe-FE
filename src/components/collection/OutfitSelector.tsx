import React from 'react';

interface OutfitSelectorProps {
  outfits: { imageURL: string }[];
  selectedOutfitIdx: number | null;
  setSelectedOutfitIdx: (idx: number) => void;
}

const OutfitSelector: React.FC<OutfitSelectorProps> = ({ outfits, selectedOutfitIdx, setSelectedOutfitIdx }) => (
  <div className="bg-white border border-indigo-100 rounded-2xl shadow-sm px-4 py-4 overflow-x-auto">
    <div className="flex flex-row gap-4 flex-nowrap min-w-max">
      {outfits.map((outfit, idx) => (
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
);

export default OutfitSelector; 