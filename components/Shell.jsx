'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { NAV } from '../lib/nav.js'
import { PineMark, SubscribeModal } from './ui.jsx'
import { ShellContext } from './ShellContext.jsx'

// ── Period slider — two knobs on a pressed groove, orange span between ────────

function PeriodSlider({ minY, maxY, from, to, onChange }) {
  const trackRef = useRef(null)
  const dragRef = useRef(null)
  const span = Math.max(1, maxY - minY)

  useEffect(() => {
    const move = (e) => {
      if (!dragRef.current || !trackRef.current) return
      const r = trackRef.current.getBoundingClientRect()
      const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
      const y = minY + Math.round(t * span)
      if (dragRef.current === "from") onChange({ from: Math.min(y, to), to })
      else onChange({ from, to: Math.max(y, from) })
    }
    const up = () => { dragRef.current = null }
    document.addEventListener("pointermove", move)
    document.addEventListener("pointerup", up)
    return () => {
      document.removeEventListener("pointermove", move)
      document.removeEventListener("pointerup", up)
    }
  }, [minY, span, from, to, onChange])

  const pct = (y) => (((y - minY) / span) * 100).toFixed(2) + "%"
  const knob = {
    position: "absolute", top: 4, width: 18, height: 18, margin: "-9px 0 0 -9px", borderRadius: "50%",
    background: "#EEF1F5", cursor: "grab", touchAction: "none",
    boxShadow: "2px 2px 5px rgba(150,165,190,.5), -1px -1px 3px rgba(255,255,255,.8), inset 1px 1px 0 rgba(255,255,255,.9)",
  }
  const label = { font: "400 9.5px/1 var(--font-mono)", letterSpacing: ".06em", color: "var(--text-dim)" }
  const range = from === to ? String(from) : `${from}–${to}`

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13, padding: "0 13px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ font: "400 9.5px/1 var(--font-ui)", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--text-dim)" }}>Period</span>
        <span style={{ font: "500 11px/1 var(--font-mono)", letterSpacing: ".06em", color: "var(--text)" }}>{range}</span>
      </div>
      <div style={{ padding: "9px 9px 5px", position: "relative", height: 26 }}>
        <div ref={trackRef} style={{
          position: "relative", height: 8, borderRadius: 4, background: "var(--bg-elev)",
          boxShadow: "inset 2px 2px 4px rgba(160,174,196,.55), inset -1px -1px 2px rgba(255,255,255,.9)",
        }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, borderRadius: 4, background: "var(--slider-fill)", boxShadow: "inset 1px 1px 1px rgba(89,99,122,.25)", left: pct(from), right: (100 - ((to - minY) / span) * 100).toFixed(2) + "%" }} />
          <div onPointerDown={(e) => { e.preventDefault(); dragRef.current = "from" }} style={{ ...knob, left: pct(from) }} />
          <div onPointerDown={(e) => { e.preventDefault(); dragRef.current = "to" }} style={{ ...knob, left: pct(to) }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 3px", ...label }}><span>{minY}</span><span>{maxY}</span></div>
    </div>
  )
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ collapsed, entries, timeline, currentSlug, onNavigate, onSubscribeAll }) {
  const { from, to, setRange, minY, maxY } = timeline
  const inRange = entries.filter((e) => e.year >= from && e.year <= to)
  const rows = [{ label: "All Topics", slug: "home", count: inRange.length }]
    .concat(NAV.map((n) => ({
      label: n.label, slug: n.slug,
      count: n.kind === "timeline" ? inRange.filter((e) => e.topics.some((t) => t.slug === n.slug)).length : null,
    })))

  return (
    <aside style={{
      width: collapsed ? 0 : 276, flexShrink: 0, height: "100%", overflow: "hidden",
      display: "flex", flexDirection: "column", transition: "width .22s ease",
    }}>
      <div style={{ width: 276, height: "100%", overflowY: "auto", padding: "30px 24px 36px 30px", display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {rows.map((r) => {
            const active = currentSlug === r.slug
            return (
              <button key={r.slug} className="sp-nav" onClick={() => onNavigate(r.slug)} style={{
                display: "flex", alignItems: "baseline", gap: 9, width: "100%", textAlign: "left",
                border: 0, cursor: "pointer", background: "transparent", padding: "9px 13px", borderRadius: 11,
                fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: ".015em",
                fontWeight: active ? 500 : 400,
                color: active ? "#414B5E" : (r.count === 0 ? "var(--text-faint)" : "var(--text-dim)"),
                boxShadow: active ? "var(--shadow-press)" : "none",
              }}>
                <span style={{ flex: 1 }}>{r.label}</span>
                {r.count !== null && <span style={{ font: "400 9.5px var(--font-mono)", color: "var(--text-dim)" }}>{r.count}</span>}
              </button>
            )
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <PeriodSlider minY={minY} maxY={maxY} from={from} to={to} onChange={setRange} />
          <div style={{ padding: "0 13px" }}>
            <button className="sp-btn" onClick={onSubscribeAll} style={{
              display: "block", width: "100%", textAlign: "center", marginTop: 14, padding: "15px 16px", borderRadius: 14,
              fontSize: 11, letterSpacing: ".19em",
            }}>Subscribe</button>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ── Shell ────────────────────────────────────────────────────────────────────

// Shell remounts on every route change; carry the period across so it sticks.
// Browser-only: on the server, module state would leak between requests.
const isBrowser = typeof window !== 'undefined'
let carried = { range: null }

export default function Shell({ children, pages = [], entries = [] }) {
  const router = useRouter()
  const pathname = usePathname()
  const [modal, setModal] = useState({ open: false, target: null })
  const [narrow, setNarrow] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const scrollRef = useRef(null)
  const currentSlug = pathname === '/' ? 'home' : pathname.replace(/^\//, '')

  // The period filter lives here so the sidebar and every timeline share it
  const maxY = new Date().getFullYear()
  const minY = Math.min(maxY - 1, ...entries.map((e) => e.year))
  const [range, setRange] = useState((isBrowser && carried.range) || { from: minY, to: maxY })
  const from = Math.max(minY, range.from), to = Math.min(maxY, range.to)
  if (isBrowser) carried = { range }

  const timeline = useMemo(() => ({
    from, to, minY, maxY, setRange,
    reset: () => setRange({ from: minY, to: maxY }),
  }), [from, to, minY, maxY])

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 880px)")
    const apply = () => { setNarrow(mq.matches); setCollapsed(mq.matches) }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [pathname])

  const navigate = (id) => {
    if (narrow) setCollapsed(true)
    router.push(id === 'home' ? '/' : `/${id}`)
  }

  const openSub = (target) => setModal({ open: true, target: target || null })
  const closeSub = () => setModal({ open: false, target: null })

  const goHome = () => navigate("home")

  return (
    <ShellContext.Provider value={{ onNavigate: navigate, onSubscribe: openSub, onSubscribeAll: () => openSub(null), pages, entries, timeline }}>
      <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-ui)", WebkitFontSmoothing: "antialiased" }}>

        {/* Brand header — full width, raised off the page by a tight shadow */}
        <header style={{ flex: "none", height: 52, zIndex: 40, display: "flex", justifyContent: "center", background: "var(--bg-header)", boxShadow: "var(--shadow-header)" }}>
          <div style={{ width: "100%", maxWidth: 1280, display: "flex", alignItems: "center", gap: 12, padding: "0 30px" }}>
          {narrow && (
            <button onClick={() => setCollapsed((c) => !c)} aria-label="Menu" style={{ width: 30, height: 30, borderRadius: 9, border: 0, background: "var(--bg)", color: "var(--text-dim)", cursor: "pointer", fontSize: 14, boxShadow: "var(--shadow-btn)", marginRight: 4 }}>☰</button>
          )}
          <button onClick={goHome} style={{ display: "flex", alignItems: "baseline", gap: 8, padding: 0, border: 0, background: "transparent", cursor: "pointer", font: "500 21px/1 var(--font-brand)", letterSpacing: "-.01em", color: "var(--text-head)" }}>
            <PineMark size={18} color="var(--text-head)" />
            Sugarpine
          </button>
          </div>
        </header>

        {/* Page frame — sidebar + content composed at 1280 and centred */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 1280, height: "100%", display: "flex", position: "relative" }}>
            {narrow && !collapsed && (
              <div onClick={() => setCollapsed(true)} style={{ position: "fixed", inset: "52px 0 0", zIndex: 25, background: "rgba(89,99,122,.28)" }} />
            )}

            <div style={{ position: narrow ? "fixed" : "relative", top: narrow ? 52 : undefined, bottom: narrow ? 0 : undefined, left: narrow ? 0 : undefined, zIndex: 30, height: narrow ? undefined : "100%", background: "var(--bg)", boxShadow: narrow && !collapsed ? "8px 0 30px rgba(120,136,164,.35)" : "none" }}>
              <Sidebar collapsed={collapsed} entries={entries} timeline={timeline} currentSlug={currentSlug} onNavigate={navigate} onSubscribeAll={() => openSub(null)} />
            </div>

            <main ref={scrollRef} style={{ flex: 1, minWidth: 0, overflowY: "auto", height: "100%" }}>
              {children}
            </main>
          </div>
        </div>

        <SubscribeModal open={modal.open} target={modal.target} onClose={closeSub} />
      </div>
    </ShellContext.Provider>
  )
}
