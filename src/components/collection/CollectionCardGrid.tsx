// This file has been refactored to CollectionCardGrid.tsx. Please rename the file accordingly.
// CardGrid.tsx
import { FC } from 'react'
import { CollectionCard, Collection } from '../collection/CollectionCard'

export const CollectionCardGrid: FC = () => {
  const collections: Collection[] = Array.from({ length: 6 }).map((_, i) => ({
    collectionId: i + 1,
    collectionImage: `https://picsum.photos/900/300?random=${i + 1}`,
    creatorID: 1,
    creatorName: `Creator ${i + 1}`,
    creatorUsername: `creator${i + 1}`,
    creatorProfileImage: undefined,
    title: `Collection ${i + 1}`,
  }))

  return (
    <div className="bg-page py-12">
      <div
        className="
          mx-auto 
          max-w-3xl 
          grid grid-cols-1 gap-6 
          px-4
        "
      >
        {collections.map((c, idx) => (
          <CollectionCard key={idx} collection={c} />
        ))}
      </div>
    </div>
  )
}
