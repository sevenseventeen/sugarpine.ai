import { notFound } from 'next/navigation'
import { getAllPages, findById } from '../../lib/data.js'
import Shell from '../../components/Shell.jsx'
import ArticleView from '../../components/ArticleView.jsx'

export async function generateStaticParams() {
  const pages = await getAllPages()
  return pages.map((page) => ({ slug: page.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const pages = await getAllPages()
  const page = findById(pages, slug)
  if (!page) return {}
  return {
    title: `${page.title} — Sugarpine`,
    description: page.blurb,
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const pages = await getAllPages()
  const page = findById(pages, slug)
  if (!page) notFound()

  return (
    <Shell pages={pages}>
      <ArticleView page={page} />
    </Shell>
  )
}
