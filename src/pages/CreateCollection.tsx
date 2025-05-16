import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCollection, getAllGenres } from '../utils/api';
import { useUserProfile } from '../contexts/UserProfileContext';
import { uploadToImgBB } from '../utils/imgbb';
import { toast } from 'react-toastify';

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      try {
        const url = await uploadToImgBB(file);
        setForm(f => ({ ...f, collectionImage: url }));
      } catch (err) {
        setError('Failed to upload collection image.');
      }
    }
  };

  const handleOutfitImageChange = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadToImgBB(file);
        setForm(f => {
          const outfits = [...f.outfits];
          outfits[idx].imageURL = url;
          return { ...f, outfits };
        });
      } catch (err) {
        setError('Failed to upload outfit image.');
      }
    }
  };

  const handleOutfitItemImageChange = async (outfitIdx: number, itemIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadToImgBB(file);
        setForm(f => {
          const outfits = [...f.outfits];
          outfits[outfitIdx].outfitItems[itemIdx].imageURL = url;
          return { ...f, outfits };
        });
      } catch (err) {
        setError('Failed to upload item image.');
      }
    }
  };

  const handleAddOutfit = () => {
    setForm(f => ({
      ...f,
      outfits: [
        ...f.outfits,
        { description: '', imageURL: '', outfitItems: [{ imageURL: '', storeName: '', productLink: '' }] },
      ],
    }));
  };

  const handleRemoveOutfit = (idx: number) => {
    setForm(f => ({ ...f, outfits: f.outfits.filter((_, i) => i !== idx) }));
  };

  const handleAddOutfitItem = (outfitIdx: number) => {
    setForm(f => {
      const outfits = [...f.outfits];
      outfits[outfitIdx].outfitItems.push({ imageURL: '', storeName: '', productLink: '' });
      return { ...f, outfits };
    });
  };

  const handleRemoveOutfitItem = (outfitIdx: number, itemIdx: number) => {
    setForm(f => {
      const outfits = [...f.outfits];
      outfits[outfitIdx].outfitItems = outfits[outfitIdx].outfitItems.filter((_, i) => i !== itemIdx);
      return { ...f, outfits };
    });
  };

  const handleOutfitItemChange = (outfitIdx: number, itemIdx: number, field: 'imageURL' | 'storeName' | 'productLink', value: string) => {
    setForm(f => {
      const outfits = [...f.outfits];
      outfits[outfitIdx].outfitItems[itemIdx][field] = value;
      return { ...f, outfits };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && 'checked' in e.target) {
      setForm(f => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4 px-1 sm:py-10 sm:px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-black/10 p-2 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6 text-center">Create New Collection</h1>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="flex flex-col items-center mb-6">
            <label className="block text-black font-semibold mb-2 text-lg">Collection Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="block mb-2" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="rounded-xl border border-indigo-300 shadow-lg w-full max-w-xs sm:max-w-lg max-h-60 sm:max-h-[400px] object-contain" />
            )}
          </div>
          <div>
            <label className="block text-black font-semibold mb-2">Collection Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full border border-indigo-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-black text-base sm:text-lg" />
          </div>
          <div>
            <label className="block text-black font-semibold mb-2">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full border border-indigo-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-black text-base sm:text-lg" />
          </div>
          <div>
            <label className="block text-black font-semibold mb-2">Genres</label>
            {genresLoading ? (
              <div className="text-gray-500">Loading genres...</div>
            ) : genresError ? (
              <div className="text-red-500">{genresError}</div>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {genres.map(g => (
                  <label key={g.ID} className={`whitespace-nowrap px-4 py-2 rounded-full border cursor-pointer ${form.genres.includes(g.ID) ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-black border-indigo-200'}`}>
                    <input type="checkbox" checked={form.genres.includes(g.ID)} onChange={() => handleGenreChange(g.ID)} className="hidden" />
                    {g.Genre}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-black font-semibold mb-2">Seasons</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {SEASONS.map(s => (
                <label key={s} className={`whitespace-nowrap px-4 py-2 rounded-full border cursor-pointer ${form.seasons.includes(s) ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-black border-indigo-200'}`}>
                  <input type="checkbox" checked={form.seasons.includes(s)} onChange={() => handleSeasonChange(s)} className="hidden" />
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2 mb-2">
            <input type="checkbox" name="isPaid" id="isPaid" checked={form.isPaid} onChange={handleChange} className="accent-indigo-500 w-6 h-6" />
            <label htmlFor="isPaid" className="text-black text-lg font-semibold select-none cursor-pointer">Paid Collection?</label>
          </div>
          <div>
            <label className="block text-black font-semibold mb-4 text-lg sm:text-xl">Outfits</label>
            <div className="space-y-6 sm:space-y-8">
              {form.outfits.map((outfit, idx) => (
                <div key={idx} className="border border-indigo-300 rounded-2xl p-3 sm:p-6 bg-indigo-50/30 shadow flex flex-col gap-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-black text-base sm:text-lg">Outfit #{idx + 1}</span>
                    {form.outfits.length > 1 && (
                      <button type="button" onClick={() => handleRemoveOutfit(idx)} className="text-red-500 hover:underline text-xs sm:text-sm font-medium">Remove</button>
                    )}
                  </div>
                  <div>
                    <label className="block text-black mb-1 font-medium">Description</label>
                    <input value={outfit.description} onChange={e => setForm(f => {
                      const outfits = [...f.outfits];
                      outfits[idx].description = e.target.value;
                      return { ...f, outfits };
                    })} className="w-full border border-indigo-200 rounded px-2 py-2 sm:px-3 bg-white text-black text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-black mb-1 font-medium">Outfit Image</label>
                    <input type="file" accept="image/*" onChange={e => handleOutfitImageChange(idx, e)} />
                    {outfit.imageURL && <img src={outfit.imageURL} alt="Outfit Preview" className="mt-2 rounded-xl border border-indigo-200 max-h-40 sm:max-h-56 object-contain mx-auto w-full sm:w-auto" />}
                  </div>
                  <div>
                    <label className="block text-black mb-2 font-medium">Outfit Items</label>
                    <div className="space-y-3">
                      {outfit.outfitItems.map((item, itemIdx) => (
                        <div key={itemIdx} className="bg-white/80 p-2 sm:p-4 rounded-lg border border-indigo-100 flex flex-col gap-2 mb-2">
                          <label className="text-black font-medium mb-1">Store Name</label>
                          <input type="text" placeholder="Store Name" value={item.storeName} onChange={e => handleOutfitItemChange(idx, itemIdx, 'storeName', e.target.value)} className="border border-indigo-200 rounded px-2 py-1 bg-white text-black text-sm sm:text-base" />
                          <label className="text-black font-medium mb-1 mt-2">Product Link</label>
                          <input type="text" placeholder="Product Link" value={item.productLink} onChange={e => handleOutfitItemChange(idx, itemIdx, 'productLink', e.target.value)} className="border border-indigo-200 rounded px-2 py-1 bg-white text-black text-sm sm:text-base" />
                          <label className="text-black font-medium mb-1 mt-2">Item Image</label>
                          <input type="file" accept="image/*" onChange={e => handleOutfitItemImageChange(idx, itemIdx, e)} />
                          {item.imageURL && <img src={item.imageURL} alt="Item Preview" className="rounded border border-indigo-200 max-h-16 sm:max-h-20 max-w-full sm:max-w-[120px] object-contain mt-2" />}
                          {outfit.outfitItems.length > 1 && (
                            <button type="button" onClick={() => handleRemoveOutfitItem(idx, itemIdx)} className="text-red-500 hover:underline text-xs font-medium mt-2 self-end">Remove</button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => handleAddOutfitItem(idx)} className="mt-2 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold text-sm sm:text-base">Add Item</button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={handleAddOutfit} className="w-full mt-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-indigo-600 transition font-bold text-base sm:text-lg">Add Outfit</button>
            </div>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl bg-indigo-500 text-white hover:bg-black transition disabled:opacity-60 disabled:cursor-not-allowed mt-4">
            {loading ? 'Creating...' : 'Create Collection'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCollection; 