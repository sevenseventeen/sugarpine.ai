'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { NAV } from '../lib/nav.js'
import { PineMark, Wordmark, SubscribeModal } from './ui.jsx'
import { ShellContext } from './ShellContext.jsx'

// Shell geometry. The page is ink; the masthead, rail and light panel compose
// at max 1280 wide and centre. The rail and the panel share one padding so the
// gap from the rail's left edge to the 1280 frame equals the gap from the
// panel to the frame's right edge. The masthead uses the same numbers so the
// logo lines up with the topic labels and Glossary with the panel's right edge.
const SHELL_MAX = 1280
const HEADER_H = 64        // masthead is fixed-height so the sticky rail can sit under it
const ROW_TOP = 16         // masthead → top of rail / panel
const EDGE = 24            // frame edge → rail row / panel edge
const RAIL_W = 252
const RAIL_INSET = 13      // topic row padding; the label text starts here

// ── Period slider — two knobs on a hairline crease, grey span between ────────

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

  // Arrow keys step a year; Home/End jump to the ends. Each thumb clamps
  // against the other, same as dragging.
  const nudge = (which, e) => {
    const step = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[e.key]
    let y
    if (step) y = (which === "from" ? from : to) + step
    else if (e.key === "Home") y = minY
    else if (e.key === "End") y = maxY
    else return
    e.preventDefault()
    y = Math.min(maxY, Math.max(minY, y))
    if (which === "from") onChange({ from: Math.min(y, to), to })
    else onChange({ from, to: Math.max(y, from) })
  }

  const pct = (y) => (((y - minY) / span) * 100).toFixed(2) + "%"
  const knob = {
    position: "absolute", top: 1, width: 13, height: 13, margin: "-6.5px 0 0 -6.5px", borderRadius: "50%",
    background: "var(--ink-raised)", cursor: "grab", touchAction: "none", padding: 0, border: 0,
    boxShadow: "1px 2px 4px rgba(0,0,0,.55), -1px -1px 2px rgba(255,255,255,.08), inset 0 1px 0 rgba(255,255,255,.18)",
  }
  const thumb = (which, value, label) => (
    <button type="button" role="slider" aria-label={label} aria-valuemin={minY} aria-valuemax={maxY} aria-valuenow={value} aria-valuetext={String(value)}
      onPointerDown={(e) => { e.preventDefault(); dragRef.current = which }}
      onKeyDown={(e) => nudge(which, e)}
      style={{ ...knob, left: pct(value) }} />
  )
  const label = { font: "400 9.5px/1 var(--font-mono)", letterSpacing: ".06em", color: "var(--ink-text-meta)" }
  const range = from === to ? String(from) : `${from}–${to}`

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13, padding: `0 ${RAIL_INSET}px` }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ font: "400 9.5px/1 var(--font-ui)", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--ink-text-meta)" }}>Period</span>
        <span style={{ font: "500 11px/1 var(--font-mono)", letterSpacing: ".06em", color: "var(--ink-text)" }}>{range}</span>
      </div>
      <div style={{ padding: "9px 7px 5px", position: "relative", height: 22 }}>
        <div ref={trackRef} style={{
          position: "relative", height: 2, borderRadius: 1, background: "var(--ink-deep)",
          boxShadow: "inset 0 1px 1px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.06)",
        }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, borderRadius: 1, background: "var(--slider-fill)", left: pct(from), right: (100 - ((to - minY) / span) * 100).toFixed(2) + "%" }} />
          {thumb("from", from, "From year")}
          {thumb("to", to, "To year")}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 3px", ...label }}><span>{minY}</span><span>{maxY}</span></div>
    </div>
  )
}

// ── Rail — topic filters, period, subscribe. Lives on the ink. ───────────────

function Rail({ entries, timeline, activeSlugs, onNavigate, onSubscribeAll }) {
  const { from, to, setRange, minY, maxY } = timeline
  const inRange = entries.filter((e) => e.year >= from && e.year <= to)
  const rows = [{ label: "All Topics", slug: "home", count: inRange.length }]
    .concat(NAV.filter((n) => n.kind === "timeline").map((n) => ({
      label: n.label, slug: n.slug,
      count: inRange.filter((e) => e.topics.some((t) => t.slug === n.slug)).length,
    })))

  return (
    <div style={{ width: RAIL_W, padding: `0 10px 24px 14px`, display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {rows.map((r) => {
          const active = activeSlugs.has(r.slug)
          return (
            <button key={r.slug} className="sp-nav" onClick={() => onNavigate(r.slug)} aria-pressed={active} style={{
              display: "flex", alignItems: "baseline", gap: 9, width: "100%", textAlign: "left",
              border: 0, cursor: "pointer", background: "transparent", padding: `9px ${RAIL_INSET}px`, borderRadius: 11,
              fontFamily: "var(--font-ui)", fontSize: 13, letterSpacing: ".015em",
              fontWeight: active ? 500 : 400,
              color: active ? "var(--ink-tint)" : (r.count === 0 ? "var(--ink-text-muted)" : "var(--ink-text-dim)"),
              boxShadow: active ? "var(--shadow-press-ink)" : "none",
            }}>
              <span style={{ flex: 1 }}>{r.label}</span>
              <span style={{ font: "400 9.5px var(--font-mono)", color: "var(--ink-text-meta)" }}>{r.count}</span>
            </button>
          )
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <PeriodSlider minY={minY} maxY={maxY} from={from} to={to} onChange={setRange} />
        <div style={{ padding: `0 ${RAIL_INSET}px` }}>
          <button className="sp-btn-primary" onClick={onSubscribeAll} style={{ marginTop: 14, padding: "15px 16px", borderRadius: 14 }}>Subscribe</button>
        </div>
      </div>
    </div>
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
  const [drawer, setDrawer] = useState(false)
  const currentSlug = pathname === '/' ? 'home' : pathname.replace(/^\//, '')

  // The period filter lives here so the rail and every timeline share it
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
    const apply = () => { setNarrow(mq.matches); setDrawer(false) }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  const navigate = (id) => {
    setDrawer(false)
    router.push(id === 'home' ? '/' : `/${id}`)
  }

  const openSub = (target) => setModal({ open: true, target: target || null })
  const closeSub = () => setModal({ open: false, target: null })

  // What the rail lights up: the section itself, or on an entry, its topics
  const here = entries.find((e) => e.slug === currentSlug)
  const activeSlugs = new Set(here ? here.topics.map((t) => t.slug) : [currentSlug])

  const rail = (
    <Rail entries={entries} timeline={timeline} activeSlugs={activeSlugs} onNavigate={navigate} onSubscribeAll={() => openSub(null)} />
  )

  return (
    <ShellContext.Provider value={{ onNavigate: navigate, onSubscribe: openSub, onSubscribeAll: () => openSub(null), pages, entries, timeline }}>
      <div style={{ minHeight: "100vh", color: "var(--text)", fontFamily: "var(--font-ui)", WebkitFontSmoothing: "antialiased" }}>

        {/* Masthead — full-width and stuck to the top; its shadow is the card raise drawn edge to edge */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, height: HEADER_H, background: "var(--ink)", boxShadow: "var(--shadow-header)" }}>
          <div style={{ maxWidth: SHELL_MAX, height: "100%", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: narrow ? `0 ${EDGE}px` : `0 ${EDGE}px 0 ${EDGE + RAIL_INSET}px` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {narrow && (
                <button onClick={() => setDrawer((d) => !d)} aria-label="Menu" style={{ width: 30, height: 30, borderRadius: 9, border: 0, background: "var(--ink-raised)", color: "var(--ink-text)", cursor: "pointer", fontSize: 14, boxShadow: "var(--shadow-btn-ink)", marginRight: 4 }}>☰</button>
              )}
              <Link href="/" aria-label="Sugarpine — home" style={{ display: "flex", alignItems: "baseline", gap: 10, textDecoration: "none" }}>
                <PineMark size={24} color="var(--ink-text)" />
                <Wordmark height={16} color="var(--ink-text)" />
              </Link>
            </div>
            <Link href="/ai-glossary" className="sp-mast-link" aria-current={currentSlug === "ai-glossary" ? "page" : undefined} style={{ font: "400 11.5px/1 var(--font-ui)", letterSpacing: ".12em", textTransform: "uppercase", color: currentSlug === "ai-glossary" ? "var(--ink-tint)" : undefined }}>Glossary</Link>
          </div>
        </header>

        {/* The 1280 frame — rail + light panel */}
        <div style={{ maxWidth: SHELL_MAX + 32, margin: "0 auto", padding: narrow ? "0 8px 24px" : "0 16px 40px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4, padding: narrow ? `${ROW_TOP}px 0 0` : `${ROW_TOP}px ${EDGE}px 0 10px` }}>
            {!narrow && (
              <aside style={{ flex: "none", position: "sticky", top: HEADER_H + ROW_TOP }}>
                {rail}
              </aside>
            )}

            {narrow && drawer && (
              <>
                <div onClick={() => setDrawer(false)} style={{ position: "fixed", inset: 0, zIndex: 25, background: "rgba(27,36,48,.45)" }} />
                <aside style={{ position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 30, overflowY: "auto", paddingTop: 24, background: "var(--ink)", boxShadow: "8px 0 30px rgba(0,0,0,.35)" }}>
                  {rail}
                </aside>
              </>
            )}

            <main style={{ flex: 1, minWidth: 0, minHeight: "70vh", background: "var(--bg)", borderRadius: 16, padding: narrow ? "24px 20px 40px" : "34px 38px 52px", boxShadow: "var(--shadow-panel)" }}>
              {children}
            </main>
          </div>
        </div>

        <SubscribeModal open={modal.open} target={modal.target} onClose={closeSub} />
      </div>
    </ShellContext.Provider>
  )
}
