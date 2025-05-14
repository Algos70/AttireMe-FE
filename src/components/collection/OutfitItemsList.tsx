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
  <div className="mt-10">
    <h3 className="text-xl font-semibold mb-4 text-black">Outfit Items</h3>
    <div className="flex flex-col gap-8">
      {items.map((item, i) => (
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
              onClick={() => onImageClick(item.imageURL)}
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
);

export default OutfitItemsList; 