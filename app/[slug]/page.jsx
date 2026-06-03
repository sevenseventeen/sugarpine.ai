import { notFound } from 'next/navigation'
import { ALL, byId } from '../../lib/data.js'
import Shell from '../../components/Shell.jsx'
import ArticleView from '../../components/ArticleView.jsx'

export async function generateStaticParams() {
  return ALL.map((page) => ({ slug: page.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = byId(slug)
  if (!page) return {}
  return {
    title: `${page.title} — Sugarpine`,
    description: page.blurb,
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const page = byId(slug)
  if (!page) notFound()

  return (
    <Shell>
      <ArticleView page={page} />
    </Shell>
  )
}
