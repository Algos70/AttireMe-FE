import React from 'react';

interface ReviewAnswerModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  disabled?: boolean;
}

const ReviewAnswerModal: React.FC<ReviewAnswerModalProps> = ({ open, onCancel, onConfirm, disabled }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <div className="mb-4 text-center text-lg font-semibold text-gray-800">Are you sure you want to delete this reply?</div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 rounded"
            onClick={onCancel}
            disabled={disabled}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            onClick={onConfirm}
            disabled={disabled}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnswerModal; 