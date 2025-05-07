import { FC } from 'react'

export interface CardProps {
  header: string
  imageUrl: string
  title: string
}

export const Card: FC<CardProps> = ({ header, imageUrl, title }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow">
    <div className="bg-primary px-4 py-2 text-white font-medium">
      {header}
    </div>
    <img
      src={imageUrl}
      alt={title}
      className="w-full object-cover aspect-video"
    />
    <div className="p-4 text-gray-800 text-lg">{title}</div>
  </div>
)
