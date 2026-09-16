'use client'

// The glossary gets the timeline treatment: one stacked list of cards,
// minus the dates. Term, definition, nothing else for now.
export default function GlossaryView({ page }) {
  const terms = page.cards || []
  const count = terms.length

  return (
    <div style={{ maxWidth: 1000, padding: "30px clamp(20px, 4vw, 44px) 60px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, padding: "0 4px 22px", marginBottom: 26, boxShadow: "var(--shadow-rule)" }}>
        <h1 style={{ margin: 0, font: "italic 300 32px/1 var(--font-display)", letterSpacing: ".005em", color: "var(--text-head)" }}>Glossary</h1>
        <span style={{ font: "400 10px/1 var(--font-mono)", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--text-dim)", whiteSpace: "nowrap" }}>
          {count} {count === 1 ? "term" : "terms"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {terms.map((t, i) => (
          <article key={i} className="sp-card" style={{ padding: 12 }}>
            <div style={{ padding: "12px 18px 12px" }}>
              <h2 style={{ margin: "0 0 8px", font: "300 21px/1.3 var(--font-ui)", letterSpacing: ".005em", color: "var(--text)", textWrap: "pretty", maxWidth: "40ch" }}>{t.title}</h2>
              {(t.body || "").split("\n\n").filter(Boolean).map((para, j, all) => (
                <p key={j} style={{ margin: j < all.length - 1 ? "0 0 12px" : 0, font: "300 14px/1.65 var(--font-ui)", color: "var(--text-dim)", textWrap: "pretty", maxWidth: "70ch" }}>{para}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
