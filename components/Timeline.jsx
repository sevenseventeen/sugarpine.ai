'use client'
import Link from 'next/link'
import { fmtDate } from '../lib/format.js'
import { useShell } from './ShellContext.jsx'

const META = { font: "400 10px/1 var(--font-mono)", letterSpacing: ".17em", textTransform: "uppercase", color: "var(--text-dim)" }
const TAG = { font: "500 10px/1 var(--font-ui)", letterSpacing: ".17em", textTransform: "uppercase" }

function EntryCard({ entry }) {
  const href = `/${entry.slug}`
  return (
    <article className="sp-card" style={{ padding: 12 }}>
      {entry.image && (
        <div style={{ height: 260, borderRadius: 15, overflow: "hidden", marginBottom: 4, boxShadow: "var(--shadow-well)" }}>
          <img src={entry.image.url} alt={entry.image.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      )}
      <div style={{ padding: "12px 18px 12px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 10 }}>
          <span style={{ ...META, whiteSpace: "nowrap" }}>{fmtDate(entry.publishedAt)}</span>
          <span style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {entry.topics.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`} className="sp-link" style={TAG}>{t.title}</Link>
            ))}
          </span>
        </div>
        <h2 style={{ margin: "0 0 8px", font: "300 21px/1.3 var(--font-ui)", letterSpacing: ".005em", textWrap: "pretty", maxWidth: "40ch" }}>
          <Link href={href} className="sp-headline">{entry.title}</Link>
        </h2>
        <p style={{ margin: "0 0 16px", font: "300 14px/1.65 var(--font-ui)", color: "var(--text-dim)", textWrap: "pretty", maxWidth: "70ch" }}>{entry.summary}</p>
        <Link href={href} className="sp-btn" style={{ padding: "10px 20px", borderRadius: 11 }}>Read more</Link>
      </div>
    </article>
  )
}

// The home feed and every topic page: one dated list, newest first.
// `section` scopes it to one nav section; omit it for everything.
export default function Timeline({ section }) {
  const { entries, timeline } = useShell()
  const { from, to, reset } = timeline
  const range = from === to ? String(from) : `${from}–${to}`

  const scoped = section ? entries.filter((e) => e.topics.some((t) => t.slug === section.slug)) : entries
  const visible = scoped.filter((e) => e.year >= from && e.year <= to)
  const count = visible.length
  const title = section ? section.label : "All Topics"

  return (
    <div style={{ maxWidth: 1000 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, padding: "0 4px 22px", marginBottom: 26, boxShadow: "var(--shadow-rule)" }}>
        <h1 style={{ margin: 0, font: "italic 300 32px/1 var(--font-display)", letterSpacing: ".005em", color: "var(--ink)" }}>{title}</h1>
        <span aria-live="polite" style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-dim)", whiteSpace: "nowrap" }}>
          {count} {count === 1 ? "entry" : "entries"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {count === 0 && (
          <div className="sp-card" style={{ padding: "48px 34px 44px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <p style={{ margin: 0, font: "300 17px/1.6 var(--font-ui)", letterSpacing: ".01em", color: "var(--text-dim)", textAlign: "center", maxWidth: "42ch" }}>
              {scoped.length === 0
                ? `Nothing filed under ${title} yet. This corner of the landscape is still being written.`
                : `Nothing filed under ${title} in ${range}.`}
            </p>
            {scoped.length > 0 && <button className="sp-btn" onClick={reset} style={{ padding: "10px 22px", borderRadius: 11 }}>Clear filters</button>}
          </div>
        )}
        {visible.map((e) => (
          <EntryCard key={e.id} entry={e} />
        ))}
      </div>
    </div>
  )
}
