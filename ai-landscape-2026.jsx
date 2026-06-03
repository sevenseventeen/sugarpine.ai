import { useState } from "react";

const sections = [
  {
    id: "foundations",
    label: "The Foundation",
    emoji: "🧱",
    color: "#e8d5b7",
    content: {
      headline: "What Are We Actually Talking About?",
      summary: "Before diving into products, you need the vocabulary. These four concepts are the building blocks of everything you'll hear about.",
      cards: [
        {
          title: "Models",
          icon: "🧠",
          description: "The core AI brain. Claude, GPT-5, Gemini — these are Large Language Models (LLMs). They take text in, return text out. They're getting smarter and cheaper every few months. Everything else is built on top of these.",
          note: "Think of a model like electricity — powerful raw material, but you need infrastructure to do anything useful with it."
        },
        {
          title: "Agents",
          icon: "🤖",
          description: "An agent is a model given tools and a goal, then turned loose. Instead of answering one question, it plans a sequence of steps, uses tools (web search, file read/write, code execution, APIs), checks its own work, and iterates until done. No human approval at each step.",
          note: "The gap between 'chatbot' and 'agent' is the difference between asking someone a question and hiring them to complete a project."
        },
        {
          title: "Tools",
          icon: "🔧",
          description: "Actions an agent can take. Web search. Read/write files. Run code. Call an API. Send an email. Browse the web. Each 'tool' is a specific capability you give the model. Tools are what make agents actually do things in the real world.",
          note: "A model without tools is a brain in a jar. Tools are the hands."
        },
        {
          title: "Skills",
          icon: "📋",
          description: "Reusable instruction sets — like saved playbooks. A skill tells an agent how to handle a specific type of task: 'how to research a company,' 'how to write a cold email,' 'how to process an invoice.' Skills let agents get better at specific workflows over time without retraining.",
          note: "OpenClaw/Hermes popularized this. A growing skill library = a more capable personal assistant."
        },
      ]
    }
  },
  {
    id: "anthropic",
    label: "Anthropic",
    emoji: "⬛",
    color: "#1a1a2e",
    dark: true,
    content: {
      headline: "Anthropic's Ecosystem",
      summary: "Anthropic makes Claude. But in 2026 they've shipped an entire integrated product stack — not just a chatbot.",
      cards: [
        {
          title: "Claude (claude.ai)",
          icon: "💬",
          description: "The chat interface you're using right now. Opus 4.7 (most powerful), Sonnet 4.6 (fast/smart daily driver), Haiku 4.5 (cheap/fast). Claude now has 1M token context — it can read entire codebases or books in one shot.",
          note: "Current flagship models as of May 2026."
        },
        {
          title: "MCP (Model Context Protocol)",
          icon: "🔌",
          description: "Anthropic's open standard for connecting AI to external tools. Think USB-C — before MCP, every tool integration was custom code. Now any app that supports MCP can talk to Claude without custom glue. 100M+ monthly downloads. Became the industry standard.",
          note: "This is arguably Anthropic's most strategically important move. Every major framework now supports it."
        },
        {
          title: "Claude Code",
          icon: "⌨️",
          description: "Terminal-based AI coding agent. It reads your entire codebase, plans changes across multiple files, runs tests, fixes failures, and opens PRs. Not autocomplete — autonomous software development. Grew from research preview to $1B product in 6 months. Stripe used it for a 10,000-line migration in 4 days (estimated 10 engineer-weeks).",
          note: "The most capable autonomous coding agent in production today."
        },
        {
          title: "Cowork",
          icon: "🖥️",
          description: "Desktop agent for non-developers. Opens apps, clicks through UIs, manages files and tasks. Think: 'Claude, move all the invoices from Downloads into the right folders and email me a summary.' Still in research preview.",
          note: "The 'AI employee' vision for knowledge workers."
        },
        {
          title: "Claude Design",
          icon: "🎨",
          description: "Launched April 2026. Bridges design and code — extracts a design system from a codebase and hands off directly to Claude Code. Knocked 7% off Figma's stock in one day. Not a Figma competitor — more like the missing link between visual prototype and production code.",
          note: "Part of Anthropic's thesis: one integrated stack from idea → design → code → deploy."
        },
        {
          title: "Skills (in Claude)",
          icon: "🧩",
          description: "Bundled capability packs you install in Cowork or Claude. Like 'work themes' — a Marketing plugin might include custom commands, memory, and MCP connectors all at once. You can build your own. This is also how the system prompts on this screen work.",
          note: "This is what you'll eventually want to build — custom skills for your consulting clients."
        },
      ]
    }
  },
  {
    id: "coding",
    label: "Coding Tools",
    emoji: "🛠️",
    color: "#0f3460",
    dark: true,
    content: {
      headline: "AI Coding Tools Landscape",
      summary: "This category exploded. It's no longer just autocomplete — we're talking autonomous agents that write entire features.",
      cards: [
        {
          title: "Cursor",
          icon: "📐",
          description: "A full VS Code fork with AI built into every layer. Flagship feature is Composer — multi-file edits in one pass. Best for developers who live in an IDE and want AI embedded in their existing workflow. Huge ecosystem, great codebase intelligence.",
          note: "Best for: developers maintaining large existing codebases."
        },
        {
          title: "Windsurf",
          icon: "🌊",
          description: "IDE agent known for UX polish and 'environmental awareness' — it understands what you're doing contextually, not just what you type. Community consensus: Cursor wins on features, Windsurf wins on feel. Many devs use both.",
          note: "Best for: flow-state feature building, cleaner UX."
        },
        {
          title: "GitHub Copilot",
          icon: "🐙",
          description: "The original AI coding tool, now the most widely deployed. Deep GitHub integration. Moving to usage-based pricing. Works across VS Code, JetBrains, Neovim. Less 'agentic' than Claude Code or Cursor but unmatched platform reach.",
          note: "Best for: teams already on GitHub who want low-friction adoption."
        },
        {
          title: "Lovable / v0 / Bolt",
          icon: "⚡",
          description: "No-code/low-code app builders — describe what you want in plain language, get a full web app back. Lovable (formerly GPT Engineer) is the most mature. v0 is Vercel's tool. These are for founders and non-engineers shipping MVPs fast.",
          note: "Best for: non-technical founders, prototyping, landing pages."
        },
      ]
    }
  },
  {
    id: "agents",
    label: "Agent Platforms",
    emoji: "🕸️",
    color: "#2d6a4f",
    dark: true,
    content: {
      headline: "Open-Source Personal Agents",
      summary: "This is the wild west — self-hosted agents that live on your machine or a server, remember everything, and run 24/7. Huge community energy, real security risks.",
      cards: [
        {
          title: "OpenClaw",
          icon: "🦞",
          description: "Started as a weekend project in late 2025, became the most-starred GitHub repo in history — 345K+ stars by April 2026. A local AI agent connecting to 24+ messaging platforms (Telegram, Discord, Slack, etc.) and running skills you install. Think: a personal AI assistant that lives on your computer and talks to you through your phone. Had serious security incidents in March 2026 (9 CVEs, 12% of community skills were malware). Creator joined OpenAI; now community-maintained.",
          note: "Breadth of integrations is unmatched. Security requires caution."
        },
        {
          title: "Hermes Agent",
          icon: "🪽",
          description: "Launched Feb 2026 by Nous Research. The key differentiator: self-improvement. After every complex task, it enters a 'Reflective Phase' — writes a new skill file capturing what worked, refines it over time. The longer you use it, the better it gets at YOUR workflows specifically. 140K+ stars. Ships with 70+ default skills, MIT licensed.",
          note: "Best for: people who want one agent that compounds knowledge over time."
        },
        {
          title: "How They're Used Together",
          icon: "🔗",
          description: "Power users run both: OpenClaw as the orchestrator (planning, multi-step coordination, messaging integrations) and Hermes as the execution specialist (fast task loops, learning). They communicate via the ACP protocol. Running costs range from $1-3/day on budget models to $131/day on Claude Opus for heavy use.",
          note: "This combo is the closest thing to 'an AI employee' that exists today outside enterprise products."
        },
        {
          title: "The Reality Check",
          icon: "⚠️",
          description: "The '1000 agents' you hear about is mostly hype or enterprise budgets. Real users report the hardest part isn't the agent — it's the infrastructure. Sessions break. Memory is inconsistent. Security is real. Most people running production automations are managing 1-5 agents, not thousands. The tech is real; the reliability is still maturing.",
          note: "Your experience being error-prone is completely normal and shared by everyone."
        },
      ]
    }
  },
  {
    id: "frameworks",
    label: "Developer Frameworks",
    emoji: "⚙️",
    color: "#7b2d8b",
    dark: true,
    content: {
      headline: "How Developers Build Agents",
      summary: "If you want to build agentic products for clients, these are the underlying frameworks. You don't need to master all of them — but knowing the names helps.",
      cards: [
        {
          title: "LangChain / LangGraph",
          icon: "🔗",
          description: "The most mature, most documented agent framework. LangGraph won the 'stateful multi-step workflow' segment — you define execution as a graph where every state and transition is explicit and debuggable. Best when you need complex branching logic. Most teams still start here.",
          note: "Most mature. Most tutorials. Start here if learning."
        },
        {
          title: "CrewAI",
          icon: "👥",
          description: "Purpose-built for multi-agent coordination — think a 'crew' of specialized agents working together. You define roles (Researcher, Writer, Editor), and they collaborate on tasks. Great for workflows that map to human team structures.",
          note: "Best for: workflows that feel like team handoffs."
        },
        {
          title: "AutoGen (Microsoft)",
          icon: "🏢",
          description: "Microsoft's framework for multi-agent conversations. Agents talk to each other to solve problems. Enterprise-backed, integrates with Azure and Semantic Kernel. Good for corporate IT contexts.",
          note: "Best for: enterprise Microsoft-stack environments."
        },
        {
          title: "Anthropic Agent SDK",
          icon: "⬛",
          description: "Anthropic's own production-ready SDK for building agents on Claude. Newer, cleaner, with built-in tool execution and multi-agent orchestration. If you're building on Claude specifically, this is increasingly the right starting point.",
          note: "Best for: building Claude-native agentic products."
        },
      ]
    }
  },
  {
    id: "landscape",
    label: "Big Picture",
    emoji: "🗺️",
    color: "#8b3a2d",
    dark: true,
    content: {
      headline: "What's Real, What's Hype, What's Coming",
      summary: "The honest consultant's view of where we actually are in May 2026.",
      cards: [
        {
          title: "What's Actually Working",
          icon: "✅",
          description: "Code generation and refactoring (Claude Code, Cursor) are legitimately transforming software teams. RAG pipelines (feeding documents to AI) are in production everywhere. Single-agent automations for specific, bounded tasks (email triage, data extraction, report generation) are reliable. MCP has genuinely standardized tool integration.",
          note: "These are real, billable consulting opportunities right now."
        },
        {
          title: "What's Maturing (But Rough)",
          icon: "🔄",
          description: "Multi-agent orchestration is real but fragile. Memory across sessions is inconsistent. Long-horizon autonomous tasks (agents running for hours without intervention) fail more than they succeed. The 'AI-only business' stories are mostly single-person businesses with heavy automation, not truly autonomous companies.",
          note: "Set client expectations carefully here."
        },
        {
          title: "What's Coming (12-24 months)",
          icon: "🔭",
          description: "Computer use (AI clicking through any UI) is advancing fast — Anthropic acquired Vercept for this. 'Dreaming' agents that review their own sessions and improve themselves while you sleep. Managed multi-agent orchestration as a service. AI-native mobile app development. The gap between 'demo' and 'production reliable' is closing.",
          note: "This is the wave to position for now."
        },
        {
          title: "The Consultant's Opportunity",
          icon: "💡",
          description: "Most companies know they need AI but have no idea what's possible or how to start. The gap between what exists and what's being deployed is enormous. A consultant who can map the landscape, identify the right tool for a specific workflow, and implement or oversee implementation is genuinely rare and in demand. Your value isn't being a developer — it's being a trusted guide.",
          note: "This is exactly the role you're building toward."
        },
      ]
    }
  }
];

export default function AILandscape() {
  const [active, setActive] = useState("foundations");
  const activeSection = sections.find(s => s.id === active);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0d0d0d",
      minHeight: "100vh",
      color: "#f0ebe0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #0d0d0d 60%)",
        borderBottom: "1px solid #333",
        padding: "40px 32px 32px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: 12,
          }}>
            AI Consultant Orientation · May 2026
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#f0ebe0",
          }}>
            The AI Landscape,<br />
            <span style={{ color: "#c9a96e" }}>Plainly Explained</span>
          </h1>
          <p style={{
            marginTop: 16,
            fontSize: 15,
            color: "#aaa",
            maxWidth: 540,
            lineHeight: 1.6,
            fontFamily: "system-ui, sans-serif",
          }}>
            A living reference for understanding agents, tools, platforms, and what's real vs. hype — oriented toward consulting practice.
          </p>
        </div>
      </div>

      {/* Nav */}
      <div style={{
        background: "#111",
        borderBottom: "1px solid #222",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px", display: "flex" }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: active === s.id ? "2px solid #c9a96e" : "2px solid transparent",
                color: active === s.id ? "#c9a96e" : "#777",
                padding: "16px 20px",
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.05em",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 32px" }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{
            fontSize: "clamp(22px, 4vw, 34px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "#f0ebe0",
            margin: "0 0 12px",
          }}>
            {activeSection.content.headline}
          </h2>
          <p style={{
            color: "#999",
            fontSize: 15,
            lineHeight: 1.7,
            fontFamily: "system-ui, sans-serif",
            maxWidth: 620,
            margin: 0,
          }}>
            {activeSection.content.summary}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: 20,
        }}>
          {activeSection.content.cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: "#161616",
                border: "1px solid #2a2a2a",
                borderRadius: 12,
                padding: "24px 24px 20px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#444"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2a2a"}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 22, lineHeight: 1 }}>{card.icon}</span>
                <h3 style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: "#f0ebe0",
                  lineHeight: 1.2,
                }}>
                  {card.title}
                </h3>
              </div>
              <p style={{
                margin: "0 0 16px",
                fontSize: 14,
                color: "#bbb",
                lineHeight: 1.7,
                fontFamily: "system-ui, sans-serif",
              }}>
                {card.description}
              </p>
              <div style={{
                borderTop: "1px solid #222",
                paddingTop: 12,
              }}>
                <p style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#c9a96e",
                  lineHeight: 1.5,
                  fontFamily: "system-ui, sans-serif",
                  fontStyle: "italic",
                }}>
                  {card.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1e1e1e",
        margin: "0 32px",
        padding: "24px 0",
        maxWidth: 900 - 64,
        marginLeft: "auto",
        marginRight: "auto",
      }}>
        <p style={{
          margin: 0,
          fontSize: 12,
          color: "#555",
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "0.05em",
        }}>
          LIVING DOCUMENT · Updated May 2026 · This space moves fast — revisit quarterly
        </p>
      </div>
    </div>
  );
}
