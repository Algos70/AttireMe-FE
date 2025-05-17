import React from 'react';

interface LeaveReviewButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

const LeaveReviewButton: React.FC<LeaveReviewButtonProps> = ({ onClick, disabled, label }) => (
  <button
    className="bg-white text-black border border-indigo-600 hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-700 font-semibold py-2 px-4 rounded shadow transition-colors"
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default LeaveReviewButton; 