// Compose the latest entries into a newsletter issue, create a beehiiv DRAFT,
// and send a test copy to Josh. Never emails the subscriber list — publishing
// is a deliberate click in beehiiv.
//
//   node scripts/send-issue.js            (dev db)
//   node scripts/send-issue.js --prod     (prod db)
//   node scripts/send-issue.js --prod --count 3
//   node scripts/send-issue.js --prod --slugs a-slug,b-slug
//
// Prefer --slugs: the pipeline should send exactly what it published this run,
// which is not always the newest N by date (an older-dated entry can be
// published today, and a newer one may already have gone out).
//
// If beehiiv rejects the request (most likely when the Max trial lapses and
// the posts API goes 4xx), this still writes the issue HTML to the digests
// folder so it can be pasted into beehiiv by hand, and exits 0.

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { composeIssue } from '../lib/newsletter.js'

const args = process.argv.slice(2)
const isProd = args.includes('--prod')
const countArg = args.indexOf('--count')
const COUNT = countArg > -1 ? Number(args[countArg + 1]) : 3
const slugsArg = args.indexOf('--slugs')
const SLUGS = slugsArg > -1 ? String(args[slugsArg + 1] || '').split(',').map((s) => s.trim()).filter(Boolean) : null
const TEST_RECIPIENT = 'josh@seven-seventeen.com'
const DIGESTS = '/Users/josh-knight/Documents/life-os/knowledge-base/projects/sugarpine/digests'

const env = Object.fromEntries(
  readFileSync(isProd ? '.env.prod' : '.env.local', 'utf8').split('\n')
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => [l.split('=')[0], l.split('=').slice(1).join('=')]),
)

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Newest entries, with the topics they're filed under
const entryQuery = SLUGS
  ? supabase.from('entries').select('*').in('slug', SLUGS)
  : supabase.from('entries').select('*').order('published_at', { ascending: false }).limit(COUNT)

const [{ data: pages }, { data: rows }, { data: links }] = await Promise.all([
  supabase.from('pages').select('id, slug, title'),
  entryQuery,
  supabase.from('entry_topics').select('entry_id, page_id'),
])
if (!rows?.length) { console.log('– no entries to send'); process.exit(0) }
if (SLUGS) {
  const missing = SLUGS.filter((s) => !rows.some((r) => r.slug === s))
  if (missing.length) console.log(`⚠ not found, skipping: ${missing.join(', ')}`)
}
// Newest first, whichever way they were selected
rows.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))

const pageById = Object.fromEntries((pages || []).map((p) => [p.id, p]))
const topicsFor = (id) => (links || []).filter((l) => l.entry_id === id).map((l) => pageById[l.page_id]).filter(Boolean)
const entries = rows.map((e) => ({
  slug: e.slug, title: e.title, summary: e.summary,
  publishedAt: e.published_at, topics: topicsFor(e.id),
}))

const { subject, html } = composeIssue(entries)
console.log('subject:', subject)
console.log('entries:', entries.map((e) => e.slug).join(', '))

const saveLocally = (why) => {
  mkdirSync(DIGESTS, { recursive: true })
  const path = `${DIGESTS}/${new Date().toISOString().slice(0, 10)}-issue.html`
  writeFileSync(path, `<!-- Subject: ${subject} -->\n${html}\n`)
  console.log(`⚠ ${why}`)
  console.log(`  Issue saved for manual paste: ${path}`)
}

const API = 'https://api.beehiiv.com/v2'
const auth = { Authorization: `Bearer ${env.BEEHIIV_API_KEY}`, 'Content-Type': 'application/json' }

if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBLICATION_ID) {
  saveLocally('beehiiv not configured')
  process.exit(0)
}

const draftRes = await fetch(`${API}/publications/${env.BEEHIIV_PUBLICATION_ID}/posts`, {
  method: 'POST', headers: auth,
  body: JSON.stringify({ title: subject, status: 'draft', body_content: html }),
})
const draftText = await draftRes.text().catch(() => '')
if (!draftRes.ok) {
  saveLocally(`beehiiv draft failed (${draftRes.status}): ${draftText.slice(0, 200)}`)
  process.exit(0)
}

const draft = JSON.parse(draftText).data
console.log(`✓ draft created: ${draft.id}`)
console.log(`  preview: ${draft.preview_url}`)

const testRes = await fetch(
  `${API}/publications/${env.BEEHIIV_PUBLICATION_ID}/posts/${draft.id}/test_sends`,
  { method: 'POST', headers: auth, body: JSON.stringify({ recipient_emails: [TEST_RECIPIENT] }) },
)
if (!testRes.ok) {
  const t = await testRes.text().catch(() => '')
  console.log(`⚠ test send failed (${testRes.status}): ${t.slice(0, 200)}`)
} else {
  console.log(`✓ test sent to ${TEST_RECIPIENT}`)
}

console.log('\nTo send to the list: open the preview above and hit Publish.')
