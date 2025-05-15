import React, { FC, useEffect, useState } from "react";
import { getUserByEmail, getUserSubscriptions } from "../../utils/api";
import { useUser } from "../../contexts/UserContext";
import { stringToColor } from "../../utils/colorUtils";

interface SubscriptionItemProps {
  subscription: any;
}

export const SubscriptionItem: FC<SubscriptionItemProps> = ({ subscription }) => (
  <a
    key={subscription.Username}
    href={`/h/creator/${subscription.UserID}`}
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
  const { user } = useUser();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user?.email) return;
      
      setIsLoading(true);
      try {
        const userData = await getUserByEmail(user.email);
        const userId = userData?.data?.ID;
        if (!userId) throw new Error('User ID not found');
        
        const subsResponse = await getUserSubscriptions(userId);
        setSubscriptions(Array.isArray(subsResponse.data) ? subsResponse.data.slice(0, 4) : []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user?.email]);

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