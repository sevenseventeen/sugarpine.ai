'use client'
import { Eyebrow } from './ui.jsx'
import { useShell } from './ShellContext.jsx'

function EntryFooter() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", marginTop: 56, paddingTop: 22, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Living document · Revisit often</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>© 2026 Sugarpine</span>
    </div>
  )
}

export default function EntryView({ entry, page }) {
  const { onNavigate, onSubscribe, pages } = useShell()

  // Get the full page object from context (has id, for subscribe modal)
  const fullPage = pages.find(p => p.slug === page.slug) || page

  const date = new Date(entry.published_at).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  })

  const paragraphs = (entry.body || '').split('\n\n').filter(Boolean)

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "clamp(28px, 5vw, 60px) clamp(20px, 5vw, 56px) 48px" }}>

      {/* Back to topic */}
      <button
        onClick={() => onNavigate(page.slug)}
        style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: 0, marginBottom: 26 }}
      >
        ← {page.title}
      </button>

      <Eyebrow style={{ marginBottom: 14 }}>{page.kicker}</Eyebrow>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)", marginBottom: 14, letterSpacing: "0.04em" }}>{date}</div>

      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(28px, 4.5vw, 42px)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 28px", color: "var(--text)", textWrap: "balance" }}>
        {entry.title}
      </h1>

      <div style={{ borderBottom: "1px solid var(--border)", marginBottom: 32 }} />

      {/* Summary as lede */}
      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(17px, 2.2vw, 20px)", lineHeight: 1.55, color: "var(--text)", margin: "0 0 28px", textWrap: "pretty" }}>
        {entry.summary}
      </p>

      {/* Full body */}
      {paragraphs.map((para, i) => (
        <p key={i} style={{ fontSize: 16.5, lineHeight: 1.75, color: "var(--text-dim)", margin: "0 0 22px", textWrap: "pretty" }}>
          {para}
        </p>
      ))}

      {/* Subscribe band */}
      <div style={{ marginTop: 48, border: "1px solid var(--border)", borderRadius: 14, padding: "22px 24px", background: "var(--bg-elev)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500, color: "var(--text)", marginBottom: 4 }}>Follow {page.title}</div>
          <div style={{ color: "var(--text-dim)", fontSize: 13.5 }}>Get an email when this topic is updated.</div>
        </div>
        <button
          onClick={() => onSubscribe(fullPage)}
          style={{ padding: "10px 20px", borderRadius: 9, border: "none", cursor: "pointer", background: "var(--accent)", color: "var(--accent-on)", fontSize: 13.5, fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}
        >
          Subscribe
        </button>
      </div>

      <EntryFooter />
    </div>
  )
}
