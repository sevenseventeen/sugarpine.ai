import { useState, useEffect, useRef } from 'react'
import { Sidebar, HomeView, ArticleView } from './views.jsx'
import { SubscribeModal } from './ui.jsx'
import { byId } from './data.js'

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
  "--font-display": "'Spectral', Georgia, serif",
  "--font-ui": "'IBM Plex Sans', system-ui, sans-serif",
  "--font-mono": "'IBM Plex Mono', ui-monospace, monospace",
}

export default function App() {
  const [route, setRoute] = useState({ id: "home" })
  const [modal, setModal] = useState({ open: false, target: null })
  const [narrow, setNarrow] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 880px)")
    const apply = () => { setNarrow(mq.matches); setCollapsed(mq.matches) }
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  const navigate = (id) => {
    setRoute({ id })
    if (narrow) setCollapsed(true)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }

  const openSub = (target) => setModal({ open: true, target: target || null })
  const closeSub = () => setModal({ open: false, target: null })

  const page = route.id === "home" ? null : byId(route.id)

  return (
    <div style={{ ...THEME_VARS, position: "fixed", inset: 0, display: "flex", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-ui)" }}>
      {narrow && !collapsed && (
        <div onClick={() => setCollapsed(true)} style={{ position: "fixed", inset: 0, zIndex: 25, background: "color-mix(in srgb, var(--bg) 55%, transparent)" }} />
      )}

      <div style={{ position: narrow ? "fixed" : "relative", zIndex: 30, height: "100%", boxShadow: narrow && !collapsed ? "0 0 60px rgba(0,0,0,.5)" : "none" }}>
        <Sidebar route={route} onNavigate={navigate} onSubscribeAll={() => openSub(null)} collapsed={collapsed} />
      </div>

      <main ref={scrollRef} style={{ flex: 1, overflowY: "auto", height: "100%", position: "relative" }}>
        {narrow && (
          <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "color-mix(in srgb, var(--bg) 88%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)" }}>
            <button onClick={() => setCollapsed((c) => !c)} aria-label="Menu" style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 16 }}>☰</button>
            <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", cursor: "pointer" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--text)" }}>Sugarpine</span>
            </button>
          </div>
        )}

        {route.id === "home"
          ? <HomeView onNavigate={navigate} onSubscribe={openSub} onSubscribeAll={() => openSub(null)} />
          : page
            ? <ArticleView page={page} onNavigate={navigate} onSubscribe={openSub} />
            : <div style={{ padding: 60, color: "var(--text-faint)", fontFamily: "var(--font-ui)" }}>Page not found.</div>
        }
      </main>

      <SubscribeModal open={modal.open} target={modal.target} onClose={closeSub} />
    </div>
  )
}
