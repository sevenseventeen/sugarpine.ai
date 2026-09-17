import { getAllPages, getAllEntries } from '../../lib/data.js'

// RSS 2.0 feed at /feed.xml — readable in any RSS reader, and the input
// beehiiv's External RSS feature pulls from to build a newsletter issue.
// Kept in step with the timeline pages so a new entry shows up everywhere at once.
export const revalidate = 300

const SITE = 'https://sugarpine.ai'
const LIMIT = 30

const cdata = (s) => `<![CDATA[${String(s ?? '').replace(/]]>/g, ']]]]><![CDATA[>')}]]>`

// Body is stored as plain text with blank lines between paragraphs
const bodyToHtml = (body) =>
  String(body ?? '')
    .split('\n\n')
    .map((p) => `<p>${p.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
    .join('\n')

export async function GET() {
  const pages = await getAllPages()
  const entries = (await getAllEntries(pages)).slice(0, LIMIT)

  const items = entries.map((e) => {
    const url = `${SITE}/${e.slug}`
    const html = `${bodyToHtml(e.body)}\n<p><a href="${url}">Read this entry on Sugarpine</a></p>`
    return `    <item>
      <title>${cdata(e.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(e.publishedAt).toUTCString()}</pubDate>
      <description>${cdata(e.summary)}</description>
      <content:encoded>${cdata(html)}</content:encoded>
${e.topics.map((t) => `      <category>${cdata(t.title)}</category>`).join('\n')}
    </item>`
  })

  const latest = entries[0] ? new Date(entries[0].publishedAt).toUTCString() : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sugarpine</title>
    <link>${SITE}</link>
    <description>A plain-language, dated timeline of the AI era — written so anyone can follow it.</description>
    <language>en-us</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
