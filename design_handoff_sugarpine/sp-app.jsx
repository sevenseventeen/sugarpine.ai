// sp-app.jsx — controller: routing, theming, tweaks, mount.
const { useState: useS, useEffect: useE, useRef: useR, useMemo: useM } = React;

const ACCENTS = {
  gold: { accent: "#c9a96e", on: "#1c1405" },
  pine: { accent: "#43856a", on: "#ffffff" },
  clay: { accent: "#bb6a49", on: "#ffffff" },
};
const FONTS = {
  Spectral: "'Spectral', Georgia, serif",
  Newsreader: "'Newsreader', Georgia, serif",
  Georgia: "Georgia, 'Times New Roman', serif",
};
const THEME_VARS = {
  dark: {
    "--bg": "#0e0e0c", "--bg-elev": "#15150f", "--bg-card": "#17170f",
    "--border": "#2c2a22", "--text": "#efe9dd", "--text-dim": "#b1aa9a", "--text-faint": "#787264",
  },
  paper: {
    "--bg": "#f6f2e9", "--bg-elev": "#efeadd", "--bg-card": "#fffdf8",
    "--border": "#e2dac9", "--text": "#211f18", "--text-dim": "#565247", "--text-faint": "#928c7c",
  },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "gold",
  "font": "Spectral"
}/*EDITMODE-END*/;

function buildVars(t) {
  const a = ACCENTS[t.accent] || ACCENTS.gold;
  const base = THEME_VARS[t.theme] || THEME_VARS.dark;
  return {
    ...base,
    "--accent": a.accent,
    "--accent-on": a.on,
    "--accent-ghost": `color-mix(in srgb, ${a.accent} 14%, transparent)`,
    "--font-display": FONTS[t.font] || FONTS.Spectral,
    "--font-ui": "'IBM Plex Sans', system-ui, sans-serif",
    "--font-mono": "'IBM Plex Mono', ui-monospace, monospace",
  };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useS({ id: "home" });
  const [modal, setModal] = useS({ open: false, target: null });
  const [narrow, setNarrow] = useS(false);
  const [collapsed, setCollapsed] = useS(false);
  const scrollRef = useR(null);

  useE(() => {
    const mq = window.matchMedia("(max-width: 880px)");
    const apply = () => { setNarrow(mq.matches); setCollapsed(mq.matches); };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const navigate = (id) => {
    setRoute({ id });
    if (narrow) setCollapsed(true);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const openSub = (target) => setModal({ open: true, target: target || null });
  const closeSub = () => setModal({ open: false, target: null });

  const page = route.id === "home" ? null : window.SP_DATA.byId(route.id);
  const vars = useM(() => buildVars(t), [t.theme, t.accent, t.font]);

  return (
    <div data-theme={t.theme} style={{ ...vars, position: "fixed", inset: 0, display: "flex", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-ui)" }}>
      {/* mobile dim overlay when sidebar open */}
      {narrow && !collapsed && (
        <div onClick={() => setCollapsed(true)} style={{ position: "fixed", inset: 0, zIndex: 25, background: "color-mix(in srgb, var(--bg) 55%, transparent)" }} />
      )}

      <div style={{ position: narrow ? "fixed" : "relative", zIndex: 30, height: "100%", boxShadow: narrow && !collapsed ? "0 0 60px rgba(0,0,0,.5)" : "none" }}>
        <Sidebar route={route} onNavigate={navigate} onSubscribeAll={() => openSub(null)} collapsed={collapsed} />
      </div>

      <main ref={scrollRef} style={{ flex: 1, overflowY: "auto", height: "100%", position: "relative" }}>
        {/* slim top bar (mobile) */}
        {narrow && (
          <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "color-mix(in srgb, var(--bg) 88%, transparent)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)" }}>
            <button onClick={() => setCollapsed((c) => !c)} aria-label="Menu" style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", cursor: "pointer", fontSize: 16 }}>☰</button>
            <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", cursor: "pointer" }}>
              <PineMark size={20} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--text)" }}>Sugarpine</span>
            </button>
          </div>
        )}

        {route.id === "home"
          ? <HomeView onNavigate={navigate} onSubscribe={openSub} onSubscribeAll={() => openSub(null)} />
          : page
            ? <ArticleView page={page} onNavigate={navigate} onSubscribe={openSub} />
            : <div style={{ padding: 60 }}>Not found.</div>}
      </main>

      <SubscribeModal open={modal.open} target={modal.target} onClose={closeSub} />

      <TweaksPanel>
        <TweakSection label="Aesthetic direction" />
        <TweakRadio label="Theme" value={t.theme} options={["dark", "paper"]} onChange={(v) => setTweak("theme", v)} />
        <TweakSection label="Accent" />
        <TweakColor label="Accent" value={ACCENTS[t.accent].accent}
          options={[ACCENTS.gold.accent, ACCENTS.pine.accent, ACCENTS.clay.accent]}
          onChange={(hex) => {
            const key = Object.keys(ACCENTS).find((k) => ACCENTS[k].accent === hex) || "gold";
            setTweak("accent", key);
          }} />
        <TweakSection label="Display typeface" />
        <TweakSelect label="Headlines" value={t.font} options={["Spectral", "Newsreader", "Georgia"]} onChange={(v) => setTweak("font", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
