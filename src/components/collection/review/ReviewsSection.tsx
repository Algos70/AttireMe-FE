import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createReview, getOwnReview, updateReview, deleteReview } from '../../../utils/api';
import LeaveReviewButton from './LeaveReviewButton';
import ReviewModal from './ReviewModal';

interface ReviewsSectionProps {
  collectionId: number;
  userId: number | null;
  canLeaveReview: boolean;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ collectionId, userId, canLeaveReview }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [existingReview, setExistingReview] = useState<any>(null);
  const [isLoadingReview, setIsLoadingReview] = useState(false);

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
    if (!reviewText.trim()) {
      toast.error('Review comment cannot be empty.');
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
      // TODO: Refresh review list
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
      // TODO: Refresh review list
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
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
      <div className="text-gray-500">No reviews yet.</div>
    </div>
  );
};

export default ReviewsSection; 