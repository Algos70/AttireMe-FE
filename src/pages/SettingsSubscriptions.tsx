import React, { useEffect, useState } from 'react';
import { getUserByEmail, getUserSubscriptions } from '../utils/api';
import { useUser } from '../contexts/UserContext';

const SettingsSubscriptions: React.FC = () => {
  const { user } = useUser();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user?.email) return;
      setLoading(true);
      setError(null);
      try {
        const userData = await getUserByEmail(user.email);
        const userId = userData?.data?.ID;
        if (!userId) throw new Error('User ID not found');
        const subsResponse = await getUserSubscriptions(userId);
        setSubscriptions(Array.isArray(subsResponse.data) ? subsResponse.data : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load subscriptions');
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, [user?.email]);

  if (loading) return <div className="text-center py-12">Loading subscriptions...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div>
      {subscriptions.length > 0 && (
        <h2 className="text-xl font-bold mb-4">Your Subscriptions</h2>
      )}
      {subscriptions.length === 0 ? (
        <div className="text-black">You are not subscribed to any creators.</div>
      ) : (
        <ul className="space-y-4">
          {subscriptions.map((sub: any) => (
            <li key={sub.ID} className="p-4 bg-gray-100 rounded-lg">
              {sub.Username || 'Unknown Creator'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SettingsSubscriptions; 