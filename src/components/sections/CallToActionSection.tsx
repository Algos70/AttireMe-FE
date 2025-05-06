import type React from 'react';

const CallToActionSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-patreon-blue-light to-white py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl lg:p-12">
          <div className="text-center">
            <h2 className="mb-6 font-oracle text-3xl font-bold text-patreon-dark md:text-4xl">
              Start Your Fashion Page
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              Curate collections, connect with style lovers, and monetize your creativity with direct subscriptions.
            </p>

            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <a
                href="/signup"
                className="w-full rounded-full bg-patreon-blue px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-patreon-blue-dark sm:w-auto"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="w-full rounded-full border border-patreon-dark px-8 py-4 text-center font-semibold text-patreon-dark transition-colors hover:bg-gray-100 sm:w-auto"
              >
                Already have an account? Log in
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="#" className="block opacity-50 pointer-events-none">
                <img
                  src="https://ext.same-assets.com/3589420495/1353967154.png"
                  alt="Google Play (Coming Soon)"
                  className="h-12"
                />
              </a>
              <a href="#" className="block opacity-50 pointer-events-none">
                <img
                  src="https://ext.same-assets.com/3589420495/3379655322.png"
                  alt="App Store (Coming Soon)"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
