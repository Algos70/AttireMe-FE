import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SimpleModal from '../../common/SimpleModal';
import StarRating from './StarRating';
import { createReview } from '../../../utils/api';

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
        collectionID: collectionId,
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
    <div className="mt-12 border-t pt-8">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
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
              >
                Cancel
              </button>
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
      <div className="text-gray-500">No reviews yet.</div>
    </div>
  );
};

export default ReviewsSection; 