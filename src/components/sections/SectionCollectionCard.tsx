import React from 'react';

export interface SelectionCollectionCardProps {
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

const CollectionCard: React.FC<SelectionCollectionCardProps> = ({ image, title, subtitle, link }) => (
  <a
    href={link}
    className="
      group
      flex flex-col h-full
      overflow-hidden
      rounded-lg bg-white
      shadow-md
      transition-transform transform
      hover:scale-105
    "
  >
    <div className="h-48 w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>

    <div className="flex flex-col flex-1 p-4">
      <div>
        <h3 className="text-xl font-semibold text-patreon-dark">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

            <span
        className="
          mt-auto inline-flex items-center justify-center
          rounded-sm
          bg-patreon-dark
          px-4 py-1.5
          text-xs font-medium text-white
          transition-colors duration-300
          hover:bg-patreon-blue-dark
        "
      >
        View Collection
      </span>
    </div>
  </a>
);

export default CollectionCard;
