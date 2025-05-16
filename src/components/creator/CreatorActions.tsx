import React from 'react';

interface CreatorActionsProps {
  subscriptionFee: number;
  isSubscribed: boolean;
  isFollowing: boolean;
  loadingFollow?: boolean;
  loadingSubscribe?: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  isOwnProfile?: boolean;
}

const CreatorActions: React.FC<CreatorActionsProps> = ({
  subscriptionFee,
  isSubscribed,
  isFollowing,
  loadingFollow = false,
  loadingSubscribe = false,
  onFollow,
  onUnfollow,
  onSubscribe,
  onUnsubscribe,
  isOwnProfile = false,
}) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full max-w-xs sm:max-w-none justify-center items-center">
    {!isOwnProfile && (
      <>
        {isSubscribed ? (
          <button
            className="w-full sm:w-auto px-6 py-2 rounded-full font-semibold shadow bg-green-500 text-white transition-colors"
            onClick={onUnsubscribe}
            disabled={loadingSubscribe}
          >
            {loadingSubscribe ? 'Unsubscribing...' : 'Unsubscribe'}
          </button>
        ) : (
          <button
            className="w-full sm:w-auto px-6 py-2 rounded-full font-semibold shadow bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            onClick={onSubscribe}
            disabled={loadingSubscribe}
          >
            {loadingSubscribe ? 'Subscribing...' : `Subscribe ${typeof subscriptionFee === 'number' ? (subscriptionFee > 0 ? `$${subscriptionFee}/mo` : 'Free') : ''}`}
          </button>
        )}
        {isFollowing ? (
          <button
            className="w-full sm:w-auto px-6 py-2 rounded-full font-semibold border border-black/10 shadow bg-green-100 text-green-700 transition-colors"
            onClick={onUnfollow}
            disabled={loadingFollow}
          >
            {loadingFollow ? 'Unfollowing...' : 'Unfollow'}
          </button>
        ) : (
          <button
            className="w-full sm:w-auto px-6 py-2 rounded-full font-semibold border border-black/10 shadow bg-white text-black hover:bg-gray-100 transition-colors"
            onClick={onFollow}
            disabled={loadingFollow}
          >
            {loadingFollow ? 'Following...' : 'Follow'}
          </button>
        )}
      </>
    )}
  </div>
);

export default CreatorActions; 