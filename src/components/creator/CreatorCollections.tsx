import React from 'react';
import { CollectionCard, Collection } from '../after-login/CollectionCard';

const CreatorCollections: React.FC<{ collections: Collection[] }> = ({ collections }) => (
  <section className="max-w-3xl mx-auto py-8 sm:py-12 px-2 sm:px-4">
    <div className="grid grid-cols-1 gap-6 sm:gap-8">
      {collections.map((col, idx) => (
        <CollectionCard key={idx} collection={col} />
      ))}
    </div>
  </section>
);

export default CreatorCollections; 