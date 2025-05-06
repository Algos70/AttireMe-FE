import React from "react";
import SelectionCollectionCard, {
  SelectionCollectionCardProps,
} from "./SectionCollectionCard"; 

const COLLECTIONS: SelectionCollectionCardProps[] = [
  {
    image: '/images/collections/streetwear.jpg',
    title: 'Streetwear Staples',
    subtitle: 'Urban, edgy, bold',
    link: '/collections/streetwear',
  },
  {
    image: '/images/collections/vintage.jpg',
    title: 'Vintage Vibes',
    subtitle: 'Timeless classics',
    link: '/collections/vintage',
  },
  {
    image: '/images/collections/summer.jpg',
    title: 'Summer Breeze',
    subtitle: 'Light & airy looks',
    link: '/collections/summer-breeze',
  },
];

const CreativeControlSection: React.FC = () => (
  <section className="bg-patreon-blue-light py-20">
    <div className="container-custom">
      {/* Remove items-start so columns stretch to same height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Featured Collections */}
        <div>
          <h2 className="mb-4 font-oracle text-3xl font-bold text-patreon-dark">
            Featured Collections
          </h2>
          <p className="mb-8 text-lg text-patreon-dark">
            Discover curated outfits hand-picked by top designers. Click any card to explore the full collection.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {COLLECTIONS.map(col => (
              <SelectionCollectionCard key={col.title} {...col} />
            ))}
          </div>
        </div>

        {/* RIGHT: Curator Control, stretched full height */}
        <div className="flex flex-col h-full justify-between">
          {/* Top block */}
          <div>
            <h2 className="mb-6 font-oracle text-4xl font-bold text-patreon-dark md:text-5xl">
              Total<br />Curator<br />Control
            </h2>
            <p className="text-lg text-patreon-dark">
              Build and organize your own fashion collections exactly how you envision them. Link to any outfit you find online, add styling notes, and share with subscribers who get exclusive access to your curated looks.
            </p>
          </div>

          {/* Pinned to bottom */}
          <a
            href="/collections/create"
            className="mt-6 inline-flex w-fit items-center justify-center rounded-md bg-patreon-dark px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-patreon-blue-dark"
          >
            Start Curating
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CreativeControlSection;