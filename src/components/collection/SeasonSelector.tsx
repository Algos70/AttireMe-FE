import React from 'react';

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

interface SeasonSelectorProps {
  selectedSeasons: string[];
  onSeasonChange: (season: string) => void;
}

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  selectedSeasons,
  onSeasonChange,
}) => {
  return (
    <div>
      <label className="block text-black font-semibold mb-2">Seasons</label>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {SEASONS.map((season) => (
          <label
            key={season}
            className={`whitespace-nowrap px-4 py-2 rounded-full border cursor-pointer ${
              selectedSeasons.includes(season)
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'bg-white text-black border-indigo-200'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedSeasons.includes(season)}
              onChange={() => onSeasonChange(season)}
              className="hidden"
            />
            {season}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SeasonSelector; 