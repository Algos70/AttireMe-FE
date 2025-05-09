import React, { useState, useEffect } from "react";
import { uploadToImgBB } from "../utils/imgbb";
import { useUser } from "../contexts/UserContext";

const countries = [
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  // Add more as needed
];

const SettingsPage: React.FC = () => {
  const { user } = useUser();
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [country, setCountry] = useState(countries[0].code);
  const [avatar, setAvatar] = useState<string | null>(user?.picture || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.name || "");
      setEmail(user.email || "");
      setAvatar(user.picture || null);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let avatarUrl = avatar;
      
      // Upload avatar to ImgBB if a new file was selected
      if (avatarFile) {
        avatarUrl = await uploadToImgBB(avatarFile);
        console.log('Avatar uploaded successfully:', avatarUrl);
      }

      // Here you would typically save all the settings to your backend
      const settings = {
        displayName,
        email,
        country,
        avatar: avatarUrl
      };

      console.log('Saving settings:', settings);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error('Error saving settings:', error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-black mb-4">Profile information</h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <span className="inline-block h-14 w-14 rounded-full bg-indigo-200 flex items-center justify-center text-2xl font-bold text-indigo-700 overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="avatar" className="h-full w-full object-cover rounded-full" />
              ) : (
                displayName.charAt(0)
              )}
            </span>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <label htmlFor="avatar-upload">
            <span className="ml-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-medium cursor-pointer hover:bg-indigo-700 transition">
              Upload photo
            </span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Display name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={isSaving}
        className={`mt-2 px-6 py-2 bg-indigo-700 text-white rounded-md font-semibold hover:bg-indigo-800 transition ${
          isSaving ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default SettingsPage; 