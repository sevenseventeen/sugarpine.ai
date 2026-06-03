'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { PRIMER, TOPICS, relTime, daysAgo } from '../lib/data.js'
import { PineMark, RecencyDot, SubscribeModal } from './ui.jsx'
import { ShellContext } from './ShellContext.jsx'

const THEME_VARS = {
  "--bg": "#0e0e0c",
  "--bg-elev": "#15150f",
  "--bg-card": "#17170f",
  "--border": "#2c2a22",
  "--text": "#efe9dd",
  "--text-dim": "#b1aa9a",
  "--text-faint": "#787264",
  "--accent": "#c9a96e",
  "--accent-on": "#1c1405",
  "--accent-ghost": "color-mix(in srgb, #c9a96e 14%, transparent)",
  "--font-display": "var(--loaded-spectral, Georgia, serif)",
  "--font-ui": "var(--loaded-ibm-sans, system-ui, sans-serif)",
  "--font-mono": "var(--loaded-ibm-mono, ui-monospace, monospace)",
}

function GroupLabel({ children }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-faint)", padding: "0 10px", margin: "18px 0 8px" }}>
      {children}
    </div>
  )
}

function Sidebar({ currentSlug, onNavigate, onSubscribeAll, collapsed }) {
  const [q, setQ] = useState("")
  const match = (p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.blurb.toLowerCase().includes(q.toLowerCase())
  const primer = PRIMER.filter(match)
  const topics = TOPICS.filter(match)

  const NavItem = ({ p }) => {
    const active = currentSlug === p.id
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
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search topics"
              style={{
                width: "100%", boxSizing: "border-box", padding: "9px 12px 9px 30px", borderRadius: 9,
                border: "1px solid var(--border)", background: "var(--bg)", color: "var(--text)",
                fontSize: 13, fontFamily: "var(--font-ui)", outline: "none",
              }} />
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

export default function Shell({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [modal, setModal] = useState({ open: false, target: null })
  const [narrow, setNarrow] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const scrollRef = useRef(null)

  const currentSlug = pathname === '/' ? 'home' : pathname.replace(/^\//, '')

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

  return (
    <ShellContext.Provider value={{ onNavigate: navigate, onSubscribe: openSub, onSubscribeAll: () => openSub(null) }}>
      <div style={{ ...THEME_VARS, position: "fixed", inset: 0, display: "flex", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-ui)" }}>
        {narrow && !collapsed && (
          <div onClick={() => setCollapsed(true)} style={{ position: "fixed", inset: 0, zIndex: 25, background: "color-mix(in srgb, var(--bg) 55%, transparent)" }} />
        )}

        <div style={{ position: narrow ? "fixed" : "relative", zIndex: 30, height: "100%", boxShadow: narrow && !collapsed ? "0 0 60px rgba(0,0,0,.5)" : "none" }}>
          <Sidebar currentSlug={currentSlug} onNavigate={navigate} onSubscribeAll={() => openSub(null)} collapsed={collapsed} />
        </div>

        <main ref={scrollRef} style={{ flex: 1, overflowY: "auto", height: "100%", position: "relative" }}>
          {narrow && (
            <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "color-mix(in srgb, var(--bg) 88%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)" }}>
              <button onClick={() => setCollapsed((c) => !c)} aria-label="Menu" style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 16 }}>☰</button>
              <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", cursor: "pointer" }}>
                <PineMark size={20} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--text)" }}>Sugarpine</span>
              </button>
            </div>
          )}
          {children}
        </main>

        <SubscribeModal open={modal.open} target={modal.target} onClose={closeSub} />
      </div>
    </ShellContext.Provider>
  )
}
