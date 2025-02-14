import { load } from 'outstatic/server'
import Layout from '../components/Layout'
import ContentGrid from '../components/ContentGrid'
import Header from '../components/Header'

export default async function Index() {
  const { allPosts } = await getData()

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6">
        <Header />
        {allPosts.length > 0 && (
          <ContentGrid
            items={allPosts}
            collection="posts"
            priority
          />
        )}
      </div>
    </Layout>
  )
}

async function getData() {
  const db = await load()

  const allPosts = await db
    .find({ collection: 'posts' }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'tags'
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  return {
    allPosts,
  }
}
