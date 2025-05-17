import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { postReviewAnswer, updateReviewAnswer, deleteReviewAnswer } from '../../../utils/api';
import ReviewAnswerMenu from './ReviewAnswerMenu';
import ReviewAnswerModal from './ReviewAnswerModal';
import ReviewAnswerEdit from './ReviewAnswerEdit';
import ReviewAnswerDisplay from './ReviewAnswerDisplay';

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

  const handleDelete = () => {
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
      <ReviewAnswerEdit
        value={answerText}
        onChange={setAnswerText}
        onCancel={() => setIsEditing(false)}
        onSubmit={handleSubmitAnswer}
        isSubmitting={isSubmitting}
        submitLabel="Save"
        cancelLabel="Cancel"
      />
    );
  }

  // Show answer
  if (existingAnswer) {
    return (
      <ReviewAnswerDisplay
        menu={isCreator && (
          <ReviewAnswerMenu
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
            disabled={isSubmitting}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        )}
      >
        <span className="font-semibold text-indigo-600 mr-2">Creator's reply:</span>
        <span className="text-gray-800 italic">{existingAnswer}</span>
        <ReviewAnswerModal
          open={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          disabled={isSubmitting}
        />
      </ReviewAnswerDisplay>
    );
  }

  // Show reply form
  if (isAnswering) {
    return (
      <ReviewAnswerEdit
        value={answerText}
        onChange={setAnswerText}
        onCancel={() => setIsAnswering(false)}
        onSubmit={handleSubmitAnswer}
        isSubmitting={isSubmitting}
        submitLabel="Submit Reply"
        cancelLabel="Cancel"
      />
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