import React from 'react';

interface AudienceHeaderProps {
  creator: any;
  username: string;
  followersCount: number;
  subscribersCount: number;
}

const AudienceHeader: React.FC<AudienceHeaderProps> = ({ creator, username, followersCount, subscribersCount }) => {
  const subscriptionFee = creator.SubscriptionFee || 0;
  const estimatedEarnings = subscriptionFee * subscribersCount;

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow-lg px-6 py-5 mb-8 border border-gray-100">
      {creator.ProfileImage ? (
        <img src={creator.ProfileImage} alt={creator.Username} className="h-16 w-16 rounded-full object-cover border-2 border-indigo-100" />
      ) : (
        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-700">
          {creator.Username ? creator.Username.charAt(0).toUpperCase() : '?'}
        </div>
      )}
      <div>
        <div className="text-xl font-bold text-gray-900">{creator.Username || username}</div>
        <div className="flex gap-4 mt-1 text-sm text-gray-500">
          <span>Followers: {followersCount}</span>
          <span>Subscribers: {subscribersCount}</span>
        </div>
        <div className="mt-1 text-sm text-green-700 font-semibold">
          Est. Monthly Earnings: ${estimatedEarnings.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default AudienceHeader; 