import React from 'react';
import ReviewAnswer from './ReviewAnswer';
import StarRating from './StarRating';

const ReviewList = ({
  reviews,
  userInfoMap,
  isCreator,
  creatorId,
  handleAddAnswerToReview,
  handleDeleteAnswer,
  MOCK_PROFILE_IMAGE,
  reviewsEndRef,
  isLoadingReviews,
  hasMoreReviews
}: any) => (
  <div className="space-y-6">
    {reviews.map((review: any) => {
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
);

export default ReviewList; 