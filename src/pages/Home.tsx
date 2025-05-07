import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../components/after-login/Sidebar";
import { LatestBanner } from "../components/after-login/LatestBanner";
import { CardGrid } from "../components/after-login/CardGrid";
import { Bars3Icon } from "@heroicons/react/24/outline";

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

function Home() {
  const { section } = useParams<{ section?: string }>();
  const selected = section ?? "home";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const title = selected === "home" ? "Latest" : capitalize(selected);
    document.title = `${title} • AttireMe`;
  }, [selected]);

  return (
    <div className="flex">
      {/* fixed drawer/sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main content area */}
      <main className="ml-0 md:ml-64 flex-1 h-screen overflow-auto bg-gray-50 p-4 md:p-6">
        {/* mobile top bar */}
        <div className="md:hidden flex items-center justify-between mb-4 px-2">
          <button onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {selected === "home" ? "Latest" : capitalize(selected)}
          </h1>
        </div>

        {/* page content */}
        {selected === "home" && (
          <>
            <LatestBanner />
            <CardGrid />
          </>
        )}
        {selected === "explore" && (
          <div className="text-xl text-gray-700">Explore content goes here</div>
        )}
        {selected === "community" && (
          <div className="text-xl text-gray-700">Community content goes here</div>
        )}
        {selected === "notifications" && (
          <div className="text-xl text-gray-700">Notifications content goes here</div>
        )}
        {selected === "settings" && (
          <div className="text-xl text-gray-700">Settings content goes here</div>
        )}
      </main>
    </div>
  );
}

export default Home;
