import React from 'react';

interface OutfitItem {
  imageURL: string;
  storeName: string;
  productLink: string;
}

interface ReviewOutfitCardProps {
  outfit: {
    description: string;
    imageURL: string;
    outfitItems: OutfitItem[];
  };
  index: number;
}

const ReviewOutfitCard: React.FC<ReviewOutfitCardProps> = ({ outfit, index }) => (
  <div className="p-4 bg-white border border-indigo-100 rounded-xl shadow flex flex-col gap-3">
    <div className="flex items-center gap-3 mb-2">
      <span className="font-semibold text-indigo-600">Outfit #{index + 1}</span>
      {outfit.imageURL && <img src={outfit.imageURL} alt="Outfit" className="rounded-xl border border-indigo-100 max-h-20 max-w-[80px] object-contain" />}
    </div>
    <div className="text-gray-700"><span className="font-medium text-black">Description:</span> {outfit.description}</div>
    <div>
      <span className="font-medium text-black">Items:</span>
      <ul className="list-disc ml-6 mt-1 space-y-1">
        {outfit.outfitItems.map((item, itemIdx) => (
          <li key={itemIdx} className="flex items-center gap-2 text-gray-700">
            {item.imageURL && <img src={item.imageURL} alt="Item" className="inline-block rounded border border-indigo-100 max-h-8 max-w-8 object-contain" />}
            <span className="font-medium text-black">Store:</span> {item.storeName},
            <span className="font-medium text-black">Link:</span> <a href={item.productLink} className="text-indigo-600 underline" target="_blank" rel="noopener noreferrer">{item.productLink}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ReviewOutfitCard; 