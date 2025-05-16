import React from "react";
import { stringToColor } from "../../utils/colorUtils";

interface ProfileAvatarProps {
  username?: string;
  avatar?: string | null;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ username, avatar }) => (
  <div
    className="h-20 w-20 rounded-full flex items-center justify-center overflow-hidden border-2 border-indigo-500"
    style={{ backgroundColor: username ? stringToColor(username) : "#e0e7ff" }}
  >
    {avatar ? (
      <img
        src={avatar}
        alt="Profile"
        className="h-full w-full object-cover"
      />
    ) : (
      <span className="text-black text-3xl font-bold">
        {username?.charAt(0).toUpperCase() || "A"}
      </span>
    )}
  </div>
);

export default ProfileAvatar; 