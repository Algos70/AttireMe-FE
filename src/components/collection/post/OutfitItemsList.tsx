import React from 'react';

interface OutfitItem {
  imageURL: string;
  storeName: string;
  productLink: string;
}

interface OutfitItemsListProps {
  items: OutfitItem[];
  onImageClick: (url: string) => void;
}

const OutfitItemsList: React.FC<OutfitItemsListProps> = ({ items, onImageClick }) => (
  <div className="mb-12">
    <h3 className="text-xl font-semibold mb-4 text-black">Outfit Items</h3>
    <div className="space-y-4">
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item, idx) => (
          <div key={idx} className="flex items-center bg-indigo-50/60 rounded-xl border border-indigo-100 p-4 gap-4 shadow-sm">
            <img
              src={item.imageURL}
              alt={item.storeName}
              className="w-16 h-16 rounded-lg object-cover border border-indigo-100 cursor-pointer"
              onClick={() => onImageClick(item.imageURL)}
            />
            <div className="flex-1">
              <div className="font-medium text-black text-base mb-1">{item.storeName}</div>
            </div>
            <a
              href={item.productLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-black transition text-sm"
            >
              View Product
            </a>
          </div>
        ))
      ) : (
        <div className="text-gray-500">No items found for this outfit.</div>
      )}
    </div>
  </div>
);

export default OutfitItemsList; 