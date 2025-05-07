import { FC } from 'react'

// LatestBanner.tsx
export const LatestBanner: FC = () => {
    const imageUrl = 'https://picsum.photos/800/300?random=1';
    return (
      <div className="bg-page text-center py-8 px-4">
        <img
          src={imageUrl}
          alt="Latest cover"
          className="mx-auto rounded-lg shadow-lg w-32 sm:w-48 lg:w-64"
        />
        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-800">Latest</h2>
      </div>
    );
  };
  
