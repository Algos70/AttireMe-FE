import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCreatorByUsername, getFollowersOfCreator, getCreatorSubscribers } from '../utils/api';

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

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      {/* Header Card */}
      <div className="flex items-center gap-4 bg-white rounded-xl shadow-lg px-6 py-5 mb-8 border border-gray-100">
        {creator?.ProfileImage ? (
          <img src={creator.ProfileImage} alt={creator.Username} className="h-16 w-16 rounded-full object-cover border-2 border-indigo-100" />
        ) : (
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-700">
            {creator?.Username ? creator.Username.charAt(0).toUpperCase() : '?'}
          </div>
        )}
        <div>
          <div className="text-xl font-bold text-gray-900">{creator?.Username || username}</div>
          <div className="flex gap-4 mt-1 text-sm text-gray-500">
            <span>Followers: {creator?.Followers ?? followers.length}</span>
            <span>Subscribers: {creator?.Subscribers ?? subscribers.length}</span>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 ${activeTab === 'followers' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50'}`}
          onClick={() => setActiveTab('followers')}
        >
          Followers
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 ${activeTab === 'subscribers' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50'}`}
          onClick={() => setActiveTab('subscribers')}
        >
          Subscribers
        </button>
      </div>
      {/* List */}
      {loading ? (
        <div className="text-gray-400 text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : (
        <div className="bg-white rounded-xl shadow border border-gray-100 p-2 min-h-[120px]">
          {activeTab === 'followers' ? (
            followers.length > 0 ? (
              followers.map((f, i) => (
                <div key={f.ID || f.id || i} className="flex items-center gap-3 py-3 px-3 text-sm text-gray-800 border-b last:border-b-0 hover:bg-indigo-50 transition cursor-pointer rounded">
                  {f.ProfileImage ? (
                    <img src={f.ProfileImage} alt={f.Username} className="h-8 w-8 rounded-full object-cover border border-gray-200" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-base font-bold text-indigo-700">
                      {f.Username ? f.Username.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <span className="font-medium">{f.Username || f.username || f.Email || f.email}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-400 text-center py-8">No followers yet.</div>
            )
          ) : (
            subscribers.length > 0 ? (
              subscribers.map((s, i) => (
                <div key={s.ID || s.id || i} className="flex items-center gap-3 py-3 px-3 text-sm text-gray-800 border-b last:border-b-0 hover:bg-indigo-50 transition cursor-pointer rounded">
                  {s.ProfileImage ? (
                    <img src={s.ProfileImage} alt={s.Username} className="h-8 w-8 rounded-full object-cover border border-gray-200" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-base font-bold text-indigo-700">
                      {s.Username ? s.Username.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                  <span className="font-medium">{s.Username || s.username || s.Email || s.email}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-400 text-center py-8">No subscribers yet.</div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AudiencePage; 