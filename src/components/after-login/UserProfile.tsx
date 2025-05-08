import React from "react";

const UserProfile: React.FC = () => (
  <div className="px-6 pb-6 pt-6 border-t border-gray-200 flex items-center gap-3 bg-white">
    <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold text-lg">
      A
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-medium text-gray-800 truncate">asgasdg</div>
      <div className="text-xs text-gray-500">Member</div>
    </div>
    <button className="p-1 text-gray-400 hover:text-gray-600">
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
);

export default UserProfile; 