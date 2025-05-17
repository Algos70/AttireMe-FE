import React from 'react';

interface SimpleModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-white text-black rounded-3xl shadow-2xl p-0 max-w-full max-h-full flex flex-col items-center animate-scalein"
        style={{ minWidth: 360, minHeight: 120 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute -top-5 -right-5 bg-white hover:bg-indigo-50 text-black rounded-full p-3 shadow-lg transition-colors z-10 border-0 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
          style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default SimpleModal; 