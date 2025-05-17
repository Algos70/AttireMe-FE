import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { postReviewAnswer, updateReviewAnswer, deleteReviewAnswer } from '../../../utils/api';

interface ReviewAnswerProps {
  reviewId: number;
  creatorId: number;
  existingAnswer?: string;
  answerId?: number;
  isCreator?: boolean;
  onAnswerSubmitted?: (reviewId: number, answerText: string) => void;
  onDeleteAnswer?: (reviewId: number) => void;
}

const ReviewAnswer: React.FC<ReviewAnswerProps> = ({
  reviewId,
  creatorId,
  existingAnswer,
  answerId,
  isCreator,
  onAnswerSubmitted,
  onDeleteAnswer
}) => {
  const [isAnswering, setIsAnswering] = useState(false);
  const [answerText, setAnswerText] = useState(existingAnswer || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSubmitAnswer = async () => {
    if (!answerText.trim()) {
      toast.error('Please enter an answer');
      return;
    }
    setIsSubmitting(true);
    try {
      if (isEditing && answerId) {
        await updateReviewAnswer({ id: answerId, textContent: answerText });
        toast.success('Reply updated successfully!');
        setIsEditing(false);
      } else {
        await postReviewAnswer({
          answer: answerText,
          creatorID: creatorId,
          reviewID: reviewId
        });
        toast.success('Answer submitted successfully!');
        setIsAnswering(false);
      }
      if (onAnswerSubmitted) {
        onAnswerSubmitted(reviewId, answerText);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!answerId) return;
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!answerId) return;
    setIsSubmitting(true);
    try {
      await deleteReviewAnswer(answerId);
      toast.success('Reply deleted successfully!');
      if (onDeleteAnswer) {
        onDeleteAnswer(reviewId);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete reply');
    } finally {
      setIsSubmitting(false);
      setMenuOpen(false);
      setShowDeleteModal(false);
    }
  };

  // Show edit textarea if editing
  if (isEditing) {
    return (
      <div className="mt-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-md p-4 shadow-sm relative">
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Edit your response..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 placeholder-black text-black"
          rows={3}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitAnswer}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  // Show answer
  if (existingAnswer) {
    return (
      <div className="mt-4 bg-gray-50 border-l-2 border-indigo-200 rounded-lg p-5 shadow-sm flex items-center justify-between relative">
        <div>
          <span className="font-semibold text-indigo-600 mr-2">Creator's reply:</span>
          <span className="text-gray-800 italic">{existingAnswer}</span>
        </div>
        {isCreator && (
          <div className="absolute top-3 right-4 z-10">
            <button
              className="text-indigo-300 hover:text-indigo-600 text-xl px-2 py-0.5 rounded-full focus:outline-none"
              onClick={() => setMenuOpen((v) => !v)}
            >
              &#8230;
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg z-20">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-100"
                  onClick={() => {
                    setIsEditing(true);
                    setMenuOpen(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
              <div className="mb-4 text-center text-lg font-semibold text-gray-800">Are you sure you want to delete this reply?</div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 rounded"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  onClick={confirmDelete}
                  disabled={isSubmitting}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show reply form
  if (isAnswering) {
    return (
      <div className="mt-3">
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Write your response..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 placeholder-black text-black"
          rows={3}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setIsAnswering(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitAnswer}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Reply'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAnswering(true)}
      className="self-end text-xs text-indigo-500 hover:text-indigo-700 mt-2"
      style={{ fontWeight: 500 }}
    >
      Reply
    </button>
  );
};

export default ReviewAnswer; 