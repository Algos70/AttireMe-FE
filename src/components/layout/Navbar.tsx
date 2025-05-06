import { useState } from "react";
import attireMeLogo from "../../assets/images/logo.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-indigo-600 py-3 shadow-md">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={attireMeLogo} alt="AttireMe" className="h-10 w-auto" />
        </a>

        {/* Title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <span className="text-xl font-bold text-white">AttireMe</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto block text-white lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex space-x-8">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search styles..."
              className="w-40 rounded-lg border border-indigo-700 bg-indigo-500 px-3 py-1.5 text-sm text-white placeholder:text-indigo-100 focus:w-44 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <a
            href="#"
            className="text-sm font-medium text-white hover:text-gray-300"
            onClick={() => window.location.assign("/login")}
          >
            Log in
          </a>
          <a
            href="#"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
            onClick={() => window.location.assign("/signup")}
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-gray-900">
          <div className="container-custom space-y-4 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search styles..."
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <a
              href="#"
              className="block text-sm font-medium text-white hover:text-gray-300"
              onClick={() => window.location.assign("/login")}

            >
              Log in
            </a>
            <a
              href="#"
              className="block rounded-lg bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
              onClick={() => window.location.assign("/signup")}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
