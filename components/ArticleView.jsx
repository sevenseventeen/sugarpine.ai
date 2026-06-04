'use client'
import { findById, fmtDate, relTime } from '../lib/data.js'
import { Eyebrow, RecencyDot, YouTubeEmbed } from './ui.jsx'
import { useShell } from './ShellContext.jsx'

function LivingFooter() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", marginTop: 56, paddingTop: 22, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Living document · Revisit often</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>© 2026 Sugarpine</span>
    </div>
  )
}

export default function ArticleView({ page }) {
  const { onNavigate, onSubscribe, pages } = useShell()
  const related = (page.related || []).map(id => findById(pages, id)).filter(Boolean)

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "clamp(28px, 5vw, 60px) clamp(20px, 5vw, 56px) 48px" }}>
      <button onClick={() => onNavigate("home")} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: 0, marginBottom: 26, whiteSpace: "nowrap" }}>← Home</button>

      <Eyebrow style={{ marginBottom: 16 }}>{page.kicker}</Eyebrow>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.06, letterSpacing: "-0.025em", margin: 0, color: "var(--text)", textWrap: "balance" }}>{page.title}</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", margin: "22px 0 0", paddingBottom: 26, borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <RecencyDot updated={page.updated} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>Updated {fmtDate(page.updated)}</span>
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)" }}>· {page.readMins} min read</span>
        </div>
        <button onClick={() => onSubscribe(page)} style={{ padding: "9px 18px", borderRadius: 9, border: "1px solid var(--accent)", cursor: "pointer", background: "var(--accent-ghost)", color: "var(--accent)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>Subscribe to this page</button>
      </div>

      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2.4vw, 22px)", lineHeight: 1.5, color: "var(--text)", margin: "30px 0 8px", textWrap: "pretty" }}>{page.lede}</p>

      {(page.sections || []).map((s, i) => (
        <section key={i} style={{ marginTop: 34 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 10px" }}>{s.heading}</h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.72, color: "var(--text-dim)", margin: 0, textWrap: "pretty" }}>{s.body}</p>
        </section>
      ))}

      {page.cards && page.cards.length > 0 && (
        <div style={{ marginTop: page.sections?.length ? 46 : 30 }}>
          <Eyebrow style={{ marginBottom: 16 }}>{page.cardsHeading || "In detail"}</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
            {page.cards.map((c, i) => (
              <div key={i} style={{
                border: "1px solid var(--border)", borderRadius: 13, padding: "20px 20px 18px",
                background: "var(--bg-card)", display: "flex", flexDirection: "column", transition: "border-color .15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17.5, fontWeight: 600, color: "var(--text)", margin: "0 0 10px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.62, margin: "0 0 14px", flex: 1, textWrap: "pretty" }}>{c.body}</p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 11 }}>
                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 13.5, color: "var(--accent)", lineHeight: 1.45, margin: 0 }}>{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {page.youtube && (
        <div style={{ marginTop: 42 }}>
          <Eyebrow style={{ marginBottom: 12 }}>Watch</Eyebrow>
          <YouTubeEmbed id={page.youtube.id} title={page.youtube.title} />
        </div>
      )}

      <div style={{ marginTop: 44, border: "1px solid var(--border)", borderRadius: 14, padding: "22px 24px", background: "var(--bg-elev)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.5 }}>This page is maintained. <span style={{ color: "var(--text)" }}>Get an email when it changes.</span></span>
        <button onClick={() => onSubscribe(page)} style={{ padding: "10px 20px", borderRadius: 9, border: "none", cursor: "pointer", background: "var(--accent)", color: "var(--accent-on)", fontSize: 13.5, fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>Subscribe</button>
      </div>

      {related.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <Eyebrow style={{ marginBottom: 14 }}>Related</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 }}>
            {related.map((r) => (
              <button key={r.id} onClick={() => onNavigate(r.id)} style={{
                textAlign: "left", border: "1px solid var(--border)", borderRadius: 11, padding: "14px 16px",
                background: "var(--bg-card)", cursor: "pointer",
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 15.5, fontWeight: 500, color: "var(--text)", marginBottom: 3 }}>{r.title}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Updated {relTime(r.updated)}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <LivingFooter />
    </div>
  )
}
