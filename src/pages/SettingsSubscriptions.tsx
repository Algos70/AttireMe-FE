import React, { useEffect, useState } from 'react';
import { getUserByEmail, getUserSubscriptions } from '../utils/api';
import { useUser } from '../contexts/UserContext';

// Helper to generate a color from a string
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

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
        <h2 className="text-xl font-bold mb-4 text-black">Your Subscriptions</h2>
      )}
      {subscriptions.length === 0 ? (
        <div className="text-black font-semibold bg-white p-6 rounded-lg shadow border border-indigo-100">You are not subscribed to any creators.</div>
      ) : (
        <ul className="space-y-4">
          {subscriptions.map((sub: any) => (
            <li
              key={sub.Username}
              className="flex items-center p-0 h-16 bg-white rounded-lg shadow border border-indigo-100 text-black font-medium transition-all duration-200 hover:border-indigo-600 hover:text-indigo-600 hover:shadow-lg relative overflow-hidden"
            >
              {sub.ProfileImage ? (
                <img
                  src={sub.ProfileImage}
                  alt={sub.Username}
                  className="h-full w-1/5 object-cover border-r border-indigo-100"
                />
              ) : (
                <span
                  className="h-full w-1/5 flex items-center justify-center text-white font-bold text-lg border-r border-indigo-100"
                  style={{ backgroundColor: stringToColor(sub.Username || 'U') }}
                >
                  {sub.Username ? sub.Username.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
              <span className="pl-6">{sub.Username || 'Unknown Creator'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SettingsSubscriptions; 