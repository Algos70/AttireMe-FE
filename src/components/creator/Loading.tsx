import React from 'react';

const Loading: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[200px] py-12">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-6"></div>
    <div className="text-lg text-indigo-700 font-semibold">Loading...</div>
  </div>
);

export default Loading; 