import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const tabs = [
  { name: "Basics", path: "basic" },
  { name: "Account", path: "account" },
  { name: "Email notifications", path: "email-notifications" },
  { name: "Subscriptions", path: "subscriptions" },
  { name: "Following", path: "following" },
  { name: "More", path: "more" },
];

const SettingsLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center bg-gray-50 px-2 sm:px-0">
      <div className="w-[85vw] sm:w-full max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mt-8 sm:mt-16 md:mt-24">
        <h1 className="text-3xl font-bold text-black mb-6">Settings</h1>
        <div className="flex w-full space-x-4 sm:space-x-6 border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap -mx-2 px-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `pb-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  isActive
                    ? "text-indigo-700 border-b-2 border-indigo-700"
                    : "text-gray-500 hover:text-black"
                }`
              }
              end
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout; 