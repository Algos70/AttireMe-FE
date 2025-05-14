import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCreatorById, isSubscribed, isFollowing, getUserByEmail } from '../utils/api';
import { useUser } from '../contexts/UserContext';
import { CollectionCard, Collection } from '../components/after-login/CollectionCard';
import CreatorBanner from '../components/creator/CreatorBanner';
import CreatorAvatar from '../components/creator/CreatorAvatar';
import CreatorProfileInfo from '../components/creator/CreatorProfileInfo';
import CreatorActions from '../components/creator/CreatorActions';
import CreatorCollections from '../components/creator/CreatorCollections';
import CreatorLoading from '../components/creator/CreatorLoading';

const Creator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUserSubscribed, setIsUserSubscribed] = useState<boolean>(false);
  const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [allReady, setAllReady] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setAllReady(false);
    getCreatorById(id)
      .then((res) => {
        setCreator(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load creator');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      if (!user?.email || !id) return;
      setAllReady(false);
      try {
        const userRes = await getUserByEmail(user.email);
        const uid = userRes?.data?.ID;
        setUserId(uid);
        if (uid && id) {
          const [subRes, followRes] = await Promise.all([
            isSubscribed(Number(id), uid),
            isFollowing(Number(id), uid),
          ]);
          if (!cancelled) {
            setIsUserSubscribed(!!subRes?.data);
            setIsUserFollowing(!!followRes?.data);
            setAllReady(true);
          }
        }
      } catch {
        if (!cancelled) {
          setUserId(null);
          setIsUserSubscribed(false);
          setIsUserFollowing(false);
          setAllReady(true); // still allow page to load, but with defaults
        }
      }
    }
    fetchAll();
    return () => { cancelled = true; };
  }, [id, user?.email]);

  if (loading || !allReady) {
    return <CreatorLoading />;
  }
  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }
  if (!creator) {
    return <div className="text-center py-12 text-gray-500">No creator found.</div>;
  }

  // Map API fields to UI fields
  const vendorProfile = {
    name: creator.Username,
    username: creator.Username,
    description: creator.Bio || '',
    followers: creator.Followers,
    subscribers: creator.Subscribers,
    avatar: creator.ProfileImage || '',
    banner: creator.BannerImage || '',
    subscriptionFee: creator.SubscriptionFee,
  };

  const collections: Collection[] = [
    {
      collectionId: 1,
      collectionImage: 'https://picsum.photos/900/300?random=1',
      creatorID: 1,
      creatorName: vendorProfile.name,
      creatorUsername: vendorProfile.username,
      creatorProfileImage: vendorProfile.avatar,
      title: 'Collection 1',
    },
    {
      collectionId: 2,
      collectionImage: 'https://picsum.photos/900/300?random=2',
      creatorID: 1,
      creatorName: vendorProfile.name,
      creatorUsername: vendorProfile.username,
      creatorProfileImage: vendorProfile.avatar,
      title: 'Collection 2',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <CreatorBanner banner={vendorProfile.banner} username={vendorProfile.username} />
      <div className="relative flex flex-col items-center">
        <CreatorAvatar avatar={vendorProfile.avatar} username={vendorProfile.username} />
        <CreatorProfileInfo
          name={vendorProfile.name}
          description={vendorProfile.description}
          followers={vendorProfile.followers}
          subscribers={vendorProfile.subscribers}
        />
        <CreatorActions
          subscriptionFee={vendorProfile.subscriptionFee}
          isSubscribed={isUserSubscribed}
          isFollowing={isUserFollowing}
        />
      </div>
      <div className="w-full flex flex-col items-center my-12">
        <div className="relative w-full max-w-2xl flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
          <span className="mx-4 text-2xl text-indigo-400 drop-shadow-sm">★</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        </div>
      </div>
      <CreatorCollections collections={collections} />
    </div>
  );
};

export default Creator; 