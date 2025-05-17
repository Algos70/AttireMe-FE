import React from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  reviewText: string;
  setReviewText: (text: string) => void;
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  isSubmitting: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onDelete?: () => void;
  isEdit: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  reviewText,
  setReviewText,
  reviewRating,
  setReviewRating,
  isSubmitting,
  isLoading,
  onSubmit,
  onDelete,
  isEdit,
}) => (
  <div className="bg-white rounded-2xl shadow p-6 border border-indigo-50 max-w-2xl mx-auto">
    <h3 className="text-lg font-bold mb-2 text-black">
      {isEdit ? 'Edit Your Review' : 'Leave a Review'}
    </h3>
    {isLoading ? (
      <div className="text-center text-gray-500">Loading...</div>
    ) : (
      <>
        <div className="flex flex-col gap-2 mb-3">
          <label className="block font-semibold text-black text-base">Rating</label>
          <StarRating value={reviewRating} onChange={setReviewRating} disabled={isSubmitting} />
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
          {isEdit && onDelete && (
            <button
              className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 font-semibold transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={onDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </button>
          )}
          <button
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ml-auto"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (isEdit ? 'Updating...' : 'Submitting...')
              : (isEdit ? 'Update' : 'Submit')}
          </button>
        </div>
      </>
    )}
  </div>
);

export default ReviewForm; 