import { FC } from 'react'
import { Card, CardProps } from './Card'

export const CardGrid: FC = () => {
  const cards: CardProps[] = Array.from({ length: 6 }).map((_, i) => ({
    header: `Channel ${i + 1}`,
    title: `Item ${i + 1}`,
    imageUrl: `https://picsum.photos/900/300?random=${i + 1}`,
  }))

  return (
    <div className="bg-page py-12">
      <div className="mx-auto max-w-3xl grid grid-cols-1 gap-6 px-4">
        {cards.map((c, idx) => (
          <Card
            key={idx}
            header={c.header}
            imageUrl={c.imageUrl}
            title={c.title}
          />
        ))}
      </div>
    </div>
  )
}
