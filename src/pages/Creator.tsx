import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCreatorByUsername, isSubscribed, isFollowing, follow, unfollow, subscribe, unsubscribe, cancelUnsubscribe, getAllCollectionsForCreator, getAllFreeCollectionsForCreator } from '../utils/api';
import { useUserProfile } from '../contexts/UserProfileContext';
import { CollectionCard, Collection } from '../components/collection/CollectionCard';
import CreatorBanner from '../components/creator/CreatorBanner';
import CreatorAvatar from '../components/creator/CreatorAvatar';
import CreatorProfileInfo from '../components/creator/CreatorProfileInfo';
import CreatorActions from '../components/creator/CreatorActions';
import CreatorCollections from '../components/creator/CreatorCollections';
import Loading from '../components/creator/Loading';
import { toast } from 'react-toastify';
import CreatorCollectionFilter from '../components/creator/CreatorCollectionFilter';

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
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  const [collectionsError, setCollectionsError] = useState<string | null>(null);
  const [collectionsPage, setCollectionsPage] = useState(1);
  const [collectionsPageSize] = useState(10);
  const [collectionsTotalPages, setCollectionsTotalPages] = useState(1);
  const [collectionsTotalCount, setCollectionsTotalCount] = useState(0);
  const [collectionsFilter, setCollectionsFilter] = useState<'all' | 'free'>('all');
  const [collectionsHasMore, setCollectionsHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

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

  // Reset collections and page when filter, creator, or userId changes
  useEffect(() => {
    setCollections([]);
    setCollectionsPage(1);
    setCollectionsTotalPages(1);
    setCollectionsTotalCount(0);
    setCollectionsHasMore(true);
  }, [creator, userId, collectionsFilter, collectionsPageSize]);

  // Fetch collections when page changes or on initial load
  useEffect(() => {
    if (!creator?.UserID || !collectionsHasMore) return;
    setCollectionsLoading(true);
    setCollectionsError(null);
    const fetchCollections = async () => {
      try {
        let res;
        if (collectionsFilter === 'free') {
          res = await getAllFreeCollectionsForCreator({
            creatorID: creator.UserID,
            pageSize: collectionsPageSize,
            page: collectionsPage,
          });
        } else {
          res = await getAllCollectionsForCreator({
            creatorID: creator.UserID,
            pageSize: collectionsPageSize,
            page: collectionsPage,
            userID: userId || undefined,
          });
        }
        // Map API response to Collection[]
        const apiData = res?.data?.Data || [];
        const mappedCollections: Collection[] = apiData.map((col: any) => ({
          collectionId: col.ID,
          collectionImage: col.CollectionImage,
          creatorID: col.CreatorID,
          creatorName: creator.Username,
          creatorUsername: creator.Username,
          creatorProfileImage: creator.ProfileImage,
          title: col.Title,
        }));
        setCollections(prev => collectionsPage === 1 ? mappedCollections : [...prev, ...mappedCollections]);
        setCollectionsTotalPages(res?.data?.TotalPages || 1);
        setCollectionsTotalCount(res?.data?.TotalCount || 0);
        setCollectionsHasMore(collectionsPage < (res?.data?.TotalPages || 1));
      } catch (err: any) {
        setCollectionsError(err.message || 'Failed to load collections');
      } finally {
        setCollectionsLoading(false);
      }
    };
    fetchCollections();
  }, [creator, userId, collectionsPage, collectionsFilter, collectionsPageSize, collectionsHasMore]);

  // Infinite scroll observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !collectionsLoading && collectionsHasMore) {
      setCollectionsPage(prev => prev + 1);
    }
  }, [collectionsLoading, collectionsHasMore]);

  useEffect(() => {
    if (collectionsLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(handleObserver);
    if (sentinelRef.current) observer.current.observe(sentinelRef.current);
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [handleObserver, collectionsLoading, collectionsHasMore]);

  if (loading || !allReady) {
    return <Loading />;
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

  // Only show the button if the logged-in user is the creator
  const isOwnProfile = !!(profile && ((('ID' in profile) && profile.ID === creator.UserID) || (('UserID' in profile) && profile.UserID === creator.UserID)));

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
          isOwnProfile={isOwnProfile}
        />
        {isOwnProfile && (
          <button
            className="mt-6 px-6 py-3 bg-indigo-500 text-white font-bold rounded-lg shadow hover:bg-black transition"
            onClick={() => navigate(`/h/creator/${creator.Username}/create-collection`)}
          >
            Create Collection
          </button>
        )}
      </div>
      <div className="w-full flex flex-col items-center my-12">
        <div className="relative w-full max-w-2xl flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
          <span className="mx-4 text-2xl text-indigo-400 drop-shadow-sm">★</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
        </div>
        {/* Filter toggle */}
        <CreatorCollectionFilter value={collectionsFilter} onChange={setCollectionsFilter} />
      </div>
      {collectionsError ? (
        <div className="text-center py-12 text-red-500">{collectionsError}</div>
      ) : (
        <>
          <CreatorCollections collections={collections} />
          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} style={{ height: 1 }} />
          {collectionsLoading && (
            <div className="flex justify-center my-6">
              <Loading />
            </div>
          )}
          {/* Optionally show total count */}
          <div className="text-center text-gray-500 mb-8">
            Showing {collections.length} of {collectionsTotalCount} collections
          </div>
        </>
      )}
    </div>
  );
};

export default Creator; 