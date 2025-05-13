import { FC, useState, useEffect } from 'react';
import { searchCreatorsByUsername } from '../utils/api';
import ProfileCard from '../components/after-login/ProfileCard';

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
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (!search) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const handler = setTimeout(async () => {
      try {
        const res = await searchCreatorsByUsername(search);
        setResults(res.data || []);
      } catch (err: any) {
        setError(err.message || 'Error searching creators');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-12 px-4">
      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-10">
        <input
          type="text"
          placeholder="Search creators"
          className="w-full px-5 py-3 rounded-xl bg-white border border-black/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg shadow"
          value={search}
          onChange={handleSearchChange}
        />
        {loading && <div className="mt-2 text-gray-500">Searching...</div>}
        {error && <div className="mt-2 text-red-500">{error}</div>}
        {results.length > 0 && (
          <ul className="mt-4">
            {results.map((creator, idx) => (
              <li
                key={creator.UserID || idx}
                className="mb-4 last:mb-0 p-0 rounded-md overflow-hidden"
                style={{ height: '64px' }}
              >
                <ProfileCard creator={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Topics Grid */}
      {!search && (
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
      )}
      {/* No results message */}
      {search && !loading && !error && results.length === 0 && (
        <div className="mt-6 text-gray-500 text-lg">No creators found for "{search}".</div>
      )}
      {/* Optionally, add a section for popular collections here */}
    </div>
  );
};

export default Explore; 