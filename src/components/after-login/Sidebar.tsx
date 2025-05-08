import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  BellIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import attireMeLogo from "../../assets/images/logo.svg";
import UserProfile from "./UserProfile";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const nav = [
  { name: "Home", to: "/h/home", Icon: HomeIcon },
  { name: "Explore", to: "/h/explore", Icon: MagnifyingGlassIcon },
  { name: "Community", to: "/h/community", Icon: UserGroupIcon },
  { name: "Notifications", to: "/h/notifications", Icon: BellIcon },
  { name: "Settings", to: "/h/settings", Icon: Cog6ToothIcon },
];

const memberships = ["Cze and Peku", "Czepeku Sci-Fi", "Czepeku Scenes"];

export const Sidebar: FC<SidebarProps> = ({ open, onClose }) => (
  <aside
    className={`
      fixed inset-y-0 left-0 w-64 z-20
      flex flex-col justify-between
      bg-white border-r border-gray-200
      transform transition-transform duration-200 ease-in-out
      ${open ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}
  >
    {/* TOP */}
    <div>
      {/* mobile close button */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={onClose}>
          <XMarkIcon className="h-6 w-6 text-gray-700" />
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

      {/* nav links */}
      <nav className="px-6 space-y-1">
        {nav.map(({ name, to, Icon }) => (
          <NavLink
            key={name}
            to={to}
            end={to === "/home"}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 rounded-lg transition
               ${
                 isActive
                   ? "bg-indigo-200 text-indigo-800"
                   : "text-gray-700 hover:bg-indigo-50"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`
                    h-5 w-5 mr-3 transition
                    ${isActive
                      ? "text-indigo-700"
                      : "text-indigo-600 group-hover:text-indigo-700"}
                  `}
                />
                <span className={isActive ? "font-semibold" : ""}>
                  {name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* memberships */}
      <div className="mt-8 px-6 text-xs font-semibold text-gray-500 uppercase">
        Memberships
      </div>
      <nav className="mt-2 px-6 space-y-1">
        {memberships.map((m) => (
          <a
            key={m}
            href="#"
            className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50"
          >
            {m}
          </a>
        ))}
      </nav>
    </div>

    {/* BOTTOM PROFILE */}
    <UserProfile />
  </aside>
);
