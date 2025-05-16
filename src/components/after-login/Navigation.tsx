import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../../contexts/UserContext";
import { useUserProfile } from "../../contexts/UserProfileContext";

const nav = [
  { name: "Home", to: "/h/home", Icon: HomeIcon },
  { name: "Explore", to: "/h/explore", Icon: MagnifyingGlassIcon },
  { name: "Community", to: "/h/community", Icon: UserGroupIcon },
  { name: "Notifications", to: "/h/notifications", Icon: BellIcon },
  { name: "Settings", to: "/h/settings", Icon: Cog6ToothIcon },
];

interface NavItemProps {
  name: string;
  to: string;
  Icon: any;
  onClose: () => void;
}

const NavItem: FC<NavItemProps> = ({ name, to, Icon, onClose }) => {
  return (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      {name}
    </NavLink>
  );
};

interface NavigationProps {
  onClose: () => void;
}

export const Navigation: FC<NavigationProps> = ({ onClose }) => {
  const { user } = useUser();
  const { profile } = useUserProfile();
  const isCreator = user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Creator";
  const username = isCreator && profile && 'Username' in profile ? profile.Username : null;

  return (
    <nav className="px-6 space-y-1">
      {nav.map(({ name, to, Icon }) => (
        <NavItem key={name} name={name} to={to} Icon={Icon} onClose={onClose} />
      ))}
      {isCreator && username && (
        <>
          <NavItem
            name="My Creator Page"
            to={`/h/creator/${username}`}
            Icon={UserGroupIcon}
            onClose={onClose}
          />
          <div className="flex justify-center">
            <NavLink
              to={`/h/creator/${username}/audience`}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors font-medium ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <UserGroupIcon className="h-5 w-5" />
              Audience
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}; 