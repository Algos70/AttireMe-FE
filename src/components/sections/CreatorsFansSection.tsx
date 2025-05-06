import type React from 'react';

const CreatorsFansSection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 font-oracle text-4xl font-bold text-patreon-dark md:text-5xl">
              Designers. Fashion Lovers.<br />No gatekeepers.
            </h2>
            <p className="mb-6 text-lg text-patreon-dark">
              Discover curated fashion collections created by independent designers from across the web.
              Every outfit links directly to trusted online stores — no middlemen.
            </p>
            <p className="mb-6 text-lg text-patreon-dark">
              Subscribe to your favorite designers to unlock exclusive collections, leave reviews,
              and join vibrant discussions around fashion inspiration. Message designers directly and
              get outfit suggestions based on what you already own.
            </p>
            <a
              href="/explore/designers"
              className="inline-flex w-fit items-center justify-center rounded-full bg-patreon-dark px-6 py-3 text-white transition-colors hover:bg-gray-800"
            >
              Explore collections
            </a>
          </div>

          {/* Right Column: Chat Mock */}
          <div className="flex items-center justify-center">
            <div className="rounded-2xl bg-white p-4 shadow-xl">
              <div className="rounded-xl bg-gray-100 p-6">
                <div className="mb-4 flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-4">
                  {/* Designer message */}
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-patreon-blue"></div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm text-gray-800">
                        Just dropped a new summer outfit collection — sourced from Mango, Zara, and COS 🌞
                      </p>
                    </div>
                  </div>
                  {/* Fan comment */}
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-purple-500"></div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm text-gray-800">
                        Love your picks! Especially that linen set. Commented on the lookbook 🙌
                      </p>
                    </div>
                  </div>
                  {/* Designer Q&A */}
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-patreon-blue"></div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm text-gray-800">
                        New Q&A for subscribers this Friday. Drop your questions about styling minimal streetwear!
                      </p>
                    </div>
                  </div>
                  {/* User sends outfit image */}
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-purple-500"></div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm text-gray-800">Here are a few pieces I own. Any styling tips?</p>
                      <img
                        src="/images/user-outfit-sample.jpg"
                        alt="User outfit"
                        className="mt-2 w-32 rounded-md"
                      />
                    </div>
                  </div>
                  {/* Designer replies with suggestion */}
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-patreon-blue"></div>
                    <div className="rounded-lg bg-white p-3 shadow-sm">
                      <p className="text-sm text-gray-800">
                        Great pieces! Try adding a cropped blazer and these trousers from Zara →
                        <a
                          href="https://www.zara.com/"
                          target="_blank"
                          className="ml-1 text-blue-600 underline"
                          rel="noopener noreferrer"
                        >
                          View item
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsFansSection;