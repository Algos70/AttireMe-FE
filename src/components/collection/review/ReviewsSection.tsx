import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { createReview, getOwnReview, updateReview, deleteReview, getReviewsByCollectionId, getUserById } from '../../../utils/api';
import StarRating from './StarRating';
import ReviewAnswer from './ReviewAnswer';
import { useUserProfile } from '../../../contexts/UserProfileContext';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

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
          <ReviewForm
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
        </div>
      )}
      <div className="mt-8">
        {isLoadingReviews ? (
          <div className="text-center text-gray-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-500">No reviews yet.</div>
        ) : (
          <ReviewList
            reviews={reviews}
            userInfoMap={userInfoMap}
            isCreator={isCreator}
            creatorId={creatorId}
            handleAddAnswerToReview={handleAddAnswerToReview}
            handleDeleteAnswer={handleDeleteAnswer}
            MOCK_PROFILE_IMAGE={MOCK_PROFILE_IMAGE}
            reviewsEndRef={reviewsEndRef}
            isLoadingReviews={isLoadingReviews}
            hasMoreReviews={hasMoreReviews}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
