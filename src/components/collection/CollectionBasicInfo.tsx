import React from 'react';

interface CollectionBasicInfoProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

const CollectionBasicInfo: React.FC<CollectionBasicInfoProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}) => {
  return (
    <>
      <div>
        <label className="block text-black font-semibold mb-2">Collection Title</label>
        <input
          name="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
          className="w-full border border-indigo-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-black text-base sm:text-lg"
        />
      </div>
      <div>
        <label className="block text-black font-semibold mb-2">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          required
          rows={3}
          className="w-full border border-indigo-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-black text-base sm:text-lg"
        />
      </div>
    </>
  );
};

export default CollectionBasicInfo; 