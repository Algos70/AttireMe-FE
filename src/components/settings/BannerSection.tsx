import React from "react";

interface BannerSectionProps {
  bannerImage: string | null;
  onBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BannerSection: React.FC<BannerSectionProps> = ({ bannerImage, onBannerChange }) => (
  <div className="mb-6">
    {bannerImage ? (
      <img
        src={bannerImage}
        alt="Banner"
        className="h-40 w-full max-w-2xl object-cover rounded"
      />
    ) : (
      <div className="h-40 w-full max-w-2xl rounded bg-indigo-100 flex items-center justify-center text-indigo-400 font-bold text-2xl">
        No Banner
      </div>
    )}
    <div className="flex flex-col items-start space-y-2 mt-2">
      <input
        type="file"
        accept="image/*"
        onChange={onBannerChange}
        className="hidden"
        id="banner-upload"
      />
      <label
        htmlFor="banner-upload"
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
      >
        Change Banner
      </label>
    </div>
  </div>
);

export default BannerSection; 