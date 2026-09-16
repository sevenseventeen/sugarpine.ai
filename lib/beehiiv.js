// beehiiv — list management and delivery.
// Server-only. Degrades quietly: if the credentials aren't set, or beehiiv is
// down, a signup still lands in Supabase and this returns { skipped } or
// { ok: false } rather than throwing. Losing a subscriber is worse than
// losing a sync.

const API = 'https://api.beehiiv.com/v2'

export function beehiivConfigured() {
  return Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID)
}

/**
 * Create or update a beehiiv subscriber.
 * `topics` is the list of section slugs they chose ('all' for everything);
 * it's stored as one comma-separated custom field so beehiiv segments can
 * match on "topics contains science".
 */
export async function upsertSubscriber({ email, topics = [], frequency = 'instant' }) {
  if (!beehiivConfigured()) return { skipped: 'not configured' }

  const res = await fetch(`${API}/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      reactivate_existing: true,
      send_welcome_email: true,
      utm_source: 'sugarpine.ai',
      custom_fields: [
        { name: 'topics', value: topics.join(',') },
        { name: 'frequency', value: frequency },
      ],
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return { ok: false, status: res.status, detail: detail.slice(0, 300) }
  }
  return { ok: true }
}
