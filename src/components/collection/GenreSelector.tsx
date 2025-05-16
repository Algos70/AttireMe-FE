import React from 'react';

interface Genre {
  ID: number;
  Genre: string;
}

interface GenreSelectorProps {
  genres: Genre[];
  selectedGenres: number[];
  onGenreChange: (id: number) => void;
  loading: boolean;
  error: string | null;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({
  genres,
  selectedGenres,
  onGenreChange,
  loading,
  error,
}) => {
  if (loading) {
    return <div className="text-gray-500">Loading genres...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <label className="block text-black font-semibold mb-2">Genres</label>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {genres.map((genre) => (
          <label
            key={genre.ID}
            className={`whitespace-nowrap px-4 py-2 rounded-full border cursor-pointer ${
              selectedGenres.includes(genre.ID)
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'bg-white text-black border-indigo-200'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.ID)}
              onChange={() => onGenreChange(genre.ID)}
              className="hidden"
            />
            {genre.Genre}
          </label>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector; 