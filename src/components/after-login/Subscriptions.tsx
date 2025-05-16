import React, { FC, useEffect, useState } from "react";
import { getUserSubscriptions } from "../../utils/api";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { stringToColor } from "../../utils/colorUtils";

interface SubscriptionItemProps {
  subscription: any;
}

export const SubscriptionItem: FC<SubscriptionItemProps> = ({ subscription }) => (
  <a
    key={subscription.Username}
    href={`/h/creator/${subscription.Username}`}
    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg transition-all duration-200"
  >
    {subscription.ProfileImage ? (
      <img
        src={subscription.ProfileImage}
        alt={subscription.Username}
        className="h-6 w-6 rounded-md object-cover mr-3"
      />
    ) : (
      <span
        className="h-6 w-6 rounded-md flex items-center justify-center text-white text-xs font-bold mr-3"
        style={{ backgroundColor: stringToColor(subscription.Username || 'U') }}
      >
        {subscription.Username ? subscription.Username.charAt(0).toUpperCase() : 'U'}
      </span>
    )}
    <span className="truncate">{subscription.Username || 'Unknown'}</span>
  </a>
);

export const LoadingSkeleton: FC = () => (
  <>
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex items-center px-3 py-2 animate-pulse">
        <div className="h-6 w-6 rounded-md bg-gray-200 mr-3" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    ))}
  </>
);

export const SubscriptionsSection: FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useUserProfile();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!profile) return;
      // Creator ise UserID, user ise ID kullan
      const userId = 'UserID' in profile ? profile.UserID : ('ID' in profile ? profile.ID : null);
      if (!userId) return;
      setIsLoading(true);
      try {
        const subsResponse = await getUserSubscriptions(userId);
        setSubscriptions(Array.isArray(subsResponse.data) ? subsResponse.data.slice(0, 4) : []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, [profile]);

  return (
    <>
      <div className="mt-8 px-6 text-xs font-semibold text-gray-500 uppercase">
        Subscriptions
      </div>
      <nav className="mt-2 px-6 space-y-1">
        {isLoading ? (
          <LoadingSkeleton />
        ) : subscriptions.length > 0 ? (
          subscriptions.map((sub) => <SubscriptionItem key={sub.Username} subscription={sub} />)
        ) : (
          <div className="px-3 py-2 text-sm text-gray-500">
            No subscriptions yet
          </div>
        )}
      </nav>
    </>
  );
}; 