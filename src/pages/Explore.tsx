import { FC } from 'react';

const topics = [
  { name: 'Streetwear', icon: '🧢' },
  { name: 'Vintage', icon: '👗' },
  { name: 'Luxury', icon: '💎' },
  { name: 'Sustainable', icon: '🌱' },
  { name: 'Accessories', icon: '👜' },
  { name: 'Footwear', icon: '👟' },
  { name: 'Runway', icon: '🕺' },
  { name: 'Casual', icon: '👕' },
];

const Explore: FC = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-12 px-4">
      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-10">
        <input
          type="text"
          placeholder="Search creators"
          className="w-full px-5 py-3 rounded-xl bg-white border border-black/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow"
        />
      </div>
      {/* Topics Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <button
            key={topic.name}
            className={
              `flex items-center gap-3 p-6 rounded-2xl shadow text-black text-lg font-semibold border border-black/10 bg-white transition-transform hover:scale-105 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400`
            }
          >
            <span className="text-2xl">{topic.icon}</span>
            {topic.name}
          </button>
        ))}
      </div>
      {/* Optionally, add a section for popular collections here */}
    </div>
  );
};

export default Explore; 