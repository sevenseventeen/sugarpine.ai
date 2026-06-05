'use client'
import { fmtDate, relTime } from '../lib/data.js'
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

// ── Primer layout (Start here pages) ─────────────────────────────────────────

function PrimerContent({ page, onSubscribe }) {
  return (
    <>
      {(page.sections || []).map((s, i) => (
        <section key={i} style={{ marginTop: 34 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 10px" }}>{s.heading}</h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.72, color: "var(--text-dim)", margin: 0, textWrap: "pretty" }}>{s.body}</p>
        </section>
      ))}

      {page.cards?.length > 0 && (
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

      <SubscribeBand page={page} onSubscribe={onSubscribe} />
    </>
  )
}

// ── Landscape layout (Living Landscape pages) ─────────────────────────────────

function SummaryBlock({ summary }) {
  if (!summary) return null
  return (
    <div style={{ marginTop: 36, border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 20px", background: "var(--bg-elev)", borderBottom: "1px solid var(--border)" }}>
        <Eyebrow>State of the Art</Eyebrow>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.06em" }}>{summary.period}</span>
      </div>
      <div style={{ padding: "22px 20px 24px", display: "flex", flexDirection: "column", gap: 24 }}>
        {summary.today && (
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 8 }}>Today</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--text-dim)", margin: 0, textWrap: "pretty" }}>{summary.today}</p>
          </div>
        )}
        {summary.near_future && (
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 8 }}>Looking ahead</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--text-dim)", margin: 0, textWrap: "pretty" }}>{summary.near_future}</p>
          </div>
        )}
        {summary.bold_visions && (
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 8 }}>Bold visions</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--text-dim)", margin: 0, textWrap: "pretty" }}>{summary.bold_visions}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function EntryRow({ entry, pageSlug, onNavigate }) {
  const date = new Date(entry.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  return (
    <div style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", letterSpacing: "0.04em", flexShrink: 0 }}>{date}</span>
        <button
          onClick={() => onNavigate(`${pageSlug}/${entry.slug}`)}
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
        >
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--text)",
            letterSpacing: "-0.01em", lineHeight: 1.2, textDecoration: "none",
            borderBottom: "1px solid transparent", transition: "border-color .12s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}>
            {entry.title}
          </span>
        </button>
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--text-dim)", margin: "0 0 10px", textWrap: "pretty" }}>{entry.summary}</p>
      <button
        onClick={() => onNavigate(`${pageSlug}/${entry.slug}`)}
        style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.01em" }}
      >
        Full story →
      </button>
    </div>
  )
}

function LandscapeContent({ page, onNavigate, onSubscribe }) {
  return (
    <>
      <SummaryBlock summary={page.currentSummary} />

      {page.entries.length > 0 && (
        <div style={{ marginTop: 52 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 2 }}>
            <Eyebrow>The Record</Eyebrow>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-faint)", letterSpacing: "0.06em" }}>{page.entries.length} {page.entries.length === 1 ? "entry" : "entries"}</span>
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {page.entries.map((e) => (
              <EntryRow key={e.id} entry={e} pageSlug={page.slug} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}

      {page.youtube && (
        <div style={{ marginTop: 48 }}>
          <Eyebrow style={{ marginBottom: 12 }}>Watch</Eyebrow>
          <YouTubeEmbed id={page.youtube.id} title={page.youtube.title} />
        </div>
      )}

      <SubscribeBand page={page} onSubscribe={onSubscribe} />
    </>
  )
}

// ── Shared ────────────────────────────────────────────────────────────────────

function SubscribeBand({ page, onSubscribe }) {
  return (
    <div style={{ marginTop: 44, border: "1px solid var(--border)", borderRadius: 14, padding: "22px 24px", background: "var(--bg-elev)", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.5 }}>This page is maintained. <span style={{ color: "var(--text)" }}>Get an email when it changes.</span></span>
      <button onClick={() => onSubscribe(page)} style={{ padding: "10px 20px", borderRadius: 9, border: "none", cursor: "pointer", background: "var(--accent)", color: "var(--accent-on)", fontSize: 13.5, fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>Subscribe</button>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ArticleView({ page }) {
  const { onNavigate, onSubscribe, pages } = useShell()
  const related = (page.related || []).map(id => pages.find(p => p.id === id)).filter(Boolean)

  return (
    <div style={{ maxWidth: 740, margin: "0 auto", padding: "clamp(28px, 5vw, 60px) clamp(20px, 5vw, 56px) 48px" }}>
      <button onClick={() => onNavigate("home")} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", padding: 0, marginBottom: 26 }}>← Home</button>

      <Eyebrow style={{ marginBottom: 16 }}>{page.kicker}</Eyebrow>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.06, letterSpacing: "-0.025em", margin: 0, color: "var(--text)", textWrap: "balance" }}>{page.title}</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", margin: "22px 0 0", paddingBottom: 26, borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <RecencyDot updated={page.updated} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>Updated {fmtDate(page.updated)}</span>
          </span>
          {page.readMins && <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)" }}>· {page.readMins} min read</span>}
        </div>
        <button onClick={() => onSubscribe(page)} style={{ padding: "9px 18px", borderRadius: 9, border: "1px solid var(--accent)", cursor: "pointer", background: "var(--accent-ghost)", color: "var(--accent)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>Subscribe to this page</button>
      </div>

      {page.lede && (
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(17px, 2.2vw, 21px)", lineHeight: 1.55, color: "var(--text)", margin: "28px 0 0", textWrap: "pretty" }}>{page.lede}</p>
      )}

      {page.contentType === 'primer'
        ? <PrimerContent page={page} onSubscribe={onSubscribe} />
        : <LandscapeContent page={page} onNavigate={onNavigate} onSubscribe={onSubscribe} />
      }

      {related.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <Eyebrow style={{ marginBottom: 14 }}>Related</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12 }}>
            {related.map((r) => (
              <button key={r.id} onClick={() => onNavigate(r.slug)} style={{
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
