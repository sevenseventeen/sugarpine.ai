'use client'
import { relTime, getTopics, getRecent } from '../lib/data.js'
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

export default function HomeView() {
  const { onNavigate, onSubscribe, onSubscribeAll, pages } = useShell()
  const feed = getRecent(pages)
  const TOPICS = getTopics(pages)

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "clamp(28px, 5vw, 64px) clamp(20px, 5vw, 56px) 48px" }}>
      <Eyebrow style={{ marginBottom: 20 }}>An independent, living guide to AI</Eyebrow>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(36px, 6vw, 60px)", lineHeight: 1.04, letterSpacing: "-0.025em", margin: 0, color: "var(--text)", textWrap: "balance" }}>
        Understand AI.<br />Then watch it <span style={{ color: "var(--accent)", fontStyle: "italic" }}>move.</span>
      </h1>
      <p style={{ marginTop: 22, fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.6, color: "var(--text-dim)", maxWidth: 560, textWrap: "pretty" }}>
        Come for the explanations — what AI is, in plain language, with nothing assumed. Stay for the landscape: a set of living pages that track what these systems can actually do, updated as the ground shifts.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
        <button onClick={() => onNavigate("what-is-ai")} style={{ padding: "13px 24px", borderRadius: 11, border: "none", cursor: "pointer", background: "var(--accent)", color: "var(--accent-on)", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-ui)" }}>Start with AI 101 →</button>
        <button onClick={() => onNavigate("text-generation")} style={{ padding: "13px 24px", borderRadius: 11, border: "1px solid var(--border)", cursor: "pointer", background: "transparent", color: "var(--text)", fontSize: 15, fontWeight: 500, fontFamily: "var(--font-ui)" }}>Explore the landscape</button>
      </div>

      {/* Recently updated */}
      <div style={{ marginTop: 64 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 24, letterSpacing: "-0.01em", color: "var(--text)", margin: 0, whiteSpace: "nowrap" }}>Recently updated</h2>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.1em" }}>What changed</span>
        </div>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {feed.map((p) => (
            <button key={p.id} onClick={() => onNavigate(p.id)} style={{
              display: "flex", alignItems: "center", gap: 16, width: "100%", textAlign: "left",
              padding: "16px 4px", borderBottom: "1px solid var(--border)", background: "transparent",
              cursor: "pointer", color: "inherit", border: "none",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elev)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              <RecencyDot updated={p.updated} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500, color: "var(--text)" }}>{p.title}</div>
                <div style={{ fontSize: 13.5, color: "var(--text-dim)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.blurb}</div>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-faint)", flexShrink: 0, whiteSpace: "nowrap" }}>{relTime(p.updated)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topic grid */}
      <div style={{ marginTop: 56 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 24, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 4px" }}>The living landscape</h2>
        <p style={{ color: "var(--text-dim)", fontSize: 14.5, margin: "0 0 22px" }}>Each page is maintained over time. Subscribe to any one, or to all of it.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))", gap: 14 }}>
          {TOPICS.map((p) => (
            <div key={p.id} onClick={() => onNavigate(p.id)} style={{
              border: "1px solid var(--border)", borderRadius: 13, padding: "18px 18px 16px",
              background: "var(--bg-card)", cursor: "pointer", display: "flex", flexDirection: "column",
              transition: "border-color .15s, transform .15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)" }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--text)", margin: 0, letterSpacing: "-0.01em" }}>{p.title}</h3>
                <RecencyDot updated={p.updated} />
              </div>
              <p style={{ fontSize: 13.5, color: "var(--text-dim)", lineHeight: 1.55, margin: "0 0 14px", flex: 1, textWrap: "pretty" }}>{p.blurb}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Updated {relTime(p.updated)}</span>
                <button onClick={(e) => { e.stopPropagation(); onSubscribe(p) }} style={{
                  fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 600, color: "var(--accent)",
                  background: "transparent", border: "none", cursor: "pointer", padding: "2px 0",
                }}>+ Subscribe</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe band */}
      <div style={{ marginTop: 56, border: "1px solid var(--border)", borderRadius: 16, padding: "clamp(24px,4vw,38px)", background: "linear-gradient(135deg, var(--accent-ghost), var(--bg-card))", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ maxWidth: 460 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 25, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 8px" }}>Don't check back. Get told.</h2>
          <p style={{ color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>Subscribe to a single topic and hear only when it changes — or follow the whole landscape in one calm email.</p>
        </div>
        <button onClick={onSubscribeAll} style={{ padding: "13px 26px", borderRadius: 11, border: "none", cursor: "pointer", background: "var(--accent)", color: "var(--accent-on)", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>Subscribe to everything</button>
      </div>

      {/* YouTube band */}
      <div style={{ marginTop: 56 }}>
        <Eyebrow style={{ marginBottom: 10 }}>From the channel</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 24, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 18px" }}>Watch the explanations</h2>
        <YouTubeEmbed id="aircAruvnKk" title="How AI actually works — the plain-language version" />
      </div>

      <LivingFooter />
    </div>
  )
}
