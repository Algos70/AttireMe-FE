import React from 'react';
import { Card, CardProps } from '../components/after-login/Card';
import bannerImg from '../assets/images/hero-2.jpeg';
import avatarImg from '../assets/images/creator-1.jpeg';

const vendorProfile = {
  name: 'FiniteVoid',
  username: 'finitevoid',
  description: 'Currently writing Shades of Perception',
  members: 87,
  posts: 140,
  avatar: avatarImg,
  banner: bannerImg,
};

const posts: CardProps[] = [
  {
    profileName: vendorProfile.name,
    username: vendorProfile.username,
    profileImageUrl: vendorProfile.avatar,
    imageUrl: 'https://picsum.photos/900/300?random=1',
    title: 'Chapter 211 - Ember Seeks Ash',
    subtitle: 'February 25',
    description: 'CLANG!! All the momentum and weight came crashing in full force as his feet skidded back, and he barely retained his posture. He winced, awa...',
    meta: '3 likes',
    likes: 3,
    comments: 0,
  },
  {
    profileName: vendorProfile.name,
    username: vendorProfile.username,
    profileImageUrl: vendorProfile.avatar,
    imageUrl: 'https://picsum.photos/900/300?random=2',
    title: 'Chapter 210 - A Counter To Healing',
    subtitle: 'February 12',
    description: 'Through his meticulous mapping of the area, Vern confirmed that only these three adversaries were present in the surrounding space. Surely,...',
    meta: '4 likes',
    likes: 4,
    comments: 1,
  },
  // Add more posts as needed
];

const Vendor: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Banner/Header */}
      <div className="relative w-full h-64 md:h-80 bg-black flex items-end justify-center">
        <img
          src={vendorProfile.banner}
          alt="Vendor banner"
          className="absolute inset-0 w-full h-full object-cover opacity-80 blur-md"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 flex flex-col items-center pb-6">
          <img
            src={vendorProfile.avatar}
            alt="Vendor avatar"
            className="w-28 h-28 rounded-full border-4 border-indigo-600 shadow-lg object-cover mb-3"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{vendorProfile.name}</h1>
          <div className="text-indigo-200 text-lg font-medium">{vendorProfile.description}</div>
          <div className="flex gap-4 mt-2 text-indigo-100 text-sm">
            <span>{vendorProfile.members} members</span>
            <span>•</span>
            <span>{vendorProfile.posts} posts</span>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition-colors">Subscribe</button>
            <button className="px-6 py-2 rounded-full bg-white text-black font-semibold border border-black/10 shadow hover:bg-gray-100 transition-colors">Follow</button>
          </div>
        </div>
      </div>
      {/* Posts Grid */}
      <section className="max-w-3xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-8">
          {posts.map((post, idx) => (
            <Card key={idx} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Vendor; 