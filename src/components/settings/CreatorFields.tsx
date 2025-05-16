import React from "react";

interface CreatorFieldsProps {
  bio: string;
  setBio: (bio: string) => void;
}

const CreatorFields: React.FC<CreatorFieldsProps> = ({ bio, setBio }) => (
  <div>
    <label className="block text-sm font-medium text-black mb-2">
      Bio
    </label>
    <textarea
      value={bio}
      onChange={(e) => setBio(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black bg-white"
      rows={3}
    />
  </div>
);

export default CreatorFields; 