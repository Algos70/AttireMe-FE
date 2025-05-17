import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';
import { getDetailedCollectionById, getCreatorById, createReview, isSubscribed } from '../utils/api';
import ImageModal from '../components/collection/ImageModal';
import Loading from '../components/creator/Loading';
import CollectionHeaderCard from '../components/collection/post/CollectionHeaderCard';
import CollectionTitle from '../components/collection/post/CollectionTitle';
import OutfitSelector from '../components/collection/post/OutfitSelector';
import OutfitDetailCard from '../components/collection/post/OutfitDetailCard';
import OutfitItemsList from '../components/collection/post/OutfitItemsList';
import ErrorState from '../components/collection/post/ErrorState';
import { toast } from 'react-toastify';

// Types
interface OutfitItem {
  id?: number;
  outfitId?: number;
  imageURL: string;
  productLink: string;
  storeName: string;
}

interface Outfit {
  id?: number;
  description: string;
  imageURL: string;
  outfitItems: OutfitItem[];
}

interface Collection {
  collectionId: number;
  collectionImage: string;
  creatorID: number;
  creatorUsername: string;
  creatorProfileImage?: string;
  title: string;
  description: string;
  genres: string[];
  isPaid: boolean;
  outfits: Outfit[];
  seasons: string[];
}

// Modal Component (modern style)
const SimpleModal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode }> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-white text-black rounded-3xl shadow-2xl p-0 max-w-full max-h-full flex flex-col items-center animate-scalein"
        style={{ minWidth: 360, minHeight: 120 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute -top-5 -right-5 bg-white hover:bg-indigo-50 text-black rounded-full p-3 shadow-lg transition-colors z-10 border-0 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
          style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

// Star Rating Component
const StarRating: React.FC<{ value: number; onChange: (val: number) => void; disabled?: boolean }> = ({ value, onChange, disabled }) => (
  <div className="flex items-center gap-1 mb-3">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        className={`focus:outline-none ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && onChange(star)}
        disabled={disabled}
        aria-label={`Set rating to ${star}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= value ? '#6366f1' : '#d1d5db'}
          className={`w-7 h-7 transition-colors ${star <= value ? 'text-indigo-600' : 'text-gray-300'}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      </button>
    ))}
  </div>
);

const CollectionPostPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [selectedOutfitIdx, setSelectedOutfitIdx] = useState<number | null>(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
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
  const isOwner = profile && ((('ID' in profile ? profile.ID : profile.UserID) === collection.creatorID));

  const handleUsernameClick = () => {
    if (collection.creatorUsername) {
      navigate(`/h/creator/${collection.creatorUsername}`);
    }
  };

  // Review bırakma yetkisi kontrolü
  const canLeaveReview = collection && (
    !collection.isPaid // Free ise herkes
    || (collection.isPaid && userId && userId !== collection.creatorID && isUserSubscribed)
  ) && subscriptionChecked;

  // Review gönderme fonksiyonu
  const handleSubmitReview = async () => {
    if (!userId) {
      toast.error('You must be logged in to leave a review.');
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Review comment cannot be empty.');
      return;
    }
    setIsSubmittingReview(true);
    try {
      await createReview({
        collectionID: collection.collectionId,
        rating: reviewRating,
        reviewerID: userId,
        textContent: reviewText,
      });
      toast.success('Review submitted successfully!');
      setIsReviewModalOpen(false);
      setReviewText('');
      setReviewRating(5);
      // TODO: Refresh review list
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

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
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-black">Outfits</h2>
        <OutfitSelector
          outfits={collection.outfits}
          selectedOutfitIdx={selectedOutfitIdx}
          setSelectedOutfitIdx={setSelectedOutfitIdx}
        />
        {selectedOutfitIdx !== null && Array.isArray(collection.outfits) && collection.outfits[selectedOutfitIdx] && (
          <OutfitDetailCard
            imageURL={collection.outfits[selectedOutfitIdx].imageURL}
            description={collection.outfits[selectedOutfitIdx].description}
            onImageClick={setEnlargedImage}
          />
        )}
      </div>
      {selectedOutfitIdx !== null && Array.isArray(collection.outfits) && collection.outfits[selectedOutfitIdx] && (
        <OutfitItemsList
          items={collection.outfits[selectedOutfitIdx].outfitItems}
          onImageClick={setEnlargedImage}
        />
      )}
      {/* Reviews Section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {/* Leave Review Button (modern style) */}
        {canLeaveReview && (
          <div className="flex justify-end mb-4">
            <button
              className="bg-white text-black border border-indigo-600 hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-700 font-semibold py-2 px-4 rounded shadow transition-colors"
              onClick={() => setIsReviewModalOpen(true)}
            >
              Leave a Review
            </button>
          </div>
        )}
        {/* Review Modal */}
        {isReviewModalOpen && (
          <SimpleModal open={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)}>
            <div className="p-8 bg-white rounded-3xl shadow-lg w-96 mx-auto flex flex-col gap-4">
              <h2 className="text-2xl font-extrabold mb-2 text-black tracking-tight">Leave a Review</h2>
              <div className="flex flex-col gap-2">
                <label className="block font-semibold text-black text-base">Rating</label>
                <StarRating value={reviewRating} onChange={setReviewRating} disabled={isSubmittingReview} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block font-semibold text-black text-base">Comment</label>
                <textarea
                  className="w-full border border-gray-200 rounded-xl mb-1 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white resize-none min-h-[120px]"
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="Write your review..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button
                  className="px-5 py-2 bg-gray-100 text-black rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  onClick={() => setIsReviewModalOpen(false)}
                  disabled={isSubmittingReview}
                >Cancel</button>
                <button
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={handleSubmitReview}
                  disabled={isSubmittingReview}
                >
                  {isSubmittingReview ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </SimpleModal>
        )}
        {/* Reviews List Placeholder */}
        <div className="text-gray-500">No reviews yet.</div>
      </div>
      {/* Modal for enlarged image */}
      {enlargedImage && (
        <ImageModal imageURL={enlargedImage} onClose={() => setEnlargedImage(null)} />
      )}
    </div>
  );
};

export default CollectionPostPage;
