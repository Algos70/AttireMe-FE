import { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const nav = [
  { name: "Home", to: "/home", Icon: HomeIcon },
  { name: "Explore", to: "/home/explore", Icon: MagnifyingGlassIcon },
  { name: "Community", to: "/home/community", Icon: UserGroupIcon },
  { name: "Notifications", to: "/home/notifications", Icon: BellIcon },
  { name: "Settings", to: "/home/settings", Icon: Cog6ToothIcon },
];

const memberships = ["Cze and Peku", "Czepeku Sci-Fi", "Czepeku Scenes"];

export const Sidebar: FC = () => (
  <aside
    className="
      w-64 sticky top-0 left-0 h-screen overflow-y-auto 
      bg-white text-gray-700 border-r border-gray-200 
      flex flex-col justify-between
    "
  >
    <div>
      <div className="p-6 text-3xl font-bold text-indigo-600">P</div>

      <nav className="space-y-1">
        {nav.map(({ name, to, Icon }) => (
          <NavLink
            key={name}
            to={to}
            end={to === "/home"}            // ensures `/home` only matches exact
            className={({ isActive }) =>
              `
                group flex items-center px-6 py-3 rounded-lg transition
                ${
                  isActive
                    ? "bg-indigo-200 text-indigo-800"
                    : "text-gray-700 hover:bg-indigo-50"
                }
              `
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

      <div className="mt-8 px-6 text-xs font-semibold text-gray-500 uppercase">
        Memberships
      </div>
      <nav className="mt-2 space-y-1">
        {memberships.map((m) => (
          <a
            key={m}
            href="#"
            className="
              block px-6 py-2 rounded-lg 
              text-gray-700 hover:bg-indigo-50 transition
            "
          >
            {m}
          </a>
        ))}
      </nav>
    </div>

    <div className="p-6 border-t border-gray-200 flex items-center">
      <div
        className="
          h-10 w-10 bg-indigo-100 text-indigo-600 
          rounded-full mr-3 flex items-center justify-center 
          font-semibold
        "
      >
        A
      </div>
      <div>
        <div className="text-sm font-medium text-gray-800">asgasdg</div>
        <div className="text-xs text-gray-500">Member</div>
      </div>
      <button className="ml-auto p-1 text-gray-400 hover:text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm5 0a2 2 0 114 0 2 2 0 01-4 0zM4 10a2 2 0 114 0 2 2 0 01-4 0z" />
        </svg>
      </button>
    </div>
  </aside>
);
