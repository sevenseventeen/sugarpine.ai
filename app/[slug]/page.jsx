import { notFound } from 'next/navigation'
import { getAllPages, getPageContent } from '../../lib/data.js'
import Shell from '../../components/Shell.jsx'
import ArticleView from '../../components/ArticleView.jsx'

export async function generateStaticParams() {
  const pages = await getAllPages()
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = await getPageContent(slug)
  if (!page) return {}
  return {
    title: `${page.title} — Sugarpine`,
    description: page.blurb,
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const [pages, page] = await Promise.all([
    getAllPages(),
    getPageContent(slug),
  ])
  if (!page) notFound()

  return (
    <Shell pages={pages}>
      <ArticleView page={page} />
    </Shell>
  )
}
