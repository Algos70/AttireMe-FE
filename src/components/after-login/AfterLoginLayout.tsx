import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

const AfterLoginLayout: React.FC = () => {
  // Sidebar open/close state can be added for mobile if needed
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={true} onClose={() => {}} />
      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AfterLoginLayout; 