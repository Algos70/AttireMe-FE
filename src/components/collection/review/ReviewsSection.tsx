import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { createReview, getOwnReview, updateReview, deleteReview, getReviewsByCollectionId, getUserById } from '../../../utils/api';
import StarRating from './StarRating';
import ReviewAnswer from './ReviewAnswer';
import { useUserProfile } from '../../../contexts/UserProfileContext';

interface ReviewsSectionProps {
  collectionId: number;
  userId: number | null;
  canLeaveReview: boolean;
  creatorId: number;
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

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ collectionId, userId, canLeaveReview, creatorId }) => {
  const { profile } = useUserProfile();
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

  // Inline review form: fetch own review on mount (if canLeaveReview)
  useEffect(() => {
    if (!canLeaveReview || !userId) return;
    setIsLoadingReview(true);
    if (userId !== null) {
      getOwnReview(collectionId, userId)
        .then(res => {
          if (res && res.data) {
            setExistingReview(res.data);
            setReviewText(res.data.TextContent || '');
            setReviewRating(res.data.Rating || 5);
          } else {
            setExistingReview(null);
            setReviewText('');
            setReviewRating(5);
          }
        })
        .catch(() => {
          setExistingReview(null);
          setReviewText('');
          setReviewRating(5);
        })
        .finally(() => setIsLoadingReview(false));
    }
  }, [canLeaveReview, collectionId, userId]);

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
      setReviewText('');
      setReviewRating(5);
      setExistingReview(null);
      fetchReviews(1);
      setReviewsPage(1);
      // Refetch own review to update the form fields
      if (userId !== null) {
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
      }
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
      setReviewText('');
      setReviewRating(5);
      setExistingReview(null);
      fetchReviews(1);
      setReviewsPage(1);
      // Refetch own review to update the form fields
      if (userId !== null) {
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
      }
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

  // Check if current user is the creator
  const isCreator = profile && ((('ID' in profile ? profile.ID : profile.UserID) === creatorId));

  // Handler to update the answer of a review in local state
  const handleAddAnswerToReview = (reviewId: number, answerText: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.ID === reviewId
          ? { ...review, Answer: { ...(review.Answer || {}), TextContent: answerText } }
          : review
      )
    );
  };

  // Handler to remove the answer from a review in local state
  const handleDeleteAnswer = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.ID === reviewId
          ? { ...review, Answer: undefined }
          : review
      )
    );
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-xl mb-4 text-black">Reviews</h2>
      {canLeaveReview && (
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow p-6 border border-indigo-50 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold mb-2 text-black">
              {existingReview ? 'Edit Your Review' : 'Leave a Review'}
            </h3>
            {isLoadingReview ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              <>
                <div className="flex flex-col gap-2 mb-3">
                  <label className="block font-semibold text-black text-base">Rating</label>
                  <StarRating value={reviewRating} onChange={setReviewRating} disabled={isSubmittingReview} />
                </div>
                <div className="flex flex-col gap-2 mb-3">
                  <label className="block font-semibold text-black text-base">Comment</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-xl mb-1 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white resize-none min-h-[80px]"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    placeholder="Write your review..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-between gap-3 mt-2">
                  {existingReview && (
                    <button
                      className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 font-semibold transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={handleDeleteReview}
                      disabled={isSubmittingReview}
                    >
                      {isSubmittingReview ? 'Deleting...' : 'Delete'}
                    </button>
                  )}
                  <button
                    className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ml-auto"
                    onClick={handleSubmitOrUpdateReview}
                    disabled={isSubmittingReview}
                  >
                    {isSubmittingReview
                      ? (existingReview ? 'Updating...' : 'Submitting...')
                      : (existingReview ? 'Update' : 'Submit')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
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
                  <div className="flex-1 flex flex-col min-h-[80px]">
                    <span className="font-semibold text-black text-base mb-1">{user.username}</span>
                    <div className="flex items-center gap-2 justify-start mb-1">
                      <StarRating value={review.Rating} readOnly size={20} />
                      <span className="text-gray-700 font-medium text-xs">{review.Rating} / 5</span>
                    </div>
                    <div className="text-black text-base mt-2 mb-2">{review.TextContent}</div>
                    {/* Show reply form only to creator if there is no answer */}
                    {isCreator && !review.Answer && (
                      <ReviewAnswer
                        reviewId={review.ID}
                        creatorId={creatorId}
                        existingAnswer={undefined}
                        isCreator={!!isCreator}
                        onAnswerSubmitted={handleAddAnswerToReview}
                        onDeleteAnswer={handleDeleteAnswer}
                      />
                    )}
                    {/* Show creator's response to everyone if it exists */}
                    {!!review.Answer && (
                      <ReviewAnswer
                        reviewId={review.ID}
                        creatorId={creatorId}
                        existingAnswer={review.Answer?.TextContent}
                        answerId={review.Answer?.ID}
                        isCreator={!!isCreator}
                        onAnswerSubmitted={handleAddAnswerToReview}
                        onDeleteAnswer={handleDeleteAnswer}
                      />
                    )}
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
