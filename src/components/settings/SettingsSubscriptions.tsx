import React, { useEffect, useState } from 'react';
import { getUserSubscriptions } from '../../utils/api';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../after-login/ProfileCard';

const SettingsSubscriptions: React.FC = () => {
  const { profile } = useUserProfile();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!profile) return;
      setLoading(true);
      setError(null);
      try {
        const userId = 'ID' in profile ? profile.ID : profile.UserID;
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
  }, [profile]);

  if (loading) return <div className="text-center py-12">Loading subscriptions...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {subscriptions.length > 0 && (
        <h2 className="text-xl font-bold mb-4 text-black">Your Subscriptions</h2>
      )}
      {subscriptions.length === 0 ? (
        <div className="text-black font-semibold bg-white p-6 rounded-lg shadow border border-indigo-100">
          You are not subscribed to any creators.
        </div>
      ) : (
        <ul className="space-y-4">
          {subscriptions.map((sub: any) => (
            <li key={sub.Username}>
              <ProfileCard creator={sub} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SettingsSubscriptions; 