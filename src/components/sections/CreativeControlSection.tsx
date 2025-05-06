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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Featured Collections */}
        <div>
          <h2 className="mb-4 font-oracle text-3xl font-bold text-patreon-dark">
            Featured Collections
          </h2>
          <p className="mb-8 text-lg text-patreon-dark">
            Explore fashion collections curated by independent designers. Each outfit includes direct purchase links to external stores — no middleman.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {COLLECTIONS.map(col => (
              <SelectionCollectionCard key={col.title} {...col} />
            ))}
          </div>
        </div>

        {/* RIGHT: Designer Control & Messaging */}
        <div className="flex flex-col h-full justify-between">
          {/* Top block */}
          <div>
            <h2 className="mb-6 font-oracle text-4xl font-bold text-patreon-dark md:text-5xl">
              Designer<br />Curation<br />Freedom
            </h2>
            <p className="text-lg text-patreon-dark mb-4">
              Build and share your own collections using outfits you discover online. Add purchase links, styling notes, and unlock exclusive content for your subscribers.
            </p>
            <p className="text-lg text-patreon-dark">
              Receive direct messages from users with their wardrobe photos and give tailored styling advice.
            </p>
          </div>

          {/* CTA */}
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
