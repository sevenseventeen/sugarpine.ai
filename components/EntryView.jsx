'use client'
import { fmtDate } from '../lib/format.js'
import { useShell } from './ShellContext.jsx'
import { YouTubeEmbed } from './ui.jsx'

function EntryFooter() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", marginTop: 56, paddingTop: 22, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Living document · Revisit often</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>© 2026 Sugarpine</span>
    </div>
  )
}

export default function EntryView({ entry }) {
  const { onNavigate, onSubscribeAll } = useShell()

  const topics = entry.topics
  const paragraphs = (entry.body || '').split('\n\n').filter(Boolean)

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "clamp(28px, 5vw, 60px) clamp(20px, 5vw, 56px) 48px" }}>

      <button
        onClick={() => onNavigate("home")}
        style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: 0, marginBottom: 26 }}
      >
        ← Timeline
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", alignItems: "baseline", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        <span style={{ color: "var(--text-faint)" }}>{fmtDate(entry.publishedAt)}</span>
        {topics.map((t) => (
          <button key={t.slug} onClick={() => onNavigate(t.slug)} className="sp-link" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, font: "inherit", letterSpacing: "inherit", textTransform: "inherit", color: "var(--accent)" }}>{t.title}</button>
        ))}
      </div>

      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(28px, 4.5vw, 42px)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 28px", color: "var(--text)", textWrap: "balance" }}>
        {entry.title}
      </h1>

      <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 32 }} />

      {entry.image && (
        <figure style={{ margin: "0 0 32px" }}>
          <div style={{ borderRadius: 15, overflow: "hidden", boxShadow: "var(--shadow-well)" }}>
            <img src={entry.image.url} alt={entry.image.alt} style={{ width: "100%", display: "block" }} />
          </div>
          {entry.image.caption && <figcaption style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--text-faint)" }}>{entry.image.caption}</figcaption>}
        </figure>
      )}

      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(17px, 2.2vw, 20px)", lineHeight: 1.55, color: "var(--text)", margin: "0 0 28px", textWrap: "pretty" }}>
        {entry.summary}
      </p>

      {paragraphs.map((para, i) => (
        <p key={i} style={{ fontSize: 16.5, lineHeight: 1.75, color: "var(--text-dim)", margin: "0 0 22px", textWrap: "pretty" }}>
          {para}
        </p>
      ))}

      {entry.youtube && (
        <div style={{ marginTop: 36 }}>
          <YouTubeEmbed id={entry.youtube.id} title={entry.youtube.title} />
        </div>
      )}

      <div style={{ marginTop: 48, border: "1px solid var(--border)", borderRadius: 14, padding: "22px 24px", background: "var(--bg-elev)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>Follow the timeline</div>
          <div style={{ color: "var(--text-dim)", fontSize: 13.5 }}>Get an email when new entries are added.</div>
        </div>
        <button
          onClick={onSubscribeAll}
          style={{ padding: "10px 20px", borderRadius: 9, border: "none", cursor: "pointer", background: "var(--accent)", color: "var(--accent-on)", fontSize: 13.5, fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}
        >
          Subscribe
        </button>
      </div>

      <EntryFooter />
    </div>
  )
}
