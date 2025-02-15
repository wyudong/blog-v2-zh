import { load } from 'outstatic/server'
import Layout from '../components/Layout'
import ContentGrid from '../components/ContentGrid'
import Header from '../components/Header'

export default async function Index() {
  const { allPosts } = await getData()

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6">
        <Header />
        <div className="py-8 mb-4 home-hero-fade">
          <h1 className="text-6xl mb-8">嗨，</h1>
          <h2 className="text-4xl mb-6 leading-tight">我是一名全栈工程师，用程序解决你的难题。</h2>
          <h3 className="text-4xl mb-2 leading-tight font-light">网页开发 / 服务器 / 解决方案 / 运维 / 工具 / 育儿经验 / ……</h3>
        </div>
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
    .sort({ rank: 1, publishedAt: -1 })
    .toArray()

  return {
    allPosts,
  }
}
