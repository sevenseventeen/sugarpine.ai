// Composes a Sugarpine issue from freshly published entries.
// Pure — no network. The pipeline renders with this, then either sends it
// through beehiiv or drops the HTML in the digest for a manual paste.
//
// beehiiv sanitises post HTML: <style> and <link> are stripped, inline
// `style` attributes survive. So everything here is styled inline.

const SITE = 'https://sugarpine.ai'

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
})

export function subjectFor(entries) {
  if (!entries.length) return 'Sugarpine'
  if (entries.length === 1) return entries[0].title
  return `${entries[0].title} — and ${entries.length - 1} more`
}

export function composeIssue(entries) {
  const items = entries.map((e) => {
    const url = `${SITE}/${e.slug}`
    const topics = (e.topics || []).map((t) => t.title).join(' · ')
    return `
<div style="margin:0 0 38px;padding:0 0 34px;border-bottom:1px solid #E3E8EF;">
  <div style="font:400 11px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8A93A5;margin:0 0 12px;">
    ${esc(fmtDate(e.publishedAt))}${topics ? ` &nbsp;·&nbsp; ${esc(topics)}` : ''}
  </div>
  <h2 style="margin:0 0 12px;font:500 22px/1.28 Georgia,'Times New Roman',serif;color:#2E3646;letter-spacing:-.01em;">
    <a href="${url}" style="color:#2E3646;text-decoration:none;">${esc(e.title)}</a>
  </h2>
  <p style="margin:0 0 16px;font:400 15.5px/1.62 -apple-system,Segoe UI,sans-serif;color:#525C6E;">
    ${esc(e.summary)}
  </p>
  <a href="${url}" style="font:500 12px/1 -apple-system,Segoe UI,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#A6440A;text-decoration:none;">
    Read the full entry &rarr;
  </a>
</div>`
  }).join('\n')

  const count = entries.length
  const html = `
<div style="max-width:600px;margin:0 auto;padding:8px 0 0;">
  <p style="margin:0 0 30px;font:400 15.5px/1.62 -apple-system,Segoe UI,sans-serif;color:#525C6E;">
    ${count === 1 ? 'One new entry' : `${count} new entries`} on the timeline this week — the AI news that
    mattered, in plain language.
  </p>
  ${items}
  <p style="margin:26px 0 0;font:400 13.5px/1.6 -apple-system,Segoe UI,sans-serif;color:#8A93A5;">
    Sugarpine is a dated, plain-language timeline of the AI era. Every entry is written from inside the
    day it happened, and confirmed against at least two sources.
    <a href="${SITE}" style="color:#A6440A;text-decoration:none;">Browse the full timeline &rarr;</a>
  </p>
</div>`.trim()

  return { subject: subjectFor(entries), html }
}
