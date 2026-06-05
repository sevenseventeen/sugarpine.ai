import { notFound } from 'next/navigation'
import { getAllPages, getAllEntryPaths, getEntry } from '../../../lib/data.js'
import Shell from '../../../components/Shell.jsx'
import EntryView from '../../../components/EntryView.jsx'

export async function generateStaticParams() {
  return getAllEntryPaths()
}

export async function generateMetadata({ params }) {
  const { slug, entry: entrySlug } = await params
  const result = await getEntry(slug, entrySlug)
  if (!result) return {}
  return {
    title: `${result.entry.title} — Sugarpine`,
    description: result.entry.summary,
  }
}

export default async function EntryPage({ params }) {
  const { slug, entry: entrySlug } = await params
  const [pages, result] = await Promise.all([
    getAllPages(),
    getEntry(slug, entrySlug),
  ])
  if (!result) notFound()

  return (
    <Shell pages={pages}>
      <EntryView entry={result.entry} page={result.page} />
    </Shell>
  )
}
