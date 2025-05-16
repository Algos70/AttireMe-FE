import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';
import { getDetailedCollectionById, getCreatorById } from '../utils/api';
import ImageModal from '../components/collection/ImageModal';
import Loading from '../components/creator/Loading';
import CollectionHeaderCard from '../components/collection/post/CollectionHeaderCard';
import CollectionTitle from '../components/collection/post/CollectionTitle';
import OutfitSelector from '../components/collection/post/OutfitSelector';
import OutfitDetailCard from '../components/collection/post/OutfitDetailCard';
import OutfitItemsList from '../components/collection/post/OutfitItemsList';
import ErrorState from '../components/collection/post/ErrorState';

// Types
interface OutfitItem {
  id?: number;
  outfitId?: number;
  imageURL: string;
  productLink: string;
  storeName: string;
}

interface Outfit {
  id?: number;
  description: string;
  imageURL: string;
  outfitItems: OutfitItem[];
}

interface Collection {
  collectionId: number;
  collectionImage: string;
  creatorID: number;
  creatorUsername: string;
  creatorProfileImage?: string;
  title: string;
  description: string;
  genres: number[];
  isPaid: boolean;
  outfits: Outfit[];
  seasons: string[];
}

const CollectionPostPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const { profile } = useUserProfile();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [selectedOutfitIdx, setSelectedOutfitIdx] = useState<number | null>(0);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user ID from profile (handle both ID and UserID)
  const userId = profile && ('ID' in profile ? profile.ID : ('UserID' in profile ? profile.UserID : null));

  useEffect(() => {
    let isMounted = true;
    if (!collectionId || !userId) return;
    setLoading(true);
    setError(null);
    getDetailedCollectionById(Number(collectionId), userId)
      .then(async (response) => {
        const data = response.data;
        if (!data) throw new Error('No collection data found');
        // İlk olarak temel mapping
        let mappedCollection: Collection = {
          collectionId: data.ID,
          collectionImage: data.CollectionImage,
          creatorID: data.CreatorID,
          creatorUsername: '',
          creatorProfileImage: '',
          title: data.Title,
          description: data.Description,
          genres: data.Genres || [],
          isPaid: data.IsPaid,
          outfits: Array.isArray(data.Outfits) ? data.Outfits.map((outfit: any) => ({
            id: outfit.ID,
            description: outfit.Description,
            imageURL: outfit.ImageURL,
            outfitItems: Array.isArray(outfit.OutfitItems) ? outfit.OutfitItems.map((item: any) => ({
              id: item.ID,
              outfitId: item.OutfitID,
              imageURL: item.ImageURL,
              storeName: item.StoreName,
              productLink: item.ProductLink,
            })) : [],
          })) : [],
          seasons: data.Seasons || [],
        };
        // Creator bilgilerini çek
        try {
          const creatorResponse = await getCreatorById(data.CreatorID);
          const creatorData = creatorResponse?.data;
          if (creatorData) {
            mappedCollection.creatorUsername = creatorData.Username || '';
            mappedCollection.creatorProfileImage = creatorData.ProfileImage || '';
          }
        } catch (e) {
          // Creator bilgisi alınamazsa boş bırak
        }
        if (isMounted) {
          setCollection(mappedCollection);
          setSelectedOutfitIdx(0);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch collection');
      })
      .finally(() => setLoading(false));
    return () => { isMounted = false; };
  }, [collectionId, userId]);

  if (loading) {
    return <Loading />;
  }
  if (error && error.includes('not subscribed')) {
    return <ErrorState message="Bu koleksiyonu görüntülemek için abone olmanız gerekiyor." />;
  }
  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-red-500">{error}</div>;
  }
  if (!collection) {
    return <div className="flex justify-center items-center min-h-screen text-lg text-gray-500"></div>;
  }

  const handleUsernameClick = () => {
    if (collection.creatorUsername) {
      navigate(`/h/creator/${collection.creatorUsername}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-2 sm:px-4 min-h-screen">
      {/* Modal for enlarged image */}
      {enlargedImage && (
        <ImageModal imageURL={enlargedImage} onClose={() => setEnlargedImage(null)} />
      )}
      <CollectionHeaderCard
        collectionImage={collection.collectionImage}
        creatorProfileImage={collection.creatorProfileImage || ''}
        creatorUsername={collection.creatorUsername}
        description={collection.description}
        seasons={collection.seasons}
        isPaid={collection.isPaid}
        onUsernameClick={handleUsernameClick}
      />
      <CollectionTitle title={collection.title} />
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-black">Outfits</h2>
        <OutfitSelector
          outfits={collection.outfits}
          selectedOutfitIdx={selectedOutfitIdx}
          setSelectedOutfitIdx={setSelectedOutfitIdx}
        />
        {selectedOutfitIdx !== null && Array.isArray(collection.outfits) && collection.outfits[selectedOutfitIdx] && (
          <OutfitDetailCard
            imageURL={collection.outfits[selectedOutfitIdx].imageURL}
            description={collection.outfits[selectedOutfitIdx].description}
            onImageClick={setEnlargedImage}
          />
        )}
      </div>
      {selectedOutfitIdx !== null && Array.isArray(collection.outfits) && collection.outfits[selectedOutfitIdx] && (
        <OutfitItemsList
          items={collection.outfits[selectedOutfitIdx].outfitItems}
          onImageClick={setEnlargedImage}
        />
      )}
    </div>
  );
};

export default CollectionPostPage;
