import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LatestBanner } from "../components/after-login/LatestBanner";
import { CardGrid } from "../components/after-login/CardGrid";
import { CommunityMessages } from "../components/after-login/CommunityMessages";

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
    <main className="flex-1 h-screen overflow-auto bg-gray-50 p-4 md:p-6 flex flex-col items-center">
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
      {selected === "community" && <CommunityMessages />}
      {selected === "notifications" && (
        <div className="text-xl text-gray-700">Notifications content goes here</div>
      )}
      {selected === "settings" && (
        <div className="text-xl text-gray-700">Settings content goes here</div>
      )}
    </main>
  );
}

export default Home;
