import React from 'react';
import { uploadToImgBB } from '../../utils/imgbb';

interface OutfitItemProps {
  item: {
    imageURL: string;
    storeName: string;
    productLink: string;
  };
  onItemChange: (field: 'imageURL' | 'storeName' | 'productLink', value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const OutfitItem: React.FC<OutfitItemProps> = ({
  item,
  onItemChange,
  onRemove,
  canRemove,
}) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadToImgBB(file);
        onItemChange('imageURL', url);
      } catch (err) {
        console.error('Failed to upload item image:', err);
      }
    }
  };

  return (
    <div className="bg-white/80 p-2 sm:p-4 rounded-lg border border-indigo-100 flex flex-col gap-2 mb-2">
      <label className="text-black font-medium mb-1">Store Name</label>
      <input
        type="text"
        placeholder="Store Name"
        value={item.storeName}
        onChange={(e) => onItemChange('storeName', e.target.value)}
        className="border border-indigo-200 rounded px-2 py-1 bg-white text-black text-sm sm:text-base"
      />
      <label className="text-black font-medium mb-1 mt-2">Product Link</label>
      <input
        type="text"
        placeholder="Product Link"
        value={item.productLink}
        onChange={(e) => onItemChange('productLink', e.target.value)}
        className="border border-indigo-200 rounded px-2 py-1 bg-white text-black text-sm sm:text-base"
      />
      <label className="text-black font-medium mb-1 mt-2">Item Image</label>
      <label className="px-3 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 font-semibold inline-block">
        Choose Image
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>
      {item.imageURL && (
        <img
          src={item.imageURL}
          alt="Item Preview"
          className="rounded border border-indigo-200 max-h-16 sm:max-h-20 max-w-full sm:max-w-[120px] object-contain mt-2"
        />
      )}
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:underline text-xs font-medium mt-2 self-end"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default OutfitItem; 