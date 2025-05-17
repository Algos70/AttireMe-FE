import React, { ReactNode } from 'react';

interface ReviewAnswerDisplayProps {
  children: ReactNode;
  menu?: ReactNode;
}

const ReviewAnswerDisplay: React.FC<ReviewAnswerDisplayProps> = ({ children, menu }) => (
  <div className="mt-4 bg-gray-50 border-l-2 border-indigo-200 rounded-lg p-5 shadow-sm flex items-center justify-between relative">
    <div>{children}</div>
    {menu && <div className="absolute top-3 right-4 z-10">{menu}</div>}
  </div>
);

export default ReviewAnswerDisplay; 