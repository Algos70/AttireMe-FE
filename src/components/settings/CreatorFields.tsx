import React from "react";

interface CreatorFieldsProps {
  bio: string;
  setBio: (bio: string) => void;
  subscriptionFee: number;
  setSubscriptionFee: (fee: number) => void;
}

const CreatorFields: React.FC<CreatorFieldsProps> = ({ bio, setBio, subscriptionFee, setSubscriptionFee }) => (
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
    <label className="block text-sm font-medium text-black mb-2 mt-4">
      Subscription Fee ($/month)
    </label>
    <input
      type="number"
      min={0}
      value={subscriptionFee}
      onChange={(e) => setSubscriptionFee(Number(e.target.value))}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black bg-white"
    />
  </div>
);

export default CreatorFields; 