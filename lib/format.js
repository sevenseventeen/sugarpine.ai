// Pure helpers — no database, safe to import from client components.
// Keeping these out of data.js is what stops the Supabase client (and its
// credentials) from being pulled into the browser bundle.

const TODAY = new Date("2026-06-05")

export function daysAgo(dateStr) {
  return Math.round((TODAY - new Date(dateStr)) / 86400000)
}

export function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
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

export function getTopics(pages) { return pages.filter(p => p.group === 'Topics') }
export function findBySlug(pages, slug) { return pages.find(p => p.slug === slug) || null }
