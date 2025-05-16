import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCreatorByUsername, getFollowersOfCreator, getCreatorSubscribers } from '../utils/api';
import Loading from '../components/creator/Loading';
import AudienceHeader from '../components/audience/AudienceHeader';
import AudienceTabs from '../components/audience/AudienceTabs';
import AudienceList from '../components/audience/AudienceList';

const AudiencePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [creator, setCreator] = useState<any>(null);
  const [creatorId, setCreatorId] = useState<number | null>(null);
  const [followers, setFollowers] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'followers' | 'subscribers'>('followers');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    getCreatorByUsername(username)
      .then(res => {
        setCreator(res.data);
        const id = res.data?.UserID;
        setCreatorId(id);
        if (id) {
          Promise.all([
            getFollowersOfCreator(id),
            getCreatorSubscribers(id)
          ]).then(([followersRes, subscribersRes]) => {
            setFollowers(Array.isArray(followersRes.data) ? followersRes.data : []);
            setSubscribers(Array.isArray(subscribersRes.data) ? subscribersRes.data : []);
            setLoading(false);
          }).catch(() => {
            setFollowers([]);
            setSubscribers([]);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setError('Creator not found');
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      {/* Header Card */}
      {creator && (
        <AudienceHeader
          creator={creator}
          username={username || ''}
          followersCount={creator.Followers ?? followers.length}
          subscribersCount={creator.Subscribers ?? subscribers.length}
        />
      )}
      {/* Tabs */}
      <AudienceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* List */}
      {error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : (
        <AudienceList activeTab={activeTab} followers={followers} subscribers={subscribers} />
      )}
    </div>
  );
};

export default AudiencePage; 