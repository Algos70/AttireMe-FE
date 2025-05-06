import type React from 'react';
import creator1 from '../../assets/images/creator-1.jpeg';
import creator2 from '../../assets/images/creator-2.jpeg';

const CreativitySection: React.FC = () => {
  return (
    <section className="bg-patreon-beige py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 font-oracle text-4xl font-bold text-patreon-dark md:text-5xl">
              Curate Exclusive<br />Fashion Collections
            </h2>
            <p className="mb-8 text-lg text-patreon-dark">
              Designers gather outfits they discover online, add direct purchase links,
              and package them into ready-to-shop collections. Your subscribers get
              unique, styled looks—all in one place.
            </p>
          </div>

          {/* Right Column: Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={creator1}
                  alt="Designer curating an outfit collection"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src={creator2}
                  alt="Stylish curated clothing collection"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Quote overlay */}
            <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <blockquote className="text-patreon-dark">
                <p className="mb-4 text-lg italic">
                  "I love pulling looks from around the web and turning them into
                  styled collections that my subscribers can shop instantly."
                </p>
                <footer className="font-bold">— Sofia Patel, Fashion Curator</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativitySection;
