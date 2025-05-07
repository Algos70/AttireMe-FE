import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../components/after-login/Sidebar";
import { LatestBanner } from "../components/after-login/LatestBanner";
import { CardGrid } from "../components/after-login/CardGrid";

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

function Home() {
  const { section } = useParams<{ section?: string }>();
  const selected = section ?? "home";

  useEffect(() => {
    const title = selected === "home" ? "Latest" : capitalize(selected);
    document.title = `${title} • AttireMe`;
  }, [selected]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-50 flex flex-col">
        <main className="flex-1 overflow-auto p-6">
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
    </div>
  );
}

export default Home;
