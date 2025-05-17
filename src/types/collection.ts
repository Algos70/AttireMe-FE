export interface OutfitItem {
  id?: number;
  outfitId?: number;
  imageURL: string;
  productLink: string;
  storeName: string;
}

export interface Outfit {
  id?: number;
  description: string;
  imageURL: string;
  outfitItems: OutfitItem[];
}

export interface Collection {
  collectionId: number;
  collectionImage: string;
  creatorID: number;
  creatorUsername: string;
  creatorProfileImage?: string;
  title: string;
  description: string;
  genres: string[];
  isPaid: boolean;
  outfits: Outfit[];
  seasons: string[];
} 