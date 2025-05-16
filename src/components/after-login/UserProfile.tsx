import React, { useRef, useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { deleteCookie } from "../../utils/cookies";
import { stringToColor } from "../../utils/colorUtils";

const menuItems = [
  { label: "Logout", action: "logout" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Community Policies", href: "/community-policies" },
];

const UserProfile: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { profile } = useUserProfile();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleMenuClick = (item: typeof menuItems[0]) => {
    setMenuOpen(false);
    if (item.action === "logout") {
      // Clear cookies
      deleteCookie("access_token");
      deleteCookie("id_token");
      deleteCookie("expires_at");
      // Redirect to home
      window.location.href = "/";
    } else if (item.href) {
      window.open(item.href, "_blank");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getUserType = () => {
    if (!user) return "Member";
    const role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return role === "Creator" ? "Creator" : "User";
  };

  const getDisplayName = () => {
    if (!profile) return user?.username || "User";
    if ('Name' in profile) {
      return `${profile.Name} ${profile.Surname}`;
    }
    return profile.Username || user?.username || "User";
  };

  return (
    <div className="px-6 pb-6 pt-6 border-t border-gray-200 flex items-center gap-3 bg-white relative" ref={menuRef}>
      {profile?.ProfileImage ? (
        <img
          src={profile.ProfileImage}
          alt={getDisplayName()}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div 
          className="h-10 w-10 rounded-full flex items-center justify-center font-semibold text-lg text-white"
          style={{ backgroundColor: stringToColor(getDisplayName()) }}
        >
          {getInitials(getDisplayName())}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800 truncate">
          {getDisplayName()}
        </div>
        <div className="text-xs text-gray-500">{getUserType()}</div>
      </div>
      <button
        className="p-1 text-gray-400 hover:text-gray-600 relative"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Open user menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm5 0a2 2 0 114 0 2 2 0 01-4 0zM4 10a2 2 0 114 0 2 2 0 01-4 0z" />
        </svg>
      </button>
      {menuOpen && (
        <div className="absolute right-0 bottom-14 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-indigo-50 hover:text-indigo-700 transition"
              onClick={() => handleMenuClick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile; 