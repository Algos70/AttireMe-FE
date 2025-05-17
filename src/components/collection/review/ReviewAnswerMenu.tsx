import React from 'react';

interface ReviewAnswerMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const ReviewAnswerMenu: React.FC<ReviewAnswerMenuProps> = ({ onEdit, onDelete, disabled, menuOpen, setMenuOpen }) => (
  <div className="relative">
    <button
      className="text-indigo-300 hover:text-indigo-600 text-xl px-2 py-0.5 rounded-full focus:outline-none"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      &#8230;
    </button>
    {menuOpen && (
      <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg z-20">
        <button
          className="block w-full text-left px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-100"
          onClick={() => {
            onEdit();
            setMenuOpen(false);
          }}
        >
          Edit
        </button>
        <button
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          onClick={onDelete}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    )}
  </div>
);

export default ReviewAnswerMenu; 