import React, { FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import attireMeLogo from "../../assets/images/logo.svg";
import UserProfile from "./UserProfile";
import { Navigation } from "./Navigation";
import { SubscriptionsSection } from "./Subscriptions";
import { useUser } from "../../contexts/UserContext";
import { getFollowersOfCreator, getCreatorSubscribers } from "../../utils/api";
import { useState } from "react";
import { useUserProfile } from "../../contexts/UserProfileContext";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const { user } = useUser();
  const { profile } = useUserProfile();
  const isCreator = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Creator";
  const creatorId = isCreator && profile && "UserID" in profile ? profile.UserID : null;

  // Followers/Subscribers state
  const [activeTab, setActiveTab] = useState<'followers' | 'subscribers'>('followers');
  const [followers, setFollowers] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingSubscribers, setLoadingSubscribers] = useState(false);

  React.useEffect(() => {
    if (isCreator && creatorId) {
      setLoadingFollowers(true);
      getFollowersOfCreator(creatorId)
        .then(res => setFollowers(Array.isArray(res.data) ? res.data : []))
        .catch(() => setFollowers([]))
        .finally(() => setLoadingFollowers(false));
      setLoadingSubscribers(true);
      getCreatorSubscribers(creatorId)
        .then(res => setSubscribers(Array.isArray(res.data) ? res.data : []))
        .catch(() => setSubscribers([]))
        .finally(() => setLoadingSubscribers(false));
    }
  }, [isCreator, creatorId]);

  return (
    <aside
      className={`
        z-30
        flex flex-col justify-between
        bg-white border-r border-gray-200
        transition-transform duration-300 ease-in-out
        w-64
        fixed inset-y-0 left-0
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky md:top-0 md:h-screen md:left-0 md:inset-y-0
      `}
    >
      {/* TOP */}
      <div>
        {/* mobile close button */}
        <div className="md:hidden flex justify-end p-4">
          <button 
            onClick={onClose}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* logo container */}
        <div className="px-6 py-6 flex justify-center">
          <img
            src={attireMeLogo}
            alt="AttireMe Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Navigation */}
        <Navigation onClose={onClose} />

        {/* Subscriptions */}
        <SubscriptionsSection />
      </div>

      {/* BOTTOM PROFILE */}
      <UserProfile />
    </aside>
  );
};
