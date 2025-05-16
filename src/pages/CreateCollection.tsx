import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCollection, getAllGenres } from '../utils/api';
import { useUserProfile } from '../contexts/UserProfileContext';
import { toast } from 'react-toastify';

// Components
import CollectionImageUpload from '../components/collection/CollectionImageUpload';
import CollectionBasicInfo from '../components/collection/CollectionBasicInfo';
import GenreSelector from '../components/collection/GenreSelector';
import SeasonSelector from '../components/collection/SeasonSelector';
import OutfitList from '../components/collection/OutfitList';
import ReviewCollectionInfo from '../components/collection/review/ReviewCollectionInfo';
import ReviewOutfitList from '../components/collection/review/ReviewOutfitList';

// Type guard to get user ID from profile
function getUserId(profile: any): number {
  if (!profile) return 0;
  if ('ID' in profile) return profile.ID;
  if ('UserID' in profile) return profile.UserID;
  return 0;
}

const CreateCollection: React.FC = () => {
  const { profile } = useUserProfile();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Info, 2: Outfits, 3: Review
  const [form, setForm] = useState({
    collectionImage: '',
    creatorID: getUserId(profile),
    description: '',
    genres: [] as number[],
    isPaid: false,
    outfits: [
      {
        description: '',
        imageURL: '',
        outfitItems: [
          { imageURL: '', storeName: '', productLink: '' },
        ],
      },
    ],
    seasons: [] as string[],
    title: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<{ ID: number; Genre: string }[]>([]);
  const [genresLoading, setGenresLoading] = useState(true);
  const [genresError, setGenresError] = useState<string | null>(null);

  const userId = (profile && 'ID' in profile) ? profile.ID : (profile && 'UserID' in profile ? profile.UserID : 0);
  const isCreator = (profile && 'Role' in profile && profile.Role === 1) || (profile && 'UserID' in profile);

  useEffect(() => {
    setGenresLoading(true);
    getAllGenres()
      .then(res => {
        setGenres(res.data || []);
        setGenresLoading(false);
      })
      .catch(err => {
        setGenresError('Failed to load genres');
        setGenresLoading(false);
      });
  }, []);

  if (!isCreator) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600">Only creators can access this page.</p>
      </div>
    );
  }

  const handleGenreChange = (id: number) => {
    setForm(f => ({
      ...f,
      genres: f.genres.includes(id) ? f.genres.filter(g => g !== id) : [...f.genres, id],
    }));
  };

  const handleSeasonChange = (season: string) => {
    setForm(f => ({
      ...f,
      seasons: f.seasons.includes(season) ? f.seasons.filter(s => s !== season) : [...f.seasons, season],
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createCollection(form);
      toast.success('Collection created successfully!');
      navigate(-1); // Go back to creator page
    } catch (err: any) {
      setError(err.message || 'Failed to create collection');
      toast.error(err.message || 'Failed to create collection');
    } finally {
      setLoading(false);
    }
  };

  // Step content
  let stepContent = null;
  if (step === 1) {
    stepContent = (
      <>
        <CollectionImageUpload
          imagePreview={imagePreview}
          onImageChange={(url) => setForm(f => ({ ...f, collectionImage: url }))}
          onPreviewChange={setImagePreview}
        />
        <CollectionBasicInfo
          title={form.title}
          description={form.description}
          onTitleChange={(value) => setForm(f => ({ ...f, title: value }))}
          onDescriptionChange={(value) => setForm(f => ({ ...f, description: value }))}
        />
        <GenreSelector
          genres={genres}
          selectedGenres={form.genres}
          onGenreChange={handleGenreChange}
          loading={genresLoading}
          error={genresError}
        />
        <SeasonSelector
          selectedSeasons={form.seasons}
          onSeasonChange={handleSeasonChange}
        />
        <div className="flex items-center gap-4 mt-2 mb-2">
          <input
            type="checkbox"
            name="isPaid"
            id="isPaid"
            checked={form.isPaid}
            onChange={(e) => setForm(f => ({ ...f, isPaid: e.target.checked }))}
            className="accent-indigo-500 w-6 h-6"
          />
          <label htmlFor="isPaid" className="text-black text-lg font-semibold select-none cursor-pointer">
            Paid Collection?
          </label>
        </div>
      </>
    );
  } else if (step === 2) {
    stepContent = (
      <OutfitList
        outfits={form.outfits}
        onOutfitChange={(outfits) => setForm(f => ({ ...f, outfits }))}
      />
    );
  } else if (step === 3) {
    stepContent = (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Review Collection</h2>
        <ReviewCollectionInfo
          image={form.collectionImage}
          title={form.title}
          description={form.description}
          genres={genres.filter(g => form.genres.includes(g.ID)).map(g => g.Genre)}
          seasons={form.seasons}
          isPaid={form.isPaid}
        />
        <ReviewOutfitList outfits={form.outfits} />
      </div>
    );
  }

  // Navigation buttons
  const navButtons = (
    <div className="flex justify-between mt-8 gap-4">
      {step > 1 ? (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="px-6 py-2 rounded-lg bg-gray-200 text-black font-semibold hover:bg-gray-300"
        >
          Back
        </button>
      ) : <div />}
      {step < 3 ? (
        <button
          type="button"
          onClick={() => setStep(step + 1)}
          className="px-6 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600"
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Collection'}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4 px-1 sm:py-10 sm:px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-black/10 p-2 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6 text-center">Create New Collection</h1>
        {/* Stepper */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s, idx) => (
              <React.Fragment key={s}>
                <div className={`flex flex-col items-center`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold border-2 transition-all duration-200
                    ${step === s ? 'bg-indigo-500 text-white border-indigo-500' : step > s ? 'bg-indigo-200 text-indigo-700 border-indigo-400' : 'bg-gray-200 text-gray-500 border-gray-300'}`}>{s}</div>
                  <span className={`mt-2 text-xs sm:text-sm font-medium ${step === s ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {s === 1 ? 'Collection Info' : s === 2 ? 'Outfits & Items' : 'Review & Create'}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`h-1 w-8 sm:w-16 rounded bg-gradient-to-r ${step > s ? 'from-indigo-400 to-indigo-500' : 'from-gray-200 to-gray-300'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <form onSubmit={e => e.preventDefault()} className="space-y-6 sm:space-y-8">
          {stepContent}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {navButtons}
        </form>
      </div>
    </div>
  );
};

export default CreateCollection; 