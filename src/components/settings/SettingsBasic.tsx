import React, { useState, useEffect } from "react";
import { uploadToImgBB } from "../../utils/imgbb";
import { useUser } from "../../contexts/UserContext";
import { useUserProfile } from "../../contexts/UserProfileContext";
import ProfileAvatar from "./ProfileAvatar";
import BannerSection from "./BannerSection";
import UserFields from "./UserFields";
import CreatorFields from "./CreatorFields";
import { updateUser, updateCreator } from "../../utils/api";

const SettingsPage: React.FC = () => {
  const { user } = useUser();
  const { profile, setUserProfile, setCreatorProfile } = useUserProfile();
  const isCreator = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Creator";

  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // New state for additional fields
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [bio, setBio] = useState("");
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  useEffect(() => {
    if (profile) {
      if ('Name' in profile) {
        // User profile
        setName(profile.Name || "");
        setSurname(profile.Surname || "");
      } else {
        // Creator profile
        setBio(profile.Bio || "");
        setBannerImage(profile.BannerImage || null);
      }
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0]);
      setBannerImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let avatarUrl = avatar;
      let bannerUrl = bannerImage;

      if (avatarFile) {
        avatarUrl = await uploadToImgBB(avatarFile);
      }
      if (bannerFile) {
        bannerUrl = await uploadToImgBB(bannerFile);
      }

      if (isCreator && profile && 'UserID' in profile) {
        await updateCreator({
          bannerImage: bannerUrl,
          bio,
          profileImage: avatarUrl,
          userID: profile.UserID,
        });
        setCreatorProfile({
          ...profile,
          BannerImage: bannerUrl || "",
          Bio: bio || "",
          ProfileImage: avatarUrl || "",
        });
      } else if (!isCreator && profile && 'ID' in profile) {
        await updateUser({
          id: profile.ID,
          name,
          surname,
          profileImage: avatarUrl,
        });
        setUserProfile({
          ...profile,
          Name: name || "",
          Surname: surname || "",
          ProfileImage: avatarUrl || "",
        });
      }

      alert("Settings saved successfully!");
    } catch (error) {
      console.error('Error saving settings:', error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  console.log(profile);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Profile Section at the Top */}
      <div className="flex items-center space-x-6 mb-8">
        <ProfileAvatar username={profile?.Username} avatar={avatar} />
        
        <div>
          <div className="text-xl font-bold text-black">{profile?.Username || "Your Name"}</div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="mt-2 inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            Change Photo
          </label>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Banner Section for Creator */}
        {isCreator && (
          <BannerSection bannerImage={bannerImage} onBannerChange={handleBannerChange} />
        )}

        {/* User fields */}
        {!isCreator && (
          <UserFields name={name} setName={setName} surname={surname} setSurname={setSurname} />
        )}

        {/* Creator fields */}
        {isCreator && (
          <CreatorFields bio={bio} setBio={setBio} />
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage; 