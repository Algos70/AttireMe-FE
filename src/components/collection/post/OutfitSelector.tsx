import React from 'react';

interface OutfitSelectorProps {
  outfits: { imageURL: string }[];
  selectedOutfitIdx: number | null;
  setSelectedOutfitIdx: (idx: number) => void;
}

const OutfitSelector: React.FC<OutfitSelectorProps> = ({ outfits, selectedOutfitIdx, setSelectedOutfitIdx }) => (
  <div className="flex gap-4 mb-8 overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent pr-2" style={{ WebkitOverflowScrolling: 'touch' }}>
    {Array.isArray(outfits) && outfits.length > 0 ? (
      outfits.map((outfit, idx) => (
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
);

export default OutfitSelector; 