import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { createReview, getOwnReview, updateReview, deleteReview, getReviewsByCollectionId, getUserById } from '../../../utils/api';
import LeaveReviewButton from './LeaveReviewButton';
import ReviewModal from './ReviewModal';
import StarRating from './StarRating';

interface ReviewsSectionProps {
  collectionId: number;
  userId: number | null;
  canLeaveReview: boolean;
}

const PAGE_SIZE = 10;
const MOCK_PROFILE_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

// Hook to fetch and cache user info by ID
function useReviewerInfo(reviews: any[]) {
  const [userInfoMap, setUserInfoMap] = useState<Record<number, { username: string; profileImage: string }>>({});

  useEffect(() => {
    const uniqueIds = Array.from(new Set(reviews.map(r => r.ReviewerID)));
    const missingIds = uniqueIds.filter(id => !(id in userInfoMap));
    if (missingIds.length === 0) return;
    Promise.all(missingIds.map(id =>
      getUserById(id.toString())
        .then(res => ({ id, username: res.data?.Username || `User #${id}`, profileImage: res.data?.ProfileImage || MOCK_PROFILE_IMAGE }))
        .catch(() => ({ id, username: `User #${id}`, profileImage: MOCK_PROFILE_IMAGE }))
    )).then(results => {
      setUserInfoMap(prev => {
        const updated = { ...prev };
        results.forEach(({ id, username, profileImage }) => {
          updated[id] = { username, profileImage };
        });
        return updated;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  return userInfoMap;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ collectionId, userId, canLeaveReview }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [existingReview, setExistingReview] = useState<any>(null);
  const [isLoadingReview, setIsLoadingReview] = useState(false);

  // Reviews list state
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(true);

  const reviewsEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch reviews
  const fetchReviews = async (page = 1) => {
    setIsLoadingReviews(true);
    try {
      const res = await getReviewsByCollectionId(collectionId, PAGE_SIZE, page);
      const pageData = res && res.data ? res.data : {};
      const reviewArr = Array.isArray(pageData.Data) ? pageData.Data : [];
      if (page === 1) {
        setReviews(reviewArr);
      } else {
        setReviews(prev => [...prev, ...reviewArr]);
      }
      setHasMoreReviews(!!pageData.HasNext);
      setReviewsPage(pageData.Page || page);
    } catch {
      setReviews([]);
      setHasMoreReviews(false);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
    setReviewsPage(1);
  }, [collectionId]);

  const userInfoMap = useReviewerInfo(reviews);

  const openReviewModal = async () => {
    if (!userId) {
      toast.error('You must be logged in to leave a review.');
      return;
    }
    setIsLoadingReview(true);
    setIsReviewModalOpen(true);
    try {
      const res = await getOwnReview(collectionId, userId);
      if (res && res.data) {
        setExistingReview(res.data);
        setReviewText(res.data.TextContent || '');
        setReviewRating(res.data.Rating || 5);
      } else {
        setExistingReview(null);
        setReviewText('');
        setReviewRating(5);
      }
    } catch (err) {
      setExistingReview(null);
      setReviewText('');
      setReviewRating(5);
    } finally {
      setIsLoadingReview(false);
    }
  };

  const handleSubmitOrUpdateReview = async () => {
    if (!userId) {
      toast.error('You must be logged in to leave a review.');
      return;
    }
    setIsSubmittingReview(true);
    try {
      if (existingReview) {
        await updateReview({
          collectionID: collectionId,
          rating: reviewRating,
          reviewerID: userId,
          textContent: reviewText,
        });
        toast.success('Review updated successfully!');
      } else {
        await createReview({
          collectionID: collectionId,
          rating: reviewRating,
          reviewerID: userId,
          textContent: reviewText,
        });
        toast.success('Review submitted successfully!');
      }
      setIsReviewModalOpen(false);
      setReviewText('');
      setReviewRating(5);
      setExistingReview(null);
      fetchReviews(1);
      setReviewsPage(1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!existingReview) return;
    setIsSubmittingReview(true);
    try {
      await deleteReview(existingReview.ID);
      toast.success('Review deleted successfully!');
      setIsReviewModalOpen(false);
      setReviewText('');
      setReviewRating(5);
      setExistingReview(null);
      fetchReviews(1);
      setReviewsPage(1);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Load more reviews (pagination)
  const handleLoadMore = () => {
    if (hasMoreReviews && !isLoadingReviews) {
      const nextPage = reviewsPage + 1;
      fetchReviews(nextPage);
      setReviewsPage(nextPage);
    }
  };

  // Infinite scroll: fetch next page when near bottom
  useEffect(() => {
    if (!hasMoreReviews || isLoadingReviews) return;
    const handleScroll = () => {
      if (!reviewsEndRef.current) return;
      const rect = reviewsEndRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        handleLoadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreReviews, isLoadingReviews, reviewsPage]);

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-xl mb-4 text-black">Reviews</h2>
      {canLeaveReview && (
        <div className="flex justify-end mb-4">
          <LeaveReviewButton
            onClick={openReviewModal}
            disabled={false}
            label={existingReview ? 'Edit Your Review' : 'Leave a Review'}
          />
        </div>
      )}
      <ReviewModal
        open={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviewText={reviewText}
        setReviewText={setReviewText}
        reviewRating={reviewRating}
        setReviewRating={setReviewRating}
        isSubmitting={isSubmittingReview}
        isLoading={isLoadingReview}
        onSubmit={handleSubmitOrUpdateReview}
        onDelete={existingReview ? handleDeleteReview : undefined}
        isEdit={!!existingReview}
      />
      <div className="mt-8">
        {isLoadingReviews ? (
          <div className="text-center text-gray-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-500">No reviews yet.</div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => {
              const user = userInfoMap[review.ReviewerID] || { username: `User #${review.ReviewerID}`, profileImage: MOCK_PROFILE_IMAGE };
              return (
                <div key={review.ID} className="bg-white rounded-2xl shadow flex items-start gap-4 p-5 border border-indigo-50">
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200 mt-1"
                  />
                  <div className="flex-1 flex flex-col">
                    <span className="font-semibold text-black text-base mb-1">{user.username}</span>
                    <div className="flex items-center gap-2 justify-start mb-1">
                      <StarRating value={review.Rating} readOnly size={20} />
                      <span className="text-gray-700 font-medium text-xs">{review.Rating} / 5</span>
                    </div>
                    <div className="text-black text-base mt-2">{review.TextContent}</div>
                  </div>
                </div>
              );
            })}
            <div ref={reviewsEndRef} />
            {isLoadingReviews && (
              <div className="flex justify-center mt-4 text-gray-500">Loading reviews...</div>
            )}
            {!hasMoreReviews && reviews.length > 0 && (
              <div className="flex justify-center mt-4 text-gray-400 text-sm">No more reviews.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection; 