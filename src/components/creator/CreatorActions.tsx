import React from 'react';

interface CreatorActionsProps {
  subscriptionFee: number;
  isSubscribed: boolean;
  isFollowing: boolean;
}

const CreatorActions: React.FC<CreatorActionsProps> = ({ subscriptionFee, isSubscribed, isFollowing }) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full max-w-xs sm:max-w-none justify-center items-center">
    <button
      className={`w-full sm:w-auto px-6 py-2 rounded-full font-semibold shadow transition-colors ${isSubscribed ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
      disabled={isSubscribed}
    >
      {isSubscribed ? 'Subscribed' : `Subscribe ${typeof subscriptionFee === 'number' ? (subscriptionFee > 0 ? `$${subscriptionFee}/mo` : 'Free') : ''}`}
    </button>
    <button
      className={`w-full sm:w-auto px-6 py-2 rounded-full font-semibold border border-black/10 shadow transition-colors ${isFollowing ? 'bg-green-100 text-green-700' : 'bg-white text-black hover:bg-gray-100'}`}
      disabled={isFollowing}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  </div>
);

export default CreatorActions; 