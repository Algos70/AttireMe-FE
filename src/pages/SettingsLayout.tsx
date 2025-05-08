import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const tabs = [
  { name: "Basics", path: "basic" },
  { name: "Account", path: "account" },
  { name: "Email notifications", path: "email-notifications" },
  { name: "Memberships", path: "memberships" },
  { name: "Billing history", path: "billing-history" },
  { name: "More", path: "more" },
];

const SettingsLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mt-24">
        <h1 className="text-3xl font-bold text-black mb-6">Settings</h1>
        <div className="flex space-x-6 border-b border-gray-200 mb-8">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `pb-2 text-sm font-medium transition-colors duration-150 ${
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