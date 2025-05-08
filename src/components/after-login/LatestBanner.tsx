import { FC } from 'react'
import latestBanner from '../../assets/images/latest.png'

// LatestBanner.tsx
export const LatestBanner: FC = () => {
    return (
      <div className="bg-page text-center py-8 px-4">
        <div className="max-w-[384px] mx-auto">
          <img
            src={latestBanner}
            alt="Latest cover"
            className="w-full h-auto rounded-lg object-contain"
          />
        </div>
        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-800">Latest</h2>
      </div>
    );
  };
