'use client'
import { useState, useEffect, useRef } from 'react'
import { daysAgo, relTime, ALL } from '../lib/data.js'

export function PineMark({ size = 26, color = "var(--accent)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <polygon points="24,4 35,20 13,20" fill={color} />
      <polygon points="24,15 38,32 10,32" fill={color} />
      <polygon points="24,26 41,44 7,44" fill={color} />
      <rect x="22" y="42" width="4" height="5" fill={color} opacity="0.55" />
    </svg>
  )
}

export function Eyebrow({ children, style }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.18em",
      textTransform: "uppercase", color: "var(--accent)", ...style,
    }}>{children}</div>
  )
}

export function RecencyDot({ updated, withLabel }) {
  const d = daysAgo(updated)
  const fresh = d <= 7
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
      <span style={{
        width: 7, height: 7, borderRadius: 99, flexShrink: 0,
        background: fresh ? "var(--accent)" : "var(--text-faint)",
        boxShadow: fresh ? "0 0 0 3px var(--accent-ghost)" : "none",
      }} />
      {withLabel && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: fresh ? "var(--accent)" : "var(--text-faint)", letterSpacing: "0.02em" }}>
          {relTime(updated)}
        </span>
      )}
    </span>
  )
}

// Checkbox row for a single page
function PageCheckbox({ page, checked, onChange }) {
  return (
    <label onClick={() => onChange(!checked)} style={{
      display: "flex", alignItems: "center", gap: 12, padding: "9px 12px",
      borderRadius: 9, cursor: "pointer", transition: "background .12s",
      background: checked ? "var(--accent-ghost)" : "transparent",
    }}
    onMouseEnter={(e) => { if (!checked) e.currentTarget.style.background = "var(--bg-elev)" }}
    onMouseLeave={(e) => { if (!checked) e.currentTarget.style.background = "transparent" }}>
      <div style={{
        width: 18, height: 18, borderRadius: 5, flexShrink: 0, cursor: "pointer",
        border: `2px solid ${checked ? "var(--accent)" : "var(--border)"}`,
        background: checked ? "var(--accent)" : "transparent",
        display: "grid", placeItems: "center", transition: "all .12s",
      }}>
        {checked && <span style={{ color: "var(--accent-on)", fontSize: 11, lineHeight: 1, fontWeight: 700 }}>✓</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 13.5, fontWeight: checked ? 600 : 400, color: "var(--text)", lineHeight: 1.2 }}>{page.title}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{page.group}</div>
      </div>
      <RecencyDot updated={page.updated} />
    </label>
  )
}

export function SubscribeModal({ open, target, onClose }) {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [freq, setFreq] = useState("instant")
  const [selected, setSelected] = useState({})
  const inputRef = useRef(null)

  // When modal opens: pre-select the target page (or nothing if "subscribe all" button)
  useEffect(() => {
    if (open) {
      setDone(false); setEmail(""); setFreq("instant")
      const initial = {}
      if (target) initial[target.id] = true
      setSelected(initial)
      setTimeout(() => inputRef.current && inputRef.current.focus(), 60)
    }
  }, [open, target])

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose() }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const selectedIds = Object.keys(selected).filter(id => selected[id])
  const allSelected = selectedIds.length === ALL.length
  const noneSelected = selectedIds.length === 0
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && !noneSelected

  const toggleAll = () => {
    if (allSelected) {
      setSelected({})
    } else {
      setSelected(Object.fromEntries(ALL.map(p => [p.id, true])))
    }
  }

  const scopeLabel = allSelected
    ? "all of Sugarpine"
    : selectedIds.length === 1
      ? ALL.find(p => p.id === selectedIds[0])?.title
      : `${selectedIds.length} topics`

  return (
    <div onMouseDown={onClose} style={{
      position: "fixed", inset: 0, zIndex: 60, display: "grid", placeItems: "center",
      background: "color-mix(in srgb, var(--bg) 62%, transparent)", backdropFilter: "blur(6px)", padding: 24,
    }}>
      <div onMouseDown={(e) => e.stopPropagation()} style={{
        width: "min(520px, 100%)", background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: 16, boxShadow: "0 30px 80px -20px rgba(0,0,0,.6)", position: "relative",
        display: "flex", flexDirection: "column", maxHeight: "90vh",
      }}>
        {/* Header */}
        <div style={{ padding: "26px 28px 16px", borderBottom: "1px solid var(--border)" }}>
          <button onClick={onClose} aria-label="Close" style={{
            position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 8,
            border: "1px solid var(--border)", background: "transparent", color: "var(--text-dim)",
            cursor: "pointer", fontSize: 16, lineHeight: 1,
          }}>×</button>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <PineMark size={24} />
            <Eyebrow>Subscribe</Eyebrow>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 22, lineHeight: 1.15, margin: 0, color: "var(--text)", letterSpacing: "-0.01em" }}>
            Choose what to follow
          </h3>
          <p style={{ margin: "6px 0 0", color: "var(--text-dim)", fontSize: 13.5, lineHeight: 1.5 }}>
            Get an email when selected pages change. Pick one topic or follow everything.
          </p>
        </div>

        {!done ? (
          <>
            {/* Page list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px" }}>
              {/* Select all row */}
              <label onClick={toggleAll} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                borderRadius: 9, cursor: "pointer", marginBottom: 4,
                borderBottom: "1px solid var(--border)", paddingBottom: 12, marginBottom: 8,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0, cursor: "pointer",
                  border: `2px solid ${allSelected ? "var(--accent)" : "var(--border)"}`,
                  background: allSelected ? "var(--accent)" : "transparent",
                  display: "grid", placeItems: "center", transition: "all .12s",
                }}>
                  {allSelected && <span style={{ color: "var(--accent-on)", fontSize: 11, lineHeight: 1, fontWeight: 700 }}>✓</span>}
                  {!allSelected && selectedIds.length > 0 && <span style={{ color: "var(--accent)", fontSize: 14, lineHeight: 1 }}>–</span>}
                </div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>
                  Subscribe to everything
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", marginLeft: "auto", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {ALL.length} pages
                </span>
              </label>

              {/* Group: Start here */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", padding: "4px 12px 4px", marginTop: 4 }}>Start here</div>
              {ALL.filter(p => p.group === "Start here").map(p => (
                <PageCheckbox key={p.id} page={p}
                  checked={!!selected[p.id]}
                  onChange={(v) => setSelected(s => ({ ...s, [p.id]: v }))}
                />
              ))}

              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", padding: "8px 12px 4px" }}>Living Landscape</div>
              {ALL.filter(p => p.group === "Living Landscape").map(p => (
                <PageCheckbox key={p.id} page={p}
                  checked={!!selected[p.id]}
                  onChange={(v) => setSelected(s => ({ ...s, [p.id]: v }))}
                />
              ))}
            </div>

            {/* Footer: email + frequency + submit */}
            <div style={{ padding: "16px 28px 24px", borderTop: "1px solid var(--border)" }}>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 8 }}>Email address</label>
              <input
                ref={inputRef} type="email" value={email} placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && valid) setDone(true) }}
                style={{
                  width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10,
                  border: "1px solid var(--border)", background: "var(--bg-elev)", color: "var(--text)",
                  fontSize: 15, fontFamily: "var(--font-ui)", outline: "none",
                }}
              />

              <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 16 }}>
                {[["instant", "As it happens"], ["weekly", "Weekly digest"]].map(([k, lbl]) => (
                  <button key={k} onClick={() => setFreq(k)} style={{
                    flex: 1, padding: "9px 12px", borderRadius: 10, cursor: "pointer",
                    border: "1px solid " + (freq === k ? "var(--accent)" : "var(--border)"),
                    background: freq === k ? "var(--accent-ghost)" : "transparent",
                    color: freq === k ? "var(--accent)" : "var(--text-dim)",
                    fontSize: 13, fontFamily: "var(--font-ui)", fontWeight: 500,
                  }}>{lbl}</button>
                ))}
              </div>

              <button disabled={!valid} onClick={() => setDone(true)} style={{
                width: "100%", padding: "13px", borderRadius: 10, border: "none",
                cursor: valid ? "pointer" : "not-allowed",
                background: valid ? "var(--accent)" : "var(--border)",
                color: valid ? "var(--accent-on)" : "var(--text-faint)",
                fontSize: 15, fontWeight: 600, fontFamily: "var(--font-ui)", transition: "background .15s",
              }}>
                {noneSelected ? "Select at least one topic" : `Subscribe to ${scopeLabel} →`}
              </button>
              <p style={{ margin: "12px 0 0", fontSize: 11.5, color: "var(--text-faint)", textAlign: "center", lineHeight: 1.5 }}>
                No spam. Unsubscribe in one click. We never share your email.
              </p>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 28px" }}>
            <div style={{ display: "grid", placeItems: "center", margin: "0 auto 18px", width: 52, height: 52, borderRadius: 99, background: "var(--accent-ghost)" }}>
              <PineMark size={30} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 23, margin: "0 0 8px", color: "var(--text)" }}>You're subscribed.</h3>
            <p style={{ margin: "0 0 22px", color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.6 }}>
              We'll send <span style={{ color: "var(--text)" }}>{email}</span> a{freq === "weekly" ? " weekly digest" : "n email"} whenever{" "}
              <span style={{ color: "var(--text)" }}>{scopeLabel}</span> {selectedIds.length === 1 ? "changes" : "change"}.
            </p>
            <button onClick={onClose} style={{
              padding: "11px 26px", borderRadius: 10, border: "1px solid var(--border)", cursor: "pointer",
              background: "transparent", color: "var(--text)", fontSize: 14, fontFamily: "var(--font-ui)", fontWeight: 500,
            }}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function YouTubeEmbed({ id, title }) {
  const [play, setPlay] = useState(false)
  return (
    <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)", background: "linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, var(--bg-elev)), var(--bg-elev))", aspectRatio: "16 / 9" }}>
      {play ? (
        <iframe title={title} width="100%" height="100%" style={{ border: 0, display: "block" }}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ) : (
        <button onClick={() => setPlay(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", cursor: "pointer", padding: 0, background: "transparent" }}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title}
            onError={(e) => { e.currentTarget.style.display = "none" }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, color-mix(in srgb, var(--bg) 80%, transparent), transparent 55%)" }} />
          <div style={{ position: "absolute", left: 18, bottom: 16, right: 18, textAlign: "left" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 5 }}>▶ Watch · YouTube</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#fff", fontWeight: 500, textShadow: "0 1px 12px rgba(0,0,0,.6)" }}>{title}</div>
          </div>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 58, height: 58, borderRadius: 99, background: "var(--accent)", display: "grid", placeItems: "center", boxShadow: "0 8px 30px -6px rgba(0,0,0,.5)" }}>
            <span style={{ color: "var(--accent-on)", fontSize: 22, marginLeft: 4 }}>▶</span>
          </div>
        </button>
      )}
    </div>
  )
}
