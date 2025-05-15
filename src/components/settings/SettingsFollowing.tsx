import React, { useEffect, useState } from 'react';
import { getUserByEmail, getAllFollowing } from '../../utils/api';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../after-login/ProfileCard';

const SettingsFollowing: React.FC = () => {
  const { user } = useUser();
  const [following, setFollowing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!user?.email) return;
      setLoading(true);
      setError(null);
      try {
        const userData = await getUserByEmail(user.email);
        const userId = userData?.data?.ID;
        if (!userId) throw new Error('User ID not found');
        const followingResponse = await getAllFollowing(userId);
        setFollowing(Array.isArray(followingResponse.data) ? followingResponse.data : []);
      } catch (err: any) {
        setError(err.message || 'Failed to load following list');
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, [user?.email]);

  if (loading) return <div className="text-center py-12">Loading following...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div>
      {following.length > 0 && (
        <h2 className="text-xl font-bold mb-4 text-black">You are Following</h2>
      )}
      {following.length === 0 ? (
        <div className="text-black font-semibold bg-white p-6 rounded-lg shadow border border-indigo-100">You are not following any creators.</div>
      ) : (
        <ul className="space-y-4">
          {following.map((creator: any) => (
            <li key={creator.Username}>
              <ProfileCard creator={creator} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SettingsFollowing; 