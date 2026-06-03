import { useState } from 'react'
import { PRIMER, TOPICS, recent, byId, fmtDate, relTime } from './data.js'
import { PineMark, Eyebrow, RecencyDot, YouTubeEmbed } from './ui.jsx'

export function LivingFooter() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", marginTop: 56, paddingTop: 22, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-faint)", textTransform: "uppercase" }}>Living document · Revisit often</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>© 2026 Sugarpine</span>
    </div>
  )
}

export function Sidebar({ route, onNavigate, onSubscribeAll, collapsed }) {
  const [q, setQ] = useState("")

  const match = (p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.blurb.toLowerCase().includes(q.toLowerCase())
  const primer = PRIMER.filter(match)
  const topics = TOPICS.filter(match)

  const NavItem = ({ p }) => {
    const active = route.id === p.id
    return (
      <button onClick={() => onNavigate(p.id)} style={{
        display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left",
        padding: "8px 10px", borderRadius: 8, cursor: "pointer", border: "none",
        background: active ? "var(--accent-ghost)" : "transparent",
        color: active ? "var(--text)" : "var(--text-dim)",
        fontSize: 13.5, fontFamily: "var(--font-ui)", lineHeight: 1.3, marginBottom: 1,
        transition: "background .12s, color .12s",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--bg-elev)" }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent" }}>
        <RecencyDot updated={p.updated} />
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: active ? 600 : 400 }}>{p.title}</span>
      </button>
    )
  }

  const GroupLabel = ({ children }) => (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-faint)", padding: "0 10px", margin: "18px 0 8px" }}>{children}</div>
  )

  return (
    <aside style={{
      width: collapsed ? 0 : 268, flexShrink: 0, borderRight: "1px solid var(--border)",
      background: "var(--bg-elev)", height: "100%", overflow: "hidden",
      display: "flex", flexDirection: "column", transition: "width .22s ease",
    }}>
      <div style={{ width: 268, display: "flex", flexDirection: "column", height: "100%" }}>
        <button onClick={() => onNavigate("home")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "20px 18px 16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
          <PineMark size={26} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1 }}>Sugarpine</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-faint)", marginTop: 3 }}>sugarpine.ai</div>
          </div>
        </button>

        <div style={{ padding: "4px 14px 6px" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", fontSize: 13 }}>⌕</span>
            <input
              value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics"
              style={{
                width: "100%", boxSizing: "border-box", padding: "9px 12px 9px 30px", borderRadius: 9,
                border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)",
                fontSize: 13, fontFamily: "var(--font-ui)", outline: "none",
              }}
            />
          </div>
        </div>

        <nav style={{ flex: 1, overflowY: "auto", padding: "2px 8px 8px" }}>
          {primer.length > 0 && <GroupLabel>Start here</GroupLabel>}
          {primer.map((p) => <NavItem key={p.id} p={p} />)}
          {topics.length > 0 && <GroupLabel>Living Landscape</GroupLabel>}
          {topics.map((p) => <NavItem key={p.id} p={p} />)}
          {primer.length === 0 && topics.length === 0 && (
            <div style={{ padding: "20px 12px", color: "var(--text-faint)", fontSize: 13, fontFamily: "var(--font-ui)" }}>No topics match "{q}".</div>
          )}
        </nav>

        <div style={{ padding: 14, borderTop: "1px solid var(--border)" }}>
          <button onClick={onSubscribeAll} style={{
            width: "100%", padding: "11px", borderRadius: 10, border: "none", cursor: "pointer",
            background: "var(--accent)", color: "var(--accent-on)", fontSize: 13.5, fontWeight: 600,
            fontFamily: "var(--font-ui)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap",
          }}>Subscribe to everything</button>
          <p style={{ margin: "10px 2px 0", fontSize: 11, color: "var(--text-faint)", lineHeight: 1.5, textAlign: "center" }}>An independent, reader-funded guide. No ads.</p>
        </div>
      </div>
    </aside>
  )
}

export function HomeView({ onNavigate, onSubscribe, onSubscribeAll }) {
  const feed = recent.slice(0, 4)

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
              cursor: "pointer", color: "inherit", border: "none", borderBottom: "1px solid var(--border)",
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

      <div style={{ marginTop: 56, border: "1px solid var(--border)", borderRadius: 16, padding: "clamp(24px,4vw,38px)", background: "linear-gradient(135deg, var(--accent-ghost), var(--bg-card))", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ maxWidth: 460 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 25, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 8px" }}>Don't check back. Get told.</h2>
          <p style={{ color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>Subscribe to a single topic and hear only when it changes — or follow the whole landscape in one calm email.</p>
        </div>
        <button onClick={onSubscribeAll} style={{ padding: "13px 26px", borderRadius: 11, border: "none", cursor: "pointer", background: "var(--accent)", color: "var(--accent-on)", fontSize: 15, fontWeight: 600, fontFamily: "var(--font-ui)", whiteSpace: "nowrap" }}>Subscribe to everything</button>
      </div>

      <div style={{ marginTop: 56 }}>
        <Eyebrow style={{ marginBottom: 10 }}>From the channel</Eyebrow>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 24, letterSpacing: "-0.01em", color: "var(--text)", margin: "0 0 18px" }}>Watch the explanations</h2>
        <YouTubeEmbed id="aircAruvnKk" title="How AI actually works — the plain-language version" />
      </div>

      <LivingFooter />
    </div>
  )
}

export function ArticleView({ page, onNavigate, onSubscribe }) {
  const related = (page.related || []).map(byId).filter(Boolean)

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
        <div style={{ marginTop: page.sections && page.sections.length ? 46 : 30 }}>
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
