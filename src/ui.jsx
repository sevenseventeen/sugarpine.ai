import { useState, useEffect, useRef } from 'react'
import { daysAgo, relTime } from './data.js'

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

export function SubscribeModal({ open, target, onClose }) {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [freq, setFreq] = useState("instant")
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setDone(false); setEmail(""); setFreq("instant")
      setTimeout(() => inputRef.current && inputRef.current.focus(), 60)
    }
  }, [open, target])

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose() }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null
  const whole = !target
  const title = whole ? "Subscribe to all of Sugarpine" : `Subscribe to ${target.title}`
  const sub = whole
    ? "One email when anything on the site is updated. The full living landscape, delivered."
    : `Get an email whenever the ${target.title} page changes — and nothing else.`
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)

  return (
    <div onMouseDown={onClose} style={{
      position: "fixed", inset: 0, zIndex: 60, display: "grid", placeItems: "center",
      background: "color-mix(in srgb, var(--bg) 62%, transparent)", backdropFilter: "blur(6px)", padding: 24,
    }}>
      <div onMouseDown={(e) => e.stopPropagation()} style={{
        width: "min(460px, 100%)", background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: 16, padding: "30px 30px 26px", boxShadow: "0 30px 80px -20px rgba(0,0,0,.6)", position: "relative",
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 8,
          border: "1px solid var(--border)", background: "transparent", color: "var(--text-dim)",
          cursor: "pointer", fontSize: 16, lineHeight: 1,
        }}>×</button>

        {!done ? (
          <>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18 }}>
              <PineMark size={28} />
              <Eyebrow>{whole ? "Full site" : "Single topic"}</Eyebrow>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 24, lineHeight: 1.15, margin: "0 0 8px", color: "var(--text)", letterSpacing: "-0.01em" }}>{title}</h3>
            <p style={{ margin: "0 0 20px", color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.6 }}>{sub}</p>

            <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 8 }}>Email address</label>
            <input
              ref={inputRef} type="email" value={email} placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && valid) setDone(true) }}
              style={{
                width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 10,
                border: "1px solid var(--border)", background: "var(--bg-elev)", color: "var(--text)",
                fontSize: 15, fontFamily: "var(--font-ui)", outline: "none",
              }}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 22 }}>
              {[["instant", "As it happens"], ["weekly", "Weekly digest"]].map(([k, lbl]) => (
                <button key={k} onClick={() => setFreq(k)} style={{
                  flex: 1, padding: "10px 12px", borderRadius: 10, cursor: "pointer",
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
            }}>Subscribe</button>
            <p style={{ margin: "14px 0 0", fontSize: 11.5, color: "var(--text-faint)", textAlign: "center", lineHeight: 1.5 }}>
              No spam. Unsubscribe in one click. We never share your email.
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
            <div style={{ display: "grid", placeItems: "center", margin: "0 auto 18px", width: 52, height: 52, borderRadius: 99, background: "var(--accent-ghost)" }}>
              <PineMark size={30} />
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 23, margin: "0 0 8px", color: "var(--text)" }}>You're subscribed.</h3>
            <p style={{ margin: "0 0 22px", color: "var(--text-dim)", fontSize: 14.5, lineHeight: 1.6 }}>
              We'll email <span style={{ color: "var(--text)" }}>{email}</span>{" "}
              {freq === "instant" ? "as soon as" : "in a weekly digest when"}{" "}
              {whole ? "anything on the site" : target.title}{" "}
              {freq === "instant" ? "changes" : "changes"}.
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
        <iframe
          title={title} width="100%" height="100%" style={{ border: 0, display: "block" }}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
        />
      ) : (
        <button onClick={() => setPlay(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", cursor: "pointer", padding: 0, background: "transparent" }}>
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title}
            onError={(e) => { e.currentTarget.style.display = "none" }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
          />
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
