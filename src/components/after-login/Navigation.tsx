import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

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

export const NavItem: FC<NavItemProps> = ({ name, to, Icon, onClose }) => (
  <NavLink
    to={to}
    end={to === "/home"}
    onClick={() => window.innerWidth < 768 && onClose()}
    className={({ isActive }) =>
      `group flex items-center px-3 py-2 rounded-lg transition
       ${isActive ? "bg-indigo-200 text-indigo-800" : "text-gray-700 hover:bg-indigo-50"}`
    }
  >
    {({ isActive }) => (
      <>
        <Icon
          className={`
            h-5 w-5 mr-3 transition
            ${isActive ? "text-indigo-700" : "text-indigo-600 group-hover:text-indigo-700"}
          `}
        />
        <span className={isActive ? "font-semibold" : ""}>{name}</span>
      </>
    )}
  </NavLink>
);

interface NavigationProps {
  onClose: () => void;
}

export const Navigation: FC<NavigationProps> = ({ onClose }) => (
  <nav className="px-6 space-y-1">
    {nav.map(({ name, to, Icon }) => (
      <NavItem key={name} name={name} to={to} Icon={Icon} onClose={onClose} />
    ))}
  </nav>
); 