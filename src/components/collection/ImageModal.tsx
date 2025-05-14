import React from 'react';

interface ImageModalProps {
  imageURL: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageURL, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadein"
    onClick={onClose}
  >
    <div
      className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-full max-h-full flex flex-col items-center animate-scalein"
      onClick={e => e.stopPropagation()}
    >
      <button
        className="absolute -top-4 -right-4 bg-white/90 hover:bg-gray-100 text-black rounded-full p-2 shadow transition-colors z-10 border border-gray-200"
        onClick={onClose}
        aria-label="Kapat"
        style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img src={imageURL} alt="Enlarged" className="max-w-[80vw] max-h-[80vh] rounded-xl shadow-lg object-contain" />
    </div>
  </div>
);

export default ImageModal; 