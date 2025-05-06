import type React from "react";

const TrendingStyles: React.FC = () => {
  const trendingItems = [
    {
      id: 1,
      title: "Summer Collection",
      description:
        "Curated warm-weather outfits with links to Mango, Zara & more",
      // themed Unsplash Source
      image: "https://source.unsplash.com/400x600/?summer-fashion,beach",
      category: "New Arrival",
      items: "24",
    },
    {
      id: 2,
      title: "Casual Comfort",
      description:
        "Modern essentials styled for daily wear and linked to shop-ready pieces",
      // seeded Lorem Picsum (consistent across reloads)
      image: "https://picsum.photos/seed/casual/400/600",
      category: "Popular",
      items: "32",
    },
    {
      id: 3,
      title: "Evening Elegance",
      description:
        "Designer-picked looks for nights out — sourced from premium brands",
      // random Unsplash Source
      image: "https://source.unsplash.com/400x600/?evening-gown,night",
      category: "Featured",
      items: "18",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-oracle text-4xl font-bold text-gray-900 md:text-5xl">
            Trending Styles
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Curated fashion collections by independent designers — complete with
            styling notes and direct shopping links
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 transition-all hover:shadow-xl"
            >
              <div className="aspect-w-3 aspect-h-4">
                <div
                  className="h-full w-full bg-gray-200 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                    {item.category} • {item.items} items
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
                  <p className="mb-4 text-gray-200">{item.description}</p>
                  <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100">
                    Explore Style
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/collections"
            className="inline-flex items-center justify-center rounded-full border-2 border-gray-900 bg-transparent px-8 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
          >
            View All Styles
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrendingStyles;
