import React from 'react';
import SimpleModal from '../../common/SimpleModal';
import StarRating from './StarRating';

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
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

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onClose,
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
  <SimpleModal open={open} onClose={onClose}>
    <div className="p-8 bg-white rounded-3xl shadow-lg w-96 mx-auto flex flex-col gap-4">
      <h2 className="text-2xl font-extrabold mb-2 text-black tracking-tight">
        {isEdit ? 'Edit Your Review' : 'Leave a Review'}
      </h2>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label className="block font-semibold text-black text-base">Rating</label>
            <StarRating value={reviewRating} onChange={setReviewRating} disabled={isSubmitting} />
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
          <div className="flex justify-between gap-3 mt-2">
            <button
              className="px-5 py-2 bg-gray-100 text-black rounded-xl hover:bg-gray-200 transition-colors font-medium"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
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
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
  </SimpleModal>
);

export default ReviewModal; 