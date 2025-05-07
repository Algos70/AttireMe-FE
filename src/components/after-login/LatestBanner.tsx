import { FC } from 'react'

export const LatestBanner: FC = () => {
  const imageUrl = 'https://picsum.photos/800/300?random=1'

  return (
    <div className="bg-page text-center py-8">
      <img
        src={imageUrl}
        alt="Latest cover"
        className="mx-auto w-48 h-auto rounded-lg shadow-lg"
      />
      <h2 className="mt-2 text-3xl font-semibold text-gray-800">
        Latest
      </h2>
    </div>
  )
}
