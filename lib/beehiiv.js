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

/**
 * Create a post as a DRAFT. Nothing is emailed. Verified against the API:
 * POST /publications/{id}/posts with { title, status:'draft', body_content }
 * returns 201 { data: { id, preview_url } } and the post reads back status
 * "draft". Requires a Max/Enterprise plan — on lower plans this 4xx's, which
 * the caller treats as "fall back to a manual paste".
 */
export async function createDraftPost({ title, html }) {
  if (!beehiivConfigured()) return { skipped: 'not configured' }

  const res = await fetch(`${API}/publications/${process.env.BEEHIIV_PUBLICATION_ID}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, status: 'draft', body_content: html }),
  })

  const text = await res.text().catch(() => '')
  if (!res.ok) return { ok: false, status: res.status, detail: text.slice(0, 300) }

  let id = null, previewUrl = null
  try {
    const j = JSON.parse(text)
    id = j?.data?.id ?? null
    previewUrl = j?.data?.preview_url ?? null
  } catch {}
  return { ok: true, id, previewUrl }
}

/**
 * Send a draft to specific addresses only — never to the subscriber list.
 * POST /publications/{id}/posts/{postId}/test_sends { recipient_emails: [...] }
 * beehiiv caps these per day and returns the remaining quota.
 */
export async function testSendPost({ postId, recipients }) {
  if (!beehiivConfigured()) return { skipped: 'not configured' }

  const res = await fetch(
    `${API}/publications/${process.env.BEEHIIV_PUBLICATION_ID}/posts/${postId}/test_sends`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient_emails: recipients }),
    },
  )

  const text = await res.text().catch(() => '')
  if (!res.ok) return { ok: false, status: res.status, detail: text.slice(0, 300) }
  let remaining = null
  try { remaining = JSON.parse(text)?.data?.remaining_test_sends ?? null } catch {}
  return { ok: true, remaining }
}
