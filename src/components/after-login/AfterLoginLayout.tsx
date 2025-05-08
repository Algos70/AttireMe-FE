import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

const AfterLoginLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-30 md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
        onClick={() => setSidebarOpen(true)}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar open={true} onClose={() => {}} />
      </div>
      {/* Sidebar for mobile (only when open) */}
      {sidebarOpen && (
        <div className="md:hidden">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AfterLoginLayout; 