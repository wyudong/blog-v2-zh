import type { OstDocument } from 'outstatic'
import Link from 'next/link'
import Image from 'next/image'

type Item = {
  tags?: { value: string; label: string }[]
} & OstDocument

type Props = {
  collection: 'posts' | 'projects'
  title?: string
  items: Item[]
  priority?: boolean
}

const ContentGrid = ({
  title = '',
  items,
  collection,
  priority = false
}: Props) => {
  return (
    <section id={collection}>
      {/* 标题保持空白 */}
      <h2 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x-12 xl:gap-x-8 gap-y-8 pb-8">
        {items.map((item, id) => (
          <Link key={item.slug} href={`/${collection}/${item.slug}`}>
            <div className="cursor-pointer project-card md:w-full scale-100 overflow-hidden">
              <div className="sm:mx-0">
                <Image
                  src={item.coverImage ?? ''}
                  alt={`Cover Image for ${item.title}`}
                  className="object-cover object-center w-full h-auto"
                  width={0}
                  height={0}
                  sizes="(min-width: 768px) 320px, 200px"
                  priority={priority && id <= 6}
                />
                {collection === 'projects' && (
                  <h2 className="p-2 bg-opacity-80 bg-white text-center whitespace-nowrap font-bold text-3xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg rounded-lg">
                    {item.title}
                  </h2>
                )}
              </div>
              {collection === 'posts' && (
                <div className="p-4">
                  <h3 className="text-xl text-center font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-md text-center mb-4">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ContentGrid
