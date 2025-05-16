import React from 'react';

type FilterType = 'all' | 'free';

interface CreatorCollectionFilterProps {
  value: FilterType;
  onChange: (value: FilterType) => void;
}

const CreatorCollectionFilter: React.FC<CreatorCollectionFilterProps> = ({ value, onChange }) => (
  <div className="flex gap-4 mt-6 mb-2">
    <button
      className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${value === 'all' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-indigo-500 border-indigo-200 hover:bg-indigo-50'}`}
      onClick={() => onChange('all')}
      disabled={value === 'all'}
    >
      All Collections
    </button>
    <button
      className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${value === 'free' ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-indigo-500 border-indigo-200 hover:bg-indigo-50'}`}
      onClick={() => onChange('free')}
      disabled={value === 'free'}
    >
      Free Collections
    </button>
  </div>
);

export default CreatorCollectionFilter; 