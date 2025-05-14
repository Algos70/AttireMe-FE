import React, { useState } from "react";

const mockMessages = [
  {
    creator: "Cze and Peku",
    avatar: "🧑‍🎨",
    messages: [
      { from: "user", text: "Hi! I love your work!", time: "2024-06-01 10:00" },
      { from: "creator", text: "Thank you so much!", time: "2024-06-01 10:05" },
    ],
  },
  {
    creator: "Czepeku Sci-Fi",
    avatar: "👽",
    messages: [
      { from: "user", text: "Any new sci-fi maps coming?", time: "2024-06-02 14:20" },
      { from: "creator", text: "Yes, next week!", time: "2024-06-02 14:22" },
    ],
  },
  {
    creator: "Czepeku Scenes",
    avatar: "🌄",
    messages: [
      { from: "user", text: "Loved the last scene!", time: "2024-06-03 09:00" },
      { from: "creator", text: "Glad you enjoyed it!", time: "2024-06-03 09:05" },
    ],
  },
];

export const CommunityMessages = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const showList = selectedIdx === null || !isMobile;
  const showChat = selectedIdx !== null;
  const selectedThread = selectedIdx !== null ? mockMessages[selectedIdx] : null;

  return (
    <div className="flex md:flex-row flex-col w-full h-[80vh] max-w-5xl mx-auto bg-white rounded-lg shadow overflow-hidden">
      {/* Left pane: chat list */}
      {showList && (
        <div className="md:w-1/3 w-full border-r md:border-r bg-gray-50 overflow-y-auto md:block flex-1">
          <h2 className="text-xl md:text-xl text-lg font-semibold p-4 pb-2 text-black">Chats</h2>
          {mockMessages.map((thread, idx) => {
            const lastMsg = thread.messages[thread.messages.length - 1];
            return (
              <div
                key={thread.creator}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition border-l-4 ${
                  selectedIdx === idx
                    ? "bg-indigo-50 border-indigo-600"
                    : "hover:bg-gray-100 border-transparent"
                }`}
                onClick={() => setSelectedIdx(idx)}
              >
                <div className="text-2xl">{thread.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate text-black">{thread.creator}</div>
                  <div className="text-xs text-gray-600 truncate">{lastMsg.text}</div>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap ml-2">{lastMsg.time.slice(0, 16).replace('T', ' ')}</div>
              </div>
            );
          })}
        </div>
      )}
      {/* Right pane: chat window */}
      {showChat && selectedThread && (
        <div className="flex-1 flex flex-col h-full w-full md:w-auto">
          <div className="flex items-center gap-3 border-b p-4 bg-indigo-50">
            {/* Back button for mobile */}
            <button
              className="md:hidden mr-2 text-indigo-700 text-2xl focus:outline-none"
              onClick={() => setSelectedIdx(null)}
            >
              ←
            </button>
            <span className="text-2xl">{selectedThread.avatar}</span>
            <span className="font-semibold text-lg text-indigo-700">{selectedThread.creator}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 bg-white">
            {selectedThread.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow-sm md:text-base ${
                    msg.from === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  <div>{msg.text}</div>
                  <div className={`text-xs mt-1 text-right ${msg.from === "user" ? "text-indigo-200" : "text-gray-400"}`}>
                    {msg.time.slice(0, 16).replace('T', ' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 