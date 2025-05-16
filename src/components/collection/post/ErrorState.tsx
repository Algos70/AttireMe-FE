import React from 'react';

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
    <svg className="w-20 h-20 text-red-400 mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <h2 className="text-2xl font-bold mb-2">Erişim Yok</h2>
    <p className="text-gray-600 mb-4">{message}</p>
    {/* <a href="/" className="text-indigo-600 hover:underline">Ana sayfaya dön</a> */}
  </div>
);

export default ErrorState; 