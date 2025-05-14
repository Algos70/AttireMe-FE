import React from 'react';

const CreatorActions: React.FC<{ subscriptionFee: number }> = ({ subscriptionFee }) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 w-full max-w-xs sm:max-w-none justify-center items-center">
    <button className="w-full sm:w-auto px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition-colors">
      Subscribe {typeof subscriptionFee === 'number' ? (subscriptionFee > 0 ? `$${subscriptionFee}/mo` : 'Free') : ''}
    </button>
    <button className="w-full sm:w-auto px-6 py-2 rounded-full bg-white text-black font-semibold border border-black/10 shadow hover:bg-gray-100 transition-colors">Follow</button>
  </div>
);

export default CreatorActions; 