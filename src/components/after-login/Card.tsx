import { FC } from 'react'

export interface CardProps {
  profileName: string
  username: string
  profileImageUrl?: string
  imageUrl: string
  title: string
  subtitle?: string
  description?: string
  meta?: string // e.g., 'New · 13 hours ago'
  likes?: number
  comments?: number
}

const MOCK_PROFILE_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

export const Card: FC<CardProps> = ({
  profileName,
  username,
  profileImageUrl,
  imageUrl,
  title,
  subtitle,
  description,
  meta,
  likes = 0,
  comments = 0,
}) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg text-black max-w-2xl mx-auto min-h-[600px] w-full border border-black/10">
    {/* Profile Header */}
    <div className="flex items-center gap-4 px-6 py-5 bg-white border-b border-indigo-100">
      <img src={profileImageUrl || MOCK_PROFILE_IMAGE} alt="profile" className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500" />
      <div className="flex flex-col">
        <span className="font-bold text-xl text-black">{profileName}</span>
        <span className="text-sm text-gray-500">@{username}</span>
      </div>
    </div>
    {/* Image */}
    <div className="relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full object-cover aspect-video border-b border-black/10 min-h-[320px]"
      />
      {meta && (
        <span className="absolute top-2 left-2 bg-indigo-600 bg-opacity-90 text-xs px-2 py-1 rounded text-white font-semibold shadow">
          {meta}
        </span>
      )}
    </div>
    {/* Content */}
    <div className="p-6">
      <div className="text-2xl font-bold mb-2 text-black">{title}</div>
      {subtitle && <div className="text-lg text-gray-700 mb-3">{subtitle}</div>}
      {description && <div className="text-base text-gray-600 mb-4 line-clamp-2">{description}</div>}
    </div>
    {/* Footer */}
    <div className="flex items-center justify-between px-6 py-3 border-t border-black/10 text-gray-700 text-base">
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2"><svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" /></svg>{likes}</span>
        <span className="flex items-center gap-2"><svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z" /></svg>{comments}</span>
      </div>
      <button className="hover:text-indigo-700 transition-colors"><svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" /><path d="M16 6l-4-4-4 4" /></svg></button>
    </div>
  </div>
)
