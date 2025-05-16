import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';
import { getDetailedCollectionById, getAllGenres, updateCollection, updateOutfit, updateOutfitItem, deleteCollection, deleteOutfit, deleteOutfitItem } from '../utils/api';
import CollectionBasicInfo from '../components/collection/CollectionBasicInfo';
import CollectionImageUpload from '../components/collection/CollectionImageUpload';
import GenreSelector from '../components/collection/GenreSelector';
import SeasonSelector from '../components/collection/SeasonSelector';
import OutfitList from '../components/collection/OutfitList';
import ReviewCollectionInfo from '../components/collection/review/ReviewCollectionInfo';
import ReviewOutfitList from '../components/collection/review/ReviewOutfitList';
import Loading from '../components/creator/Loading';
import { toast } from 'react-toastify';

const CollectionEditPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const [step, setStep] = useState(1); // 1: Info, 2: Outfits, 3: Review
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<any[]>([]);
  const [genresLoading, setGenresLoading] = useState(false);
  const [genresError, setGenresError] = useState<string | null>(null);
  const [image, setImage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [isPaid, setIsPaid] = useState(false);
  const [outfits, setOutfits] = useState<any[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [owner, setOwner] = useState(false);
  const [originalCollection, setOriginalCollection] = useState<any>(null);
  const [originalOutfits, setOriginalOutfits] = useState<any[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [removedOutfitIds, setRemovedOutfitIds] = useState<number[]>([]);
  const [removedOutfitItemIds, setRemovedOutfitItemIds] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!collectionId || !profile) return;
      setLoading(true);
      setError(null);
      try {
        const userId = 'ID' in profile ? profile.ID : profile.UserID;
        const response = await getDetailedCollectionById(Number(collectionId), userId);
        const data = response.data;
        if (!data) throw new Error('No collection data found');
        if (data.CreatorID !== userId) {
          setOwner(false);
          setError('You are not authorized to edit this collection.');
          setLoading(false);
          return;
        }
        setOwner(true);
        setImage(data.CollectionImage || '');
        setImagePreview(data.CollectionImage || '');
        setTitle(data.Title || '');
        setDescription(data.Description || '');
        setSelectedGenres(Array.isArray(data.Genres) ? data.Genres.map((g: any) => (typeof g === 'object' ? g.ID : g)) : []);
        setIsPaid(!!data.IsPaid);
        const mappedOutfits = Array.isArray(data.Outfits) ? data.Outfits.map((outfit: any) => ({
          id: outfit.ID,
          description: outfit.Description,
          imageURL: outfit.ImageURL,
          outfitItems: Array.isArray(outfit.OutfitItems) ? outfit.OutfitItems.map((item: any) => ({
            id: item.ID,
            outfitId: item.OutfitID,
            imageURL: item.ImageURL,
            storeName: item.StoreName,
            productLink: item.ProductLink,
          })) : [],
        })) : [];
        setOutfits(mappedOutfits);
        setOriginalOutfits(JSON.parse(JSON.stringify(mappedOutfits)));
        setSeasons(Array.isArray(data.Seasons) ? data.Seasons : []);
        setOriginalCollection({
          collectionID: data.ID,
          collectionImage: data.CollectionImage,
          description: data.Description,
          genres: Array.isArray(data.Genres) ? data.Genres.map((g: any) => (typeof g === 'object' ? g.ID : g)) : [],
          isPaid: !!data.IsPaid,
          seasons: Array.isArray(data.Seasons) ? data.Seasons : [],
          title: data.Title,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch collection');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [collectionId, profile]);

  useEffect(() => {
    setGenresLoading(true);
    setGenresError(null);
    getAllGenres()
      .then((res) => setGenres(Array.isArray(res?.data) ? res.data : []))
      .catch((err) => setGenresError(err.message || 'Failed to load genres'))
      .finally(() => setGenresLoading(false));
  }, []);

  const handleGenreChange = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((gid) => gid !== id) : [...prev, id]
    );
  };

  const handleSeasonChange = (season: string) => {
    setSeasons((prev) =>
      prev.includes(season) ? prev.filter((s) => s !== season) : [...prev, season]
    );
  };

  const handleRemoveOutfit = (id: number) => {
    setRemovedOutfitIds((prev) => [...prev, id]);
  };

  const handleRemoveOutfitItem = (id: number) => {
    setRemovedOutfitItemIds((prev) => [...prev, id]);
  };

  const handleSubmit = async () => {
    if (!collectionId) return;
    setLoading(true);
    setError(null);
    try {
      const updatePromises = [];
      // Delete removed outfits
      for (const id of removedOutfitIds) {
        updatePromises.push(
          deleteOutfit(id).catch(err => toast.error(`Failed to delete outfit: ${err.message || err}`))
        );
      }
      // Delete removed outfit items
      for (const id of removedOutfitItemIds) {
        updatePromises.push(
          deleteOutfitItem(id).catch(err => toast.error(`Failed to delete outfit item: ${err.message || err}`))
        );
      }
      // Compare collection info
      const currentCollection = {
        collectionID: Number(collectionId),
        collectionImage: image,
        description,
        genres: selectedGenres
           .filter(g => g !== null && g !== undefined && (typeof g === 'number' || (typeof g === 'string' && g !== '')))
           .map(Number)
           .filter(n => !isNaN(n)),
        isPaid,
        seasons,
        title,
      };
      const collectionChanged =
        !originalCollection ||
        (Object.keys(currentCollection) as (keyof typeof currentCollection)[]).some(
          (key) => JSON.stringify(currentCollection[key]) !== JSON.stringify(originalCollection[key])
        );
      if (collectionChanged) {
        updatePromises.push(updateCollection(currentCollection));
      }
      // Compare outfits
      for (let i = 0; i < outfits.length; i++) {
        const o = outfits[i];
        const origO = originalOutfits[i];
        if (!origO || o.id !== origO.id || o.description !== origO.description || o.imageURL !== origO.imageURL) {
          updatePromises.push(updateOutfit({ id: o.id, description: o.description, imageURL: o.imageURL }));
        }
        // Compare outfit items
        for (let j = 0; j < o.outfitItems.length; j++) {
          const item = o.outfitItems[j];
          const origItem = origO && origO.outfitItems ? origO.outfitItems[j] : null;
          if (
            !origItem ||
            item.id !== origItem.id ||
            item.imageURL !== origItem.imageURL ||
            item.productLink !== origItem.productLink ||
            item.storeName !== origItem.storeName
          ) {
            updatePromises.push(updateOutfitItem({
              id: item.id,
              imageURL: item.imageURL,
              productLink: item.productLink,
              storeName: item.storeName,
            }));
          }
        }
      }
      await Promise.all(updatePromises);
      toast.success('Collection updated successfully!');
      navigate(`/h/post/${collectionId}`);
    } catch (err: any) {
      setError(err.message || 'Failed to update collection');
      toast.error(err.message || 'Failed to update collection');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!collectionId) return;
    setLoading(true);
    setError(null);
    try {
      await deleteCollection(Number(collectionId));
      toast.success('Collection deleted successfully!');
      if (profile && ('Username' in profile)) {
        navigate(`/h/creator/${profile.Username}`);
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete collection');
      toast.error(err.message || 'Failed to delete collection');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!owner) return <div className="text-center text-red-500 py-8">You are not authorized to edit this collection.</div>;

  // Step content
  let stepContent = null;
  if (step === 1) {
    stepContent = (
      <>
        <CollectionImageUpload
          imagePreview={imagePreview}
          onImageChange={setImage}
          onPreviewChange={setImagePreview}
        />
        <CollectionBasicInfo
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />
        <GenreSelector
          genres={genres}
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreChange}
          loading={genresLoading}
          error={genresError}
        />
        <SeasonSelector
          selectedSeasons={seasons}
          onSeasonChange={handleSeasonChange}
        />
        <div className="flex items-center gap-4 mt-2 mb-2">
          <input
            type="checkbox"
            name="isPaid"
            id="isPaid"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
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
        outfits={outfits}
        onOutfitChange={setOutfits}
        editMode={true}
        onRemoveOutfit={handleRemoveOutfit}
        onRemoveOutfitItem={handleRemoveOutfitItem}
      />
    );
  } else if (step === 3) {
    stepContent = (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Review & Save Changes</h2>
        <ReviewCollectionInfo
          image={image}
          title={title}
          description={description}
          genres={genres.filter((g: any) => selectedGenres.includes(g.ID)).map((g: any) => g.Genre)}
          seasons={seasons}
          isPaid={isPaid}
        />
        <ReviewOutfitList outfits={outfits} />
        <div className="flex gap-4 justify-between mt-8">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-black transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-black transition"
          >
            Delete Collection
          </button>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadein">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center animate-scalein">
              <h2 className="text-xl font-bold text-black mb-4 text-center">Are you sure you want to delete this collection?</h2>
              <p className="text-gray-700 mb-6 text-center">This action cannot be undone.</p>
              <div className="flex gap-4 w-full justify-center">
                <button
                  className="px-6 py-2 bg-gray-200 text-black rounded-lg font-semibold hover:bg-gray-300"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-black transition"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
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
      ) : null}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4 px-1 sm:py-10 sm:px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-black/10 p-2 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6 text-center">Edit Collection</h1>
        {/* Stepper */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s, idx) => (
              <React.Fragment key={s}>
                <div className={`flex flex-col items-center`}>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold border-2 transition-all duration-200
                    ${step === s ? 'bg-indigo-500 text-white border-indigo-500' : step > s ? 'bg-indigo-200 text-indigo-700 border-indigo-400' : 'bg-gray-200 text-gray-500 border-gray-300'}`}>{s}</div>
                  <span className={`mt-2 text-xs sm:text-sm font-medium ${step === s ? 'text-indigo-600' : 'text-gray-500'}`}>
                    {s === 1 ? 'Collection Info' : s === 2 ? 'Outfits & Items' : 'Review & Save'}
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

export default CollectionEditPage; 