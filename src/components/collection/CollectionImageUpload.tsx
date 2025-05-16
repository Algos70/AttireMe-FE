import React from 'react';
import { uploadToImgBB } from '../../utils/imgbb';

interface CollectionImageUploadProps {
  imagePreview: string | null;
  onImageChange: (url: string) => void;
  onPreviewChange: (url: string | null) => void;
}

const CollectionImageUpload: React.FC<CollectionImageUploadProps> = ({
  imagePreview,
  onImageChange,
  onPreviewChange,
}) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPreviewChange(URL.createObjectURL(file));
      try {
        const url = await uploadToImgBB(file);
        onImageChange(url);
      } catch (err) {
        console.error('Failed to upload collection image:', err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <label className="block text-black font-semibold mb-2 text-lg">Collection Image</label>
      <label className="px-4 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 font-semibold mb-2">
        Choose Image
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="rounded-xl border border-indigo-300 shadow-lg w-full max-w-xs sm:max-w-lg max-h-60 sm:max-h-[400px] object-contain"
        />
      )}
    </div>
  );
};

export default CollectionImageUpload; 