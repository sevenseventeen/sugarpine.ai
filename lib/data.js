import { supabase } from './supabase.js'

const TODAY = new Date("2026-06-05")

export function daysAgo(dateStr) {
  const d = new Date(dateStr)
  return Math.round((TODAY - d) / 86400000)
}

export function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export function relTime(dateStr) {
  const d = daysAgo(dateStr)
  if (d <= 0) return "today"
  if (d === 1) return "yesterday"
  if (d < 7) return d + " days ago"
  if (d < 14) return "last week"
  if (d < 60) return Math.round(d / 7) + " weeks ago"
  return Math.round(d / 30) + " months ago"
}

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

// Full page content for article view — branches by group
export async function getPageContent(slug) {
  const { data: page, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error || !page) return null

  const base = normalisePageMeta(page)
  const relatedRes = await supabase.from('page_related').select('related_id').eq('page_id', page.id)
  const related = (relatedRes.data || []).map(r => r.related_id)

  if (page.group === 'Start here') {
    const [sectionsRes, cardsRes] = await Promise.all([
      supabase.from('page_sections').select('*').eq('page_id', page.id).order('position'),
      supabase.from('page_cards').select('*').eq('page_id', page.id).order('position'),
    ])
    return {
      ...base,
      contentType: 'primer',
      sections: sectionsRes.data || [],
      cards: cardsRes.data || [],
      related,
    }
  } else {
    const [summaryRes, entriesRes] = await Promise.all([
      supabase.from('page_summaries').select('*').eq('page_id', page.id).eq('is_current', true).maybeSingle(),
      supabase.from('entries').select('id, slug, title, summary, published_at').eq('page_id', page.id).order('published_at', { ascending: false }),
    ])
    return {
      ...base,
      contentType: 'landscape',
      currentSummary: summaryRes.data || null,
      entries: entriesRes.data || [],
      related,
    }
  }
}

// Single entry by page slug + entry slug
export async function getEntry(pageSlug, entrySlug) {
  const { data: page } = await supabase
    .from('pages')
    .select('id, slug, title, kicker')
    .eq('slug', pageSlug)
    .single()
  if (!page) return null

  const { data: entry } = await supabase
    .from('entries')
    .select('*')
    .eq('page_id', page.id)
    .eq('slug', entrySlug)
    .single()
  if (!entry) return null

  return { entry, page }
}

// All (page-slug, entry-slug) pairs — for generateStaticParams
export async function getAllEntryPaths() {
  const [entriesRes, pagesRes] = await Promise.all([
    supabase.from('entries').select('slug, page_id'),
    supabase.from('pages').select('id, slug'),
  ])
  const pageMap = Object.fromEntries((pagesRes.data || []).map(p => [p.id, p.slug]))
  return (entriesRes.data || [])
    .filter(e => pageMap[e.page_id])
    .map(e => ({ slug: pageMap[e.page_id], entry: e.slug }))
}

export function getPrimer(pages) { return pages.filter(p => p.group === 'Start here') }
export function getTopics(pages) { return pages.filter(p => p.group === 'Living Landscape') }
export function getRecent(pages, limit = 4) {
  return [...pages].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, limit)
}
export function findBySlug(pages, slug) { return pages.find(p => p.slug === slug) || null }
