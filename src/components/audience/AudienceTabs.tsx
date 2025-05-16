import React from 'react';

interface AudienceTabsProps {
  activeTab: 'followers' | 'subscribers';
  setActiveTab: (tab: 'followers' | 'subscribers') => void;
}

const AudienceTabs: React.FC<AudienceTabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="flex space-x-2 mb-4">
    <button
      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 ${activeTab === 'followers' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50'}`}
      onClick={() => setActiveTab('followers')}
    >
      Followers
    </button>
    <button
      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 ${activeTab === 'subscribers' ? 'bg-indigo-600 text-white border-indigo-600 shadow' : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50'}`}
      onClick={() => setActiveTab('subscribers')}
    >
      Subscribers
    </button>
  </div>
);

export default AudienceTabs; 