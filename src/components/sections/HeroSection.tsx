import type React from 'react';
import { useState, useEffect } from 'react';
import hero1 from '../../assets/images/hero-1.jpeg';
import hero2 from '../../assets/images/hero-2.jpeg';

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [hero1, hero2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-32 text-white">
      {/* Background images with crossfade effect */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${image})`,
              opacity: index === currentImageIndex ? 0.6 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 inline-block animate-bounce">
            <svg className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          <h1 className="mb-8 text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
            Summer Collections <br />are here
          </h1>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center gap-4"> 
              <a
                href=""
                className="rounded-full bg-patreon-blue px-6 py-2 font-semibold text-white transition-colors hover:bg-patreon-blue-dark"
              >
                Summer Collections
              </a>

              <p className="max-w-lg text-lg text-gray-300"> 
                New styles, colors, and patterns to elevate your summer wardrobe. Discover the latest trends and find your perfect fit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
