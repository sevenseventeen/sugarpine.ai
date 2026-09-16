import { supabase } from './supabase.js'

export { daysAgo, fmtDate, relTime, getTopics, findBySlug } from './format.js'

function normalisePageMeta(p) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    group: p.group,
    position: p.position,
    blurb: p.blurb,
    kicker: p.kicker,
    lede: p.lede,
    readMins: p.read_mins,
    cardsHeading: p.cards_heading,
    youtube: p.youtube_id ? { id: p.youtube_id, title: p.youtube_title } : null,
    updated: p.updated_at.split('T')[0],
  }
}

// Lightweight page list — sidebar, home feed, static params
export async function getAllPages() {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('position', { ascending: true })
  if (error) throw new Error(`Failed to fetch pages: ${error.message}`)
  return data.map(normalisePageMeta)
}

// Full page content — the glossary's cards ride along
export async function getPageContent(slug) {
  const { data: page, error } = await supabase.from('pages').select('*').eq('slug', slug).single()
  if (error || !page) return null
  const cardsRes = await supabase.from('page_cards').select('*').eq('page_id', page.id).order('position')
  return { ...normalisePageMeta(page), cards: cardsRes.data || [] }
}

// Every entry, newest first, with every topic it's filed under (no primary)
export async function getAllEntries(pages) {
  const [entriesRes, topicsRes] = await Promise.all([
    supabase.from('entries').select('*').order('published_at', { ascending: false }),
    supabase.from('entry_topics').select('entry_id, page_id'),
  ])
  if (entriesRes.error) throw new Error(`Failed to fetch entries: ${entriesRes.error.message}`)
  if (topicsRes.error) throw new Error(`Failed to fetch entry topics: ${topicsRes.error.message}`)
  const pageMap = Object.fromEntries(pages.map(p => [p.id, p]))
  const membership = {}
  for (const t of topicsRes.data) (membership[t.entry_id] ||= []).push(pageMap[t.page_id])

  return entriesRes.data.map(e => shapeEntry(e, (membership[e.id] || []).filter(Boolean)))
}

function shapeEntry(e, topics) {
  return {
    id: e.id,
    slug: e.slug,
    title: e.title,
    summary: e.summary,
    body: e.body,
    publishedAt: e.published_at,
    year: new Date(e.published_at).getUTCFullYear(),
    image: e.image_url ? { url: e.image_url, alt: e.image_alt || '', caption: e.image_caption || '' } : null,
    youtube: e.youtube_id ? { id: e.youtube_id, title: e.youtube_title || e.title } : null,
    topics,
  }
}

// Single entry by slug — URL is /<slug>
export async function getEntry(slug) {
  const { data: entry } = await supabase.from('entries').select('*').eq('slug', slug).single()
  if (!entry) return null
  const { data: rows } = await supabase.from('entry_topics').select('pages(id, slug, title, kicker)').eq('entry_id', entry.id)
  return shapeEntry(entry, (rows || []).map(r => r.pages).filter(Boolean))
}

// Every entry slug — for generateStaticParams
export async function getAllEntryPaths() {
  const { data } = await supabase.from('entries').select('slug')
  return (data || []).map(e => e.slug)
}

export function getRecent(pages, limit = 4) {
  return [...pages].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, limit)
}
