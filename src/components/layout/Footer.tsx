import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Creators */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Creators</h4>
            <ul className="space-y-2">
              <li><a href="/creators/podcasts" className="text-gray-300 hover:text-white">Podcasters</a></li>
              <li><a href="/creators/video" className="text-gray-300 hover:text-white">Video creators</a></li>
              <li><a href="/creators/music" className="text-gray-300 hover:text-white">Musicians</a></li>
              <li><a href="/creators/visualartists" className="text-gray-300 hover:text-white">Artists</a></li>
              <li><a href="/creators/gaming" className="text-gray-300 hover:text-white">Game devs</a></li>
            </ul>
          </div>

          {/* Column 2: Features */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Features</h4>
            <ul className="space-y-2">
              <li><a href="/product/create" className="text-gray-300 hover:text-white">Create on your terms</a></li>
              <li><a href="/product/online-community" className="text-gray-300 hover:text-white">Build real community</a></li>
              <li><a href="/product/grow" className="text-gray-300 hover:text-white">Expand your reach</a></li>
              <li><a href="/product/manage-business" className="text-gray-300 hover:text-white">Get business support</a></li>
              <li><a href="/product/digital-products" className="text-gray-300 hover:text-white">Earning made easy</a></li>
            </ul>
          </div>

          {/* Column 3: Pricing */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Pricing</h4>
            <ul className="space-y-2">
              <li><a href="/pricing" className="text-gray-300 hover:text-white">Starting an AttireMe account is free</a></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="/press" className="text-gray-300 hover:text-white">Press</a></li>
              <li><a href="/policy/legal" className="text-gray-300 hover:text-white">Terms of Use & policies</a></li>
              <li><a href="" className="text-gray-300 hover:text-white">Privacy policy</a></li>
            </ul>
          </div>
        </div>

        {/* App Store Links */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a href="" className="mr-4">
            <img
              src="https://ext.same-assets.com/3589420495/1353967154.png"
              alt="Get it on Google Play"
              className="h-10"
            />
          </a>
          <a href="">
            <img
              src="https://ext.same-assets.com/3589420495/3379655322.png"
              alt="Download on the App Store"
              className="h-10"
            />
          </a>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex flex-wrap gap-6">
          <a href="https://twitter.com" className="text-gray-300 hover:text-white">
            <span>Twitter</span>
          </a>
          <a href="https://www.facebook.com" className="text-gray-300 hover:text-white">
            <span>Facebook</span>
          </a>
          <a href="https://www.instagram.com" className="text-gray-300 hover:text-white">
            <span>Instagram</span>
          </a>
          <a href="https://www.youtube.com" className="text-gray-300 hover:text-white">
            <span>YouTube</span>
          </a>
          <a href="https://www.linkedin.com" className="text-gray-300 hover:text-white">
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-gray-400">
          <p> Antalya, Konya Altı, Türkiye | AttireMe</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
