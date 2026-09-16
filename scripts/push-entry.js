// Push one entry from seed.js to the database — the daily-cadence alternative
// to a full reseed. Edit seed.js, then:
//   node scripts/push-entry.js <slug>          (dev)
//   node scripts/push-entry.js <slug> --prod   (prod)

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const args = process.argv.slice(2)
const del = args.includes('--delete')
const slug = args.find(a => !a.startsWith('--'))
if (!slug) { console.error('Usage: node scripts/push-entry.js <slug> [--prod] [--delete]'); process.exit(1) }
const isProd = process.argv.includes('--prod')
const env = Object.fromEntries(
  readFileSync(isProd ? '.env.prod' : '.env.local', 'utf8').split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => [l.split('=')[0], l.split('=').slice(1).join('=')])
)
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, { auth: { autoRefreshToken: false, persistSession: false } })

// --delete: take an entry down (memberships cascade)
if (del) {
  const { data, error } = await supabase.from('entries').delete().eq('slug', slug).select('slug')
  if (error) { console.error('✗', error.message); process.exit(1) }
  console.log(data.length ? `✓ ${isProd ? 'PROD' : 'dev'}: deleted ${slug}` : `– no entry with slug "${slug}"`)
  process.exit(0)
}

// Read ENTRIES out of seed.js without running the seed
const src = readFileSync(new URL('./seed.js', import.meta.url), 'utf8')
const start = src.indexOf('const ENTRIES = [')
const ENTRIES = eval(src.slice(start, src.indexOf('\n]\n', start) + 2).replace('const ENTRIES = ', ''))
const entry = ENTRIES.find(e => e.slug === slug)
if (!entry) { console.error(`No entry with slug "${slug}" in seed.js`); process.exit(1) }

const { data: pages } = await supabase.from('pages').select('id, slug')
const slugToId = Object.fromEntries(pages.map(p => [p.slug, p.id]))
const { topics, ...row } = entry
const pageIds = topics.map(t => slugToId[t])
if (pageIds.some(id => !id)) { console.error('Unknown topic in', topics); process.exit(1) }

const { data, error } = await supabase.from('entries')
  .upsert({ ...row, updated_at: row.published_at }, { onConflict: 'slug' })
  .select('id').single()
if (error) { console.error('✗', error.message); process.exit(1) }

await supabase.from('entry_topics').delete().eq('entry_id', data.id)
const { error: tErr } = await supabase.from('entry_topics').insert(pageIds.map(page_id => ({ entry_id: data.id, page_id })))
if (tErr) { console.error('✗ topics:', tErr.message); process.exit(1) }
console.log(`✓ ${isProd ? 'PROD' : 'dev'}: ${slug} → ${topics.join(', ')}`)
