import React from 'react';

interface ReviewAnswerEditProps {
  value: string;
  onChange: (v: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

const ReviewAnswerEdit: React.FC<ReviewAnswerEditProps> = ({
  value,
  onChange,
  onCancel,
  onSubmit,
  isSubmitting,
  submitLabel = 'Submit Reply',
  cancelLabel = 'Cancel',
}) => (
  <div className="mt-3">
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Write your response..."
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 placeholder-black text-black"
      rows={3}
    />
    <div className="flex justify-end gap-2 mt-2">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        disabled={isSubmitting}
      >
        {cancelLabel}
      </button>
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>
    </div>
  </div>
);

export default ReviewAnswerEdit; 