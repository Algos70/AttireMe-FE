import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';
import { getDetailedCollectionById, getCreatorById, isSubscribed } from '../utils/api';
import ImageModal from '../components/collection/ImageModal';
import Loading from '../components/creator/Loading';
import CollectionHeaderCard from '../components/collection/post/CollectionHeaderCard';
import CollectionTitle from '../components/collection/post/CollectionTitle';
import OutfitSection from '../components/collection/post/OutfitSection';
import ReviewsSection from '../components/collection/review/ReviewsSection';
import ErrorState from '../components/collection/post/ErrorState';
import { Collection } from '../types/collection';

const CollectionPostPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [selectedOutfitIdx, setSelectedOutfitIdx] = useState<number | null>(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUserSubscribed, setIsUserSubscribed] = useState<boolean>(false);
  const [subscriptionChecked, setSubscriptionChecked] = useState<boolean>(false);

  // Get user ID from profile (handle both ID and UserID)
  const userId = profile && ('ID' in profile ? profile.ID : ('UserID' in profile ? profile.UserID : null));

  useEffect(() => {
    let isMounted = true;
    if (!collectionId || !userId) return;
    setLoading(true);
    setError(null);
    getDetailedCollectionById(Number(collectionId), userId)
      .then(async (response) => {
        const data = response.data;
        if (!data) throw new Error('No collection data found');
        // İlk olarak temel mapping
        let mappedCollection: Collection = {
          collectionId: data.ID,
          collectionImage: data.CollectionImage,
          creatorID: data.CreatorID,
          creatorUsername: '',
          creatorProfileImage: '',
          title: data.Title,
          description: data.Description,
          genres: data.Genres || [],
          isPaid: data.IsPaid,
          outfits: Array.isArray(data.Outfits) ? data.Outfits.map((outfit: any) => ({
            id: outfit.ID,
            description: outfit.Description,
            imageURL: outfit.ImageURL,
            outfitItems: Array.isArray(outfit.OutfitItems) ? outfit.OutfitItems.map((item: any) => ({
              id: item.ID,
              outfitId: item.OutfitID,
              imageURL: item.ImageURL,
              storeName: item.StoreName,
              productLink: item.ProductLink,
            })) : [],
          })) : [],
          seasons: data.Seasons || [],
        };
        // Creator bilgilerini çek
        try {
          const creatorResponse = await getCreatorById(data.CreatorID);
          const creatorData = creatorResponse?.data;
          if (creatorData) {
            mappedCollection.creatorUsername = creatorData.Username || '';
            mappedCollection.creatorProfileImage = creatorData.ProfileImage || '';
          }
        } catch (e) {
          // Creator bilgisi alınamazsa boş bırak
        }
        if (isMounted) {
          setCollection(mappedCollection);
          setSelectedOutfitIdx(0);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch collection');
      })
      .finally(() => setLoading(false));
    return () => { isMounted = false; };
  }, [collectionId, userId]);

  useEffect(() => {
    // Paid koleksiyonlarda abone kontrolü
    if (collection && collection.isPaid && userId && userId !== collection.creatorID) {
      isSubscribed(collection.creatorID, userId)
        .then((res) => {
          setIsUserSubscribed(!!res?.data);
        })
        .catch(() => setIsUserSubscribed(false))
        .finally(() => setSubscriptionChecked(true));
    } else {
      setSubscriptionChecked(true);
    }
  }, [collection, userId]);

  if (loading) {
    return <Loading />;
  }
  if (error && error.includes('not subscribed')) {
    return <ErrorState message="You must be subscribed to view this collection." />;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-red-500">{error}</div>;
  }
  if (!collection) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-gray-500"></div>;
  }

  // Only the owner can edit
  const isOwner = profile !== null && profile !== undefined && ((('ID' in profile ? profile.ID : profile.UserID) === collection.creatorID));

  const handleUsernameClick = () => {
    if (collection.creatorUsername) {
      navigate(`/h/creator/${collection.creatorUsername}`);
    }
  };

  // Review bırakma yetkisi kontrolü
  const canLeaveReview = Boolean(collection && (
    !collection.isPaid // Free ise herkes
    || (collection.isPaid && userId && userId !== collection.creatorID && isUserSubscribed)
  ) && subscriptionChecked);

  return (
    <div className="max-w-3xl mx-auto py-10 px-2 sm:px-4 min-h-screen">
      <CollectionHeaderCard
        collectionImage={collection.collectionImage}
        creatorProfileImage={collection.creatorProfileImage || ''}
        creatorUsername={collection.creatorUsername}
        description={collection.description}
        seasons={collection.seasons}
        genres={collection.genres}
        isPaid={collection.isPaid}
        onUsernameClick={handleUsernameClick}
        isOwner={!!isOwner}
        onEditClick={() => navigate(`/h/post/${collection.collectionId}/edit`)}
      />
      <CollectionTitle title={collection.title} />
      
      <OutfitSection
        outfits={collection.outfits}
        selectedOutfitIdx={selectedOutfitIdx}
        setSelectedOutfitIdx={setSelectedOutfitIdx}
        onImageClick={setEnlargedImage}
      />

      <ReviewsSection
        collectionId={collection.collectionId}
        userId={userId}
        canLeaveReview={canLeaveReview}
      />

      {/* Modal for enlarged image */}
      {enlargedImage && (
        <ImageModal imageURL={enlargedImage} onClose={() => setEnlargedImage(null)} />
      )}
    </div>
  );
};

export default CollectionPostPage;
