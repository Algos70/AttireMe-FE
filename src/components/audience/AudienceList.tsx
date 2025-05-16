import React from 'react';

interface AudienceListProps {
  activeTab: 'followers' | 'subscribers';
  followers: any[];
  subscribers: any[];
}

const AudienceList: React.FC<AudienceListProps> = ({ activeTab, followers, subscribers }) => (
  <div className="bg-white rounded-xl shadow border border-gray-100 p-2 min-h-[120px]">
    {activeTab === 'followers' ? (
      followers.length > 0 ? (
        followers.map((f, i) => (
          <div key={f.ID || f.id || i} className="flex items-center gap-3 py-3 px-3 text-sm text-gray-800 border-b last:border-b-0 hover:bg-indigo-50 transition cursor-pointer rounded">
            {f.ProfileImage ? (
              <img src={f.ProfileImage} alt={f.Username} className="h-8 w-8 rounded-full object-cover border border-gray-200" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-base font-bold text-indigo-700">
                {f.Username ? f.Username.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <span className="font-medium">{f.Username || f.username || f.Email || f.email}</span>
          </div>
        ))
      ) : (
        <div className="text-xs text-gray-400 text-center py-8">No followers yet.</div>
      )
    ) : (
      subscribers.length > 0 ? (
        subscribers.map((s, i) => (
          <div key={s.ID || s.id || i} className="flex items-center gap-3 py-3 px-3 text-sm text-gray-800 border-b last:border-b-0 hover:bg-indigo-50 transition cursor-pointer rounded">
            {s.ProfileImage ? (
              <img src={s.ProfileImage} alt={s.Username} className="h-8 w-8 rounded-full object-cover border border-gray-200" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-base font-bold text-indigo-700">
                {s.Username ? s.Username.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <span className="font-medium">{s.Username || s.username || s.Email || s.email}</span>
          </div>
        ))
      ) : (
        <div className="text-xs text-gray-400 text-center py-8">No subscribers yet.</div>
      )
    )}
  </div>
);

export default AudienceList; 