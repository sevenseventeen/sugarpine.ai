'use client'
import { fmtDate } from '../lib/format.js'
import { useShell } from './ShellContext.jsx'
import { YouTubeEmbed, PineMark } from './ui.jsx'

// One reading size for the whole piece — the summary is just the first paragraph.
const PROSE = { fontFamily: "var(--font-display)", fontSize: "clamp(17px, 2.2vw, 20px)", lineHeight: 1.6, color: "var(--text)", margin: "0 0 26px", textWrap: "pretty" }

export default function EntryView({ entry }) {
  const { onNavigate, onSubscribeAll } = useShell()

  const topics = entry.topics
  const paragraphs = (entry.body || '').split('\n\n').filter(Boolean)

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "clamp(4px, 2vw, 20px) 0 24px" }}>

      <button
        onClick={() => onNavigate("home")}
        style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: 0, marginBottom: 26 }}
      >
        ← Timeline
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", alignItems: "baseline", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        <span style={{ color: "var(--text-faint)" }}>{fmtDate(entry.publishedAt)}</span>
        {topics.map((t) => (
          <button key={t.slug} onClick={() => onNavigate(t.slug)} className="sp-link" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, font: "inherit", letterSpacing: "inherit", textTransform: "inherit" }}>{t.title}</button>
        ))}
      </div>

      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(28px, 4.5vw, 42px)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 28px", color: "var(--ink)", textWrap: "balance" }}>
        {entry.title}
      </h1>

      <div style={{ height: 1, marginBottom: 32, boxShadow: "var(--shadow-rule)" }} />

      {entry.image && (
        <figure style={{ margin: "0 0 32px" }}>
          <div style={{ borderRadius: 15, overflow: "hidden", boxShadow: "var(--shadow-well)" }}>
            <img src={entry.image.url} alt={entry.image.alt} style={{ width: "100%", display: "block" }} />
          </div>
          {entry.image.caption && <figcaption style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--text-faint)" }}>{entry.image.caption}</figcaption>}
        </figure>
      )}

      <p style={PROSE}>{entry.summary}</p>

      {paragraphs.map((para, i) => (
        <p key={i} style={PROSE}>{para}</p>
      ))}

      {entry.youtube && (
        <div style={{ marginTop: 36 }}>
          <YouTubeEmbed id={entry.youtube.id} title={entry.youtube.title} />
        </div>
      )}

      {/* End mark */}
      <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", margin: "44px 0 48px" }}>
        <PineMark size={28} color="var(--text-faint)" />
      </div>

      <div className="sp-card" style={{ padding: "22px 24px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500, color: "var(--ink)", marginBottom: 4 }}>Follow the timeline</div>
          <div style={{ color: "var(--text-dim)", fontSize: 13.5 }}>Get an email when new entries are added.</div>
        </div>
        <button className="sp-btn-primary" onClick={onSubscribeAll} style={{ display: "inline-block", width: "auto", padding: "13px 22px", borderRadius: 12 }}>Subscribe</button>
      </div>

      <div style={{ marginTop: 40, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", color: "var(--text-faint)" }}>© 2026 Sugarpine</div>
    </div>
  )
}
