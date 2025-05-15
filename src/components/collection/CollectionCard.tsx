import { FC } from 'react'
import { useNavigate } from 'react-router-dom';

export interface Collection {
  collectionId: number;
  collectionImage: string;
  creatorID: number;
  creatorName: string;
  creatorUsername: string;
  creatorProfileImage?: string;
  title: string;
}

const MOCK_PROFILE_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

export const CollectionCard: FC<{ collection: Collection }> = ({ collection }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg text-black max-w-2xl mx-auto min-h-[400px] w-full border border-black/10 cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => navigate(`/h/post/${collection.collectionId}`)}
    >
      {/* Profile Header */}
      <div className="flex items-center gap-4 px-6 py-5 bg-white border-b border-indigo-100">
        <img src={collection.creatorProfileImage || MOCK_PROFILE_IMAGE} alt="profile" className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500" />
        <div className="flex flex-col">
          <span className="font-bold text-xl text-black">{collection.creatorName}</span>
          <span className="text-sm text-gray-500">@{collection.creatorUsername}</span>
        </div>
      </div>
      {/* Collection Image */}
      <div className="relative">
        <img
          src={collection.collectionImage}
          alt={collection.title}
          className="w-full object-cover aspect-video border-b border-black/10 min-h-[220px]"
        />
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="text-2xl font-bold mb-2 text-black">{collection.title}</div>
      </div>
    </div>
  );
}
