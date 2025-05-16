import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCreatorByUsername, isSubscribed, isFollowing, follow, unfollow, subscribe, unsubscribe, cancelUnsubscribe } from '../utils/api';
import { useUserProfile } from '../contexts/UserProfileContext';
import { CollectionCard, Collection } from '../components/collection/CollectionCard';
import CreatorBanner from '../components/creator/CreatorBanner';
import CreatorAvatar from '../components/creator/CreatorAvatar';
import CreatorProfileInfo from '../components/creator/CreatorProfileInfo';
import CreatorActions from '../components/creator/CreatorActions';
import CreatorCollections from '../components/creator/CreatorCollections';
import CreatorLoading from '../components/creator/CreatorLoading';
import { toast } from 'react-toastify';

const Creator: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { profile } = useUserProfile();
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUserSubscribed, setIsUserSubscribed] = useState<boolean>(false);
  const [isUserFollowing, setIsUserFollowing] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [allReady, setAllReady] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingSubscribe, setLoadingSubscribe] = useState(false);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setError(null);
    setAllReady(false);
    getCreatorByUsername(username)
      .then((res) => {
        console.log('Creator data:', res.data); // Debug log
        setCreator(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching creator:', err); // Debug log
        setError(err.message || 'Failed to load creator');
        setLoading(false);
      });
  }, [username]);

  useEffect(() => {
    let cancelled = false;
    async function fetchAll() {
      if (!profile || !username) {
        setAllReady(true);
        return;
      }
      setAllReady(false);
      try {
        // Get user ID from profile
        const uid = 'ID' in profile ? profile.ID : profile.UserID;
        setUserId(uid);
        
        if (uid && creator?.UserID) {
          console.log('Checking subscription and following status for:', { 
            creatorId: creator.UserID, 
            userId: uid,
            profile: profile,
            creator: creator
          });
          
          const [subRes, followRes] = await Promise.all([
            isSubscribed(creator.UserID, uid),
            isFollowing(creator.UserID, uid),
          ]);
          
          if (!cancelled) {
            setIsUserSubscribed(!!subRes?.data);
            setIsUserFollowing(!!followRes?.data);
            setAllReady(true);
          }
        } else {
          console.log('Missing required IDs:', { uid, creatorId: creator?.UserID });
          setAllReady(true);
        }
      } catch (error) {
        console.error('Error in fetchAll:', error);
        if (!cancelled) {
          setUserId(null);
          setIsUserSubscribed(false);
          setIsUserFollowing(false);
          setAllReady(true);
        }
      }
    }
    fetchAll();
    return () => { cancelled = true; };
  }, [username, profile, creator]);

  useEffect(() => {
    if (creator && creator.Username) {
      document.title = `AttireMe | ${creator.Username}`;
    }
  }, [creator]);

  const handleFollow = async () => {
    if (!userId || !creator?.UserID) {
      console.log('Missing IDs for follow:', { userId, creatorId: creator?.UserID });
      return;
    }
    setLoadingFollow(true);
    try {
      console.log('Following with IDs:', { creatorId: creator.UserID, userId });
      await follow(creator.UserID, userId);
      setIsUserFollowing(true);
      toast.success('You are now following this creator!');
    } catch (error) {
      console.error('Error in handleFollow:', error);
      toast.error('Failed to follow. Please try again.');
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleUnfollow = async () => {
    if (!userId || !creator?.UserID) {
      console.log('Missing IDs for unfollow:', { userId, creatorId: creator?.UserID });
      return;
    }
    setLoadingFollow(true);
    try {
      console.log('Unfollowing with IDs:', { creatorId: creator.UserID, userId });
      await unfollow(creator.UserID, userId);
      setIsUserFollowing(false);
      toast.success('You are no longer following this creator.');
    } catch (error) {
      console.error('Error in handleUnfollow:', error);
      toast.error('Failed to unfollow. Please try again.');
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleSubscribe = async () => {
    if (!userId || !creator?.UserID) {
      console.log('Missing IDs for subscribe:', { userId, creatorId: creator?.UserID });
      return;
    }
    setLoadingSubscribe(true);
    try {
      console.log('Subscribing with IDs:', { creatorId: creator.UserID, userId });
      await subscribe(creator.UserID, userId);
      setIsUserSubscribed(true);
      toast.success('You are now subscribed to this creator!');
    } catch (error) {
      console.error('Error in handleSubscribe:', error);
      // Try cancelUnsubscribe if subscribe fails
      try {
        await cancelUnsubscribe(creator.UserID, userId);
        setIsUserSubscribed(true);
        toast.success('Subscription restored after cancellation!');
      } catch (error) {
        console.error('Error in cancelUnsubscribe:', error);
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setLoadingSubscribe(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!userId || !creator?.UserID) {
      console.log('Missing IDs for unsubscribe:', { userId, creatorId: creator?.UserID });
      return;
    }
    setLoadingSubscribe(true);
    try {
      console.log('Unsubscribing with IDs:', { creatorId: creator.UserID, userId });
      await unsubscribe(creator.UserID, userId);
      setIsUserSubscribed(false);
      toast.success('You are no longer subscribed to this creator.');
    } catch (error) {
      console.error('Error in handleUnsubscribe:', error);
      toast.error('Failed to unsubscribe. Please try again.');
    } finally {
      setLoadingSubscribe(false);
    }
  };

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
          loadingFollow={loadingFollow}
          loadingSubscribe={loadingSubscribe}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
          onSubscribe={handleSubscribe}
          onUnsubscribe={handleUnsubscribe}
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