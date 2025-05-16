import React from 'react';
import { uploadToImgBB } from '../../utils/imgbb';
import OutfitItem from './OutfitItem';

interface Outfit {
  description: string;
  imageURL: string;
  outfitItems: {
    imageURL: string;
    storeName: string;
    productLink: string;
  }[];
}

interface OutfitListProps {
  outfits: Outfit[];
  onOutfitChange: (outfits: Outfit[]) => void;
  editMode?: boolean;
  onRemoveOutfit?: (id: number) => void;
  onRemoveOutfitItem?: (id: number) => void;
}

const OutfitList: React.FC<OutfitListProps> = ({ outfits, onOutfitChange, editMode = false, onRemoveOutfit, onRemoveOutfitItem }) => {
  const handleOutfitImageChange = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadToImgBB(file);
        const newOutfits = [...outfits];
        newOutfits[idx].imageURL = url;
        onOutfitChange(newOutfits);
      } catch (err) {
        console.error('Failed to upload outfit image:', err);
      }
    }
  };

  const handleAddOutfit = () => {
    onOutfitChange([
      ...outfits,
      {
        description: '',
        imageURL: '',
        outfitItems: [{ imageURL: '', storeName: '', productLink: '' }],
      },
    ]);
  };

  const handleRemoveOutfit = (idx: number) => {
    const outfit = outfits[idx];
    if (onRemoveOutfit && outfit && (outfit as any).id) {
      onRemoveOutfit((outfit as any).id);
    }
    onOutfitChange(outfits.filter((_, i) => i !== idx));
  };

  const handleAddOutfitItem = (outfitIdx: number) => {
    const newOutfits = [...outfits];
    newOutfits[outfitIdx].outfitItems.push({
      imageURL: '',
      storeName: '',
      productLink: '',
    });
    onOutfitChange(newOutfits);
  };

  const handleRemoveOutfitItem = (outfitIdx: number, itemIdx: number) => {
    const newOutfits = [...outfits];
    const item = newOutfits[outfitIdx].outfitItems[itemIdx];
    if (onRemoveOutfitItem && item && (item as any).id) {
      onRemoveOutfitItem((item as any).id);
    }
    newOutfits[outfitIdx].outfitItems = newOutfits[outfitIdx].outfitItems.filter(
      (_, i) => i !== itemIdx
    );
    onOutfitChange(newOutfits);
  };

  const handleOutfitItemChange = (
    outfitIdx: number,
    itemIdx: number,
    field: 'imageURL' | 'storeName' | 'productLink',
    value: string
  ) => {
    const newOutfits = [...outfits];
    newOutfits[outfitIdx].outfitItems[itemIdx][field] = value;
    onOutfitChange(newOutfits);
  };

  const handleOutfitDescriptionChange = (idx: number, value: string) => {
    const newOutfits = [...outfits];
    newOutfits[idx].description = value;
    onOutfitChange(newOutfits);
  };

  return (
    <div>
      <label className="block text-black font-semibold mb-4 text-lg sm:text-xl">Outfits</label>
      <div className="space-y-6 sm:space-y-8">
        {outfits.map((outfit, idx) => (
          <div
            key={idx}
            className="border border-indigo-300 rounded-2xl p-3 sm:p-6 bg-indigo-50/30 shadow flex flex-col gap-4 relative"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-black text-base sm:text-lg">
                Outfit #{idx + 1}
              </span>
              {outfits.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOutfit(idx)}
                  className="text-red-500 hover:underline text-xs sm:text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            <div>
              <label className="block text-black mb-1 font-medium">Description</label>
              <input
                value={outfit.description}
                onChange={(e) => handleOutfitDescriptionChange(idx, e.target.value)}
                className="w-full border border-indigo-200 rounded px-2 py-2 sm:px-3 bg-white text-black text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-black mb-1 font-medium">Outfit Image</label>
              <label className="px-3 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 font-semibold inline-block">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleOutfitImageChange(idx, e)}
                  className="hidden"
                />
              </label>
              {outfit.imageURL && (
                <img
                  src={outfit.imageURL}
                  alt="Outfit Preview"
                  className="mt-2 rounded-xl border border-indigo-200 max-h-40 sm:max-h-56 object-contain mx-auto w-full sm:w-auto"
                />
              )}
            </div>
            <div>
              <label className="block text-black mb-2 font-medium">Outfit Items</label>
              <div className="space-y-3">
                {outfit.outfitItems.map((item, itemIdx) => (
                  <OutfitItem
                    key={itemIdx}
                    item={item}
                    onItemChange={(field, value) =>
                      handleOutfitItemChange(idx, itemIdx, field, value)
                    }
                    onRemove={() => handleRemoveOutfitItem(idx, itemIdx)}
                    canRemove={outfit.outfitItems.length > 1}
                  />
                ))}
                {!editMode && (
                  <button
                    type="button"
                    onClick={() => handleAddOutfitItem(idx)}
                    className="mt-2 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold text-sm sm:text-base"
                  >
                    Add Item
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!editMode && (
        <button
          type="button"
          onClick={handleAddOutfit}
          className="w-full mt-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-indigo-600 transition font-bold text-base sm:text-lg"
        >
          Add Outfit
        </button>
      )}
    </div>
  );
};

export default OutfitList; 