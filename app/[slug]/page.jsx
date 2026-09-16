import { notFound } from 'next/navigation'
import { getAllPages, getAllEntries, getAllEntryPaths, getPageContent, getEntry } from '../../lib/data.js'
import Shell from '../../components/Shell.jsx'
import Timeline from '../../components/Timeline.jsx'
import GlossaryView from '../../components/GlossaryView.jsx'
import EntryView from '../../components/EntryView.jsx'
import { NAV, sectionBySlug } from '../../lib/nav.js'

// One flat namespace: /science (section), /ai-glossary (page), /openai-releases-chatgpt (entry)
export async function generateStaticParams() {
  const [pages, entrySlugs] = await Promise.all([getAllPages(), getAllEntryPaths()])
  const slugs = new Set([...NAV.map((n) => n.slug), ...pages.map((p) => p.slug), ...entrySlugs])
  return [...slugs].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const section = sectionBySlug(slug)
  if (section) return { title: `${section.label} — Sugarpine` }
  if (slug === 'ai-glossary') return { title: 'Glossary — Sugarpine' }
  const entry = await getEntry(slug)
  if (entry) return { title: `${entry.title} — Sugarpine`, description: entry.summary }
  return {}
}

export default async function SlugPage({ params }) {
  const { slug } = await params
  const pages = await getAllPages()
  const entries = await getAllEntries(pages)

  const section = sectionBySlug(slug)
  if (section) {
    return <Shell pages={pages} entries={entries}><Timeline section={section} /></Shell>
  }

  if (slug === 'ai-glossary') {
    const page = await getPageContent(slug)
    if (!page) notFound()
    return <Shell pages={pages} entries={entries}><GlossaryView page={page} /></Shell>
  }

  const entry = await getEntry(slug)
  if (!entry) notFound()
  return <Shell pages={pages} entries={entries}><EntryView entry={entry} /></Shell>
}
