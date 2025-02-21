import { Metadata } from 'next'
import { OstDocument } from 'outstatic'
import Layout from '@/components/Layout'
import markdownToHtml from '@/lib/markdownToHtml'
import { getDocumentSlugs, load } from 'outstatic/server'
import { absoluteUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Post = {
  tags: { value: string; label: string }[]
} & OstDocument

interface Params {
  params: {
    slug: string
  }
}

export async function generateMetadata(params: Params): Promise<Metadata> {
  const post = await getData(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(`/posts/${post.slug}`),
      images: [
        {
          url: absoluteUrl(post?.coverImage || '/images/og-image.png'),
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: absoluteUrl(post?.coverImage || '/images/og-image.png')
    }
  }
}

export default async function Post(params: Params) {
  const post = await getData(params)
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-5">
        <article className='pb-16'>
          <div className='text-center border-b py-8 mb-8'>
            <h1 className="text-4xl font-semibold mb-4">
              {post.title}
            </h1>
            {Array.isArray(post?.tags)
              ? post.tags.map(({ label }) => (
                <span key={label} className="inline-block rounded-sm bg-neutral-200 px-3 py-1 text-xs mr-2">
                  {label}
                </span>
              ))
              : null}
          </div>
          <div className="max-w-xl mx-auto">
            <div
              className="prose lg:prose-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <div className="text-center text-sm underline mt-8">
            <a href="/">[首页]</a>
          </div>
        </article>
      </div>
    </Layout>
  )
}

async function getData({ params }: Params) {
  const db = await load()

  const post = await db
    .find<Post>({ collection: 'posts', slug: params.slug }, [
      'title',
      'publishedAt',
      'description',
      'slug',
      'author',
      'content',
      'coverImage',
      'tags'
    ])
    .first()

  if (!post) {
    notFound()
  }

  const content = await markdownToHtml(post.content)

  return {
    ...post,
    content
  }
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('posts')
  return posts.map((slug) => ({ slug }))
}
