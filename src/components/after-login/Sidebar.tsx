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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const nav = [
  { name: "Home", to: "/home", Icon: HomeIcon },
  { name: "Explore", to: "/home/explore", Icon: MagnifyingGlassIcon },
  { name: "Community", to: "/home/community", Icon: UserGroupIcon },
  { name: "Notifications", to: "/home/notifications", Icon: BellIcon },
  { name: "Settings", to: "/home/settings", Icon: Cog6ToothIcon },
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
    {/* top section */}
    <div>
      {/* mobile close button */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={onClose}>
          <XMarkIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* logo */}
      <div className="px-6 text-3xl font-bold text-indigo-600">P</div>

      {/* navigation */}
      <nav className="mt-4 space-y-1 px-6">
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
                <span className={isActive ? "font-semibold" : ""}>{name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* memberships */}
      <div className="mt-8 px-6 text-xs font-semibold text-gray-500 uppercase">
        Memberships
      </div>
      <nav className="mt-2 space-y-1 px-6">
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

    {/* bottom profile */}
    <div className="px-6 pb-6 border-t border-gray-200 flex items-center">
      <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">
        A
      </div>
      <div className="ml-3">
        <div className="text-sm font-medium text-gray-800">asgasdg</div>
        <div className="text-xs text-gray-500">Member</div>
      </div>
      <button className="ml-auto p-1 text-gray-400 hover:text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm5 0a2 2 0 114 0 2 2 0 01-4 0zM4 10a2 2 0 114 0 2 2 0 01-4 0z" />
        </svg>
      </button>
    </div>
  </aside>
);
