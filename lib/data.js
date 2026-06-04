import { supabase } from './supabase.js'

const TODAY = new Date("2026-06-03")

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

// Normalise a raw Supabase page row into the shape the UI expects
function normalisePage(p) {
  return {
    ...p,
    updated: p.updated_at.split('T')[0],
    readMins: p.read_mins,
    cardsHeading: p.cards_heading,
    youtube: p.youtube_id ? { id: p.youtube_id, title: p.youtube_title } : null,
    sections: (p.sections || []).sort((a, b) => a.position - b.position),
    cards: (p.cards || []).sort((a, b) => a.position - b.position),
    related: (p.related || []).map(r => r.related_id),
  }
}

// Fetch all pages — called server-side at build/request time
export async function getAllPages() {
  const [pagesRes, sectionsRes, cardsRes, relatedRes] = await Promise.all([
    supabase.from('pages').select('*').order('updated_at', { ascending: false }),
    supabase.from('page_sections').select('page_id, position, heading, body'),
    supabase.from('page_cards').select('page_id, position, title, body, note'),
    supabase.from('page_related').select('page_id, related_id'),
  ])

  if (pagesRes.error) throw new Error(`Failed to fetch pages: ${pagesRes.error.message}`)

  return pagesRes.data.map(p => normalisePage({
    ...p,
    sections: sectionsRes.data?.filter(s => s.page_id === p.id) || [],
    cards: cardsRes.data?.filter(c => c.page_id === p.id) || [],
    related: relatedRes.data?.filter(r => r.page_id === p.id) || [],
  }))
}

// Helpers that work on an already-fetched pages array
export function getPrimer(pages) {
  return pages.filter(p => p.group === 'Start here')
}

export function getTopics(pages) {
  return pages.filter(p => p.group === 'Living Landscape')
}

export function getRecent(pages, limit = 4) {
  return [...pages].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, limit)
}

export function findById(pages, id) {
  return pages.find(p => p.id === id) || null
}
