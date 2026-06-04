// Seed script — run with: node scripts/seed.js
// Seeds the database pointed to by .env.local (dev by default)

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Capture inline env vars BEFORE dotenv loads .env.local (dotenv won't override existing vars)
const serviceKey = process.env.SUPABASE_SERVICE_KEY
config({ path: '.env.local' })

// Seed uses service role key to bypass RLS — never commit this key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  serviceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// ── Raw data (mirrors lib/data.js) ───────────────────────────────────────────

const PAGES = [
  {
    id: "what-is-ai", group: "Start here", title: "What AI Actually Is",
    kicker: "AI 101", read_mins: 6, updated_at: "2026-05-28T00:00:00Z",
    blurb: "No math, no jargon. A plain-language picture of what these systems are — and what they aren't.",
    lede: "Strip away the headlines and modern AI is a strikingly simple idea applied at enormous scale: a program that has read a very large amount of text and learned to predict what comes next. Everything else — the chatbots, the agents, the coding tools — is built on top of that one trick.",
    sections: [
      { position: 0, heading: "It learned by reading, not by being told", body: "Nobody hand-wrote the rules for how these systems answer questions. Instead, a model was shown an enormous library of human writing and asked, over and over, to guess the next word. Get it wrong, adjust slightly, try again — billions of times. What emerges is a system that has absorbed patterns of grammar, fact, reasoning, and style without ever being explicitly taught any of them." },
      { position: 1, heading: "It predicts, it doesn't 'know'", body: "When you ask a question, the model isn't looking up an answer in a database. It's generating a plausible continuation, one word at a time, based on everything it absorbed during training. That's why it can be fluent and confidently wrong in the same breath — a failure mode worth keeping in mind every time you use one." },
      { position: 2, heading: "Why it suddenly got good", body: "The recipe didn't change much; the scale did. More data, more computing power, and better training methods pushed these systems past a threshold where they became genuinely useful for everyday work. The jump from 'amusing toy' to 'tool I rely on' happened in roughly three years." },
    ],
    related: ["key-terms", "text-generation", "coding"],
  },
  {
    id: "key-terms", group: "Start here", title: "The Words People Use",
    kicker: "AI 101 · Glossary", read_mins: 7, updated_at: "2026-05-30T00:00:00Z",
    cards_heading: "The vocabulary",
    blurb: "LLM, agent, tool, skill, MCP, RAG — the words you need to follow any AI conversation.",
    lede: "Most AI conversations are gatekept by a handful of terms. Learn these six and you can follow almost any discussion — and tell when someone is overselling.",
    cards: [
      { position: 0, title: "LLM — Large Language Model", body: "The core engine. Text in, text out. Claude, GPT-5, and Gemini are all LLMs. They're getting smarter and cheaper every few months, and everything else is built on top of them.", note: "Like electricity — raw capability that needs to be wired into something useful." },
      { position: 1, title: "Agent", body: "A model given tools and a goal, then left to work. Rather than answering one question, it plans steps, takes actions, checks its own results, and keeps going until the job is done.", note: "The difference between asking someone a question and hiring them to finish a project." },
      { position: 2, title: "Tool", body: "A specific action you let a model take: search the web, read a file, run code, send an email. Each tool is one concrete capability you hand it.", note: "A model without tools is a brain in a jar. Tools are the hands." },
      { position: 3, title: "Skill", body: "A reusable instruction set — a saved playbook for one kind of task. 'How to research a company,' 'how to draft a cold email.' Skills let an assistant get reliably better at the work you actually do.", note: "A growing skill library is a more capable assistant." },
      { position: 4, title: "MCP — Model Context Protocol", body: "An open standard for plugging AI into outside tools. Before it, every integration was bespoke glue code. Now it works more like USB-C: build once, connect to anything that speaks it.", note: "Quietly one of the most important pieces of the whole stack." },
      { position: 5, title: "RAG — Retrieval-Augmented Generation", body: "A way to ground answers in your own documents. The system looks up relevant passages first, then writes its answer from them — which keeps it current and cuts down on confident guessing.", note: "How AI answers questions about your specific material." },
    ],
    related: ["what-is-ai", "anthropic-stack", "benchmarks"],
  },
  {
    id: "text-generation", group: "Living Landscape", title: "Text Generation",
    kicker: "Living Landscape", read_mins: 8, updated_at: "2026-06-01T00:00:00Z",
    youtube_id: "aircAruvnKk", youtube_title: "How large language models actually work",
    blurb: "Where writing, reasoning, and conversation actually stand — and what changed this quarter.",
    lede: "Text was the first thing these systems did well, and it remains the deepest. In 2026 the frontier moved from 'writes a clean paragraph' to 'holds a coherent line of reasoning across an entire book-length document.'",
    sections: [
      { position: 0, heading: "Context windows got enormous", body: "The leading models now hold roughly a million words in working memory at once — an entire codebase, a quarter's worth of email, or several novels. The practical effect: you stop summarizing things for the model and simply hand it everything." },
      { position: 1, heading: "Reasoning you can watch", body: "Newer models 'think' before answering, working through a problem in visible steps. It's slower and costs more, but for anything involving logic, planning, or multi-part instructions, the quality gap over instant answers is large." },
      { position: 2, heading: "The reliability ceiling", body: "Fluency is solved; trustworthiness is not. Models still fabricate citations, numbers, and quotes with total confidence. The teams getting real value treat output as a fast first draft from a brilliant, slightly unreliable assistant — never as a finished source of truth." },
    ],
    related: ["coding", "benchmarks", "key-terms"],
  },
  {
    id: "image-video", group: "Living Landscape", title: "Image & Video",
    kicker: "Living Landscape", read_mins: 7, updated_at: "2026-05-31T00:00:00Z",
    blurb: "Generated imagery crossed the realism line; video is months behind and closing fast.",
    lede: "Two years ago AI images had a tell — too many fingers, melted text, an uncanny gloss. In 2026 a still image from a frontier model is, for most people in most contexts, indistinguishable from a photograph.",
    sections: [
      { position: 0, heading: "Stills crossed the line", body: "Hands, text, reflections, and fine detail — the old giveaways — are largely fixed. The remaining limits are about direction and consistency: getting exactly the composition you pictured, and keeping a character identical across a dozen images." },
      { position: 1, heading: "Video is the live frontier", body: "Minute-long clips with coherent motion, lighting, and a consistent cast are now possible from a text prompt. The rough edges are physics and continuity — objects that drift, hands that morph between cuts — but each release narrows the gap." },
    ],
    related: ["deepfakes", "text-generation"],
  },
  {
    id: "deepfakes", group: "Living Landscape", title: "Deepfakes & Authenticity",
    kicker: "Living Landscape", read_mins: 6, updated_at: "2026-05-25T00:00:00Z",
    blurb: "When anything can be faked convincingly, the question shifts from detection to provenance.",
    lede: "The uncomfortable reality of 2026 is that a convincing fake of almost anyone, saying almost anything, can be produced in minutes. The defense is shifting away from spotting fakes and toward proving what's real.",
    sections: [
      { position: 0, heading: "Detection is a losing race", body: "Every detector that works today is training data for the next generation of fakes. Tools that flag synthetic media are useful, but treating them as a reliable filter is a mistake — the gap between generator and detector keeps closing." },
      { position: 1, heading: "Provenance is the real answer", body: "The more durable approach is cryptographic: signing content at the moment of capture so its origin can be verified later. Camera makers and platforms are slowly adopting these standards, but coverage is still thin." },
    ],
    related: ["image-video", "what-is-ai"],
  },
  {
    id: "science", group: "Living Landscape", title: "AI in Science",
    kicker: "Living Landscape", read_mins: 7, updated_at: "2026-05-22T00:00:00Z",
    blurb: "From protein folding to materials discovery — where AI is genuinely accelerating research.",
    lede: "Science is where AI's impact is most concrete and least hyped. These systems are compressing years of trial-and-error in the lab into weeks of computation.",
    sections: [
      { position: 0, heading: "Prediction, then validation", body: "The pattern repeating across fields: AI proposes candidates — protein structures, stable materials, drug molecules — and human labs validate the promising ones. It doesn't replace the experiment; it tells you which experiments are worth running." },
      { position: 1, heading: "The reproducibility caveat", body: "Splashy results outpace careful verification. The strongest work pairs AI prediction with rigorous lab confirmation; the weakest treats a model's output as a finding in itself. The distinction matters enormously." },
    ],
    related: ["math", "benchmarks"],
  },
  {
    id: "math", group: "Living Landscape", title: "Mathematics",
    kicker: "Living Landscape", read_mins: 6, updated_at: "2026-05-18T00:00:00Z",
    blurb: "Models went from failing arithmetic to competing at olympiad level. The story is subtler than that.",
    lede: "Math has been a dramatic and slightly misleading benchmark for AI. The headline — 'olympiad gold' — is real, but what it means about everyday reliability is easy to overstate.",
    sections: [
      { position: 0, heading: "Competition math leapt forward", body: "With step-by-step reasoning and tool use, frontier models now solve problems that stump most professional mathematicians. On formal, well-posed problems the progress is genuine and fast." },
      { position: 1, heading: "But basic arithmetic still slips", body: "The same model that proves a hard theorem can fumble a multi-step calculation if it tries to do it in its head. The fix is mundane — let it use a calculator tool — which is exactly how careful users run these systems." },
    ],
    related: ["science", "benchmarks"],
  },
  {
    id: "coding", group: "Living Landscape", title: "Coding",
    kicker: "Living Landscape", read_mins: 8, updated_at: "2026-06-02T00:00:00Z",
    cards_heading: "The main tools",
    youtube_id: "Qnz3Pj3W9JU", youtube_title: "What AI coding agents can really do",
    blurb: "The category that went furthest fastest — from autocomplete to autonomous software work.",
    lede: "If you want to see where AI is most transformative right now, look at software. The tools moved from suggesting the next line to planning and executing changes across an entire codebase.",
    sections: [
      { position: 0, heading: "From autocomplete to agent", body: "The leap of 2026 is autonomy. Modern coding agents read a whole repository, plan a change across many files, run the tests, fix what breaks, and open a pull request — with a developer reviewing rather than typing." },
      { position: 1, heading: "Real results, real limits", body: "Teams report large migrations that once took weeks now finishing in days. The catch is supervision: agents still need a knowledgeable human steering and reviewing. They amplify a good engineer; they don't replace the judgment." },
    ],
    cards: [
      { position: 0, title: "Cursor", body: "A full code editor with AI built into every layer. Its flagship feature edits many files in one pass. Best for developers who live in an editor and want AI embedded in their existing workflow.", note: "Best for maintaining large existing codebases." },
      { position: 1, title: "Windsurf", body: "An editor known for polish and 'environmental awareness' — it tracks what you're doing contextually, not just what you type. The common verdict: rival tools win on features, this one wins on feel.", note: "Best for flow-state feature building." },
      { position: 2, title: "GitHub Copilot", body: "The original AI coding tool and the most widely deployed, with deep GitHub integration across many editors. Less autonomous than the newer agents, but unmatched in reach.", note: "Best for teams already living on GitHub." },
      { position: 3, title: "Lovable / v0 / Bolt", body: "Describe an app in plain language and get a working web app back. These are for founders and non-engineers shipping a prototype or landing page fast.", note: "Best for non-technical builders and quick MVPs." },
    ],
    related: ["text-generation", "frameworks", "anthropic-stack"],
  },
  {
    id: "robotics", group: "Living Landscape", title: "Robotics",
    kicker: "Living Landscape", read_mins: 7, updated_at: "2026-05-12T00:00:00Z",
    blurb: "The same models that write text are starting to control bodies. The bottleneck moved to the physical world.",
    lede: "The surprise of the last year is that the language-model recipe — train on huge amounts of data, predict the next step — works for physical movement too. The hard part is no longer the brain; it's the body and the data to train it.",
    sections: [
      { position: 0, heading: "Generalist control is emerging", body: "Instead of programming a robot for one rigid task, researchers now train broad models that can attempt many physical tasks from instruction and demonstration. Early, clumsy, but unmistakably a different paradigm than the factory arms of the past." },
      { position: 1, heading: "Why progress feels slower", body: "Bits are cheap; atoms are not. You can't scrape the physical world the way you scrape text, every mistake has a real-world cost, and hardware iterates in months, not minutes. Expect this frontier to move at a more human pace." },
    ],
    related: ["science", "what-is-ai"],
  },
  {
    id: "anthropic-stack", group: "Living Landscape", title: "The Anthropic Stack",
    kicker: "Living Landscape · Ecosystem", read_mins: 7, updated_at: "2026-05-29T00:00:00Z",
    cards_heading: "The pieces",
    blurb: "One company ships much of the toolkit this site keeps pointing at. Here it is in plain terms.",
    lede: "Anthropic makes Claude — but in 2026 it ships an entire integrated product stack, not just a chatbot. These are the pieces you'll hear named most often, and what each one actually is.",
    cards: [
      { position: 0, title: "Claude (claude.ai)", body: "The chat interface most people start with. The model family ranges from a fast, cheap everyday option to a slower, most-capable one — and now holds enormous documents, a whole codebase or several books, in a single conversation.", note: "If you've used an AI chatbot, you've used something like this." },
      { position: 1, title: "MCP — Model Context Protocol", body: "An open standard for connecting AI to outside tools. Before it, every integration was custom code; now it works like USB-C — build once, plug into anything that speaks it. It quietly became an industry standard.", note: "Boring-sounding; arguably the most strategically important piece." },
      { position: 2, title: "Claude Code", body: "A coding agent that lives in the terminal. It reads a whole codebase, plans changes across many files, runs the tests, and opens a pull request — with a developer reviewing rather than typing every line.", note: "Autonomous software work, not autocomplete." },
      { position: 3, title: "Cowork", body: "A desktop agent aimed at non-developers — it opens apps, clicks through interfaces, and handles file-and-task chores. Still early.", note: "The 'AI assistant for everyone' idea." },
      { position: 4, title: "Skills", body: "Installable capability packs — bundles of instructions, memory, and connectors for one kind of work. You can build your own, which is how a general assistant gets good at your specific tasks.", note: "Reusable playbooks an assistant loads on demand." },
    ],
    related: ["coding", "key-terms", "frameworks"],
  },
  {
    id: "agent-platforms", group: "Living Landscape", title: "Agent Platforms",
    kicker: "Living Landscape · Open source", read_mins: 7, updated_at: "2026-05-27T00:00:00Z",
    cards_heading: "What's out there",
    blurb: "Self-hosted agents that run on your own machine, remember things, and work around the clock.",
    lede: "Beyond the polished products there's a louder, rougher world: self-hosted agents that live on your own machine, remember things, and run 24/7. Big community energy — and real security risks.",
    cards: [
      { position: 0, title: "OpenClaw", body: "Started as a weekend project and became one of the most-starred projects on GitHub. It connects an AI to dozens of messaging apps and a library of installable skills.", note: "Unmatched reach; security genuinely requires caution." },
      { position: 1, title: "Hermes Agent", body: "Its key idea is self-improvement: after each complex task it writes itself a note on what worked, building a personal skill library over time.", note: "Compounding knowledge is the interesting part." },
      { position: 2, title: "Running them together", body: "Power users pair a 'planner' that coordinates with an 'executor' that runs fast task loops. Costs range from about a dollar a day on budget models to far more on top-tier ones for heavy use.", note: "The closest thing to an 'AI employee' outside enterprise tools." },
      { position: 3, title: "The reality check", body: "The '1,000 agents' headlines are mostly hype. The hard part isn't the agent — it's the plumbing. Sessions break, memory is patchy, security is real.", note: "If yours feels flaky, you're in good company." },
    ],
    related: ["anthropic-stack", "frameworks", "big-picture"],
  },
  {
    id: "frameworks", group: "Living Landscape", title: "Builder's Frameworks",
    kicker: "Living Landscape · For developers", read_mins: 6, updated_at: "2026-05-20T00:00:00Z",
    cards_heading: "The toolkits",
    blurb: "The toolkits developers use to build agents. You don't need to master them — recognizing the names helps.",
    lede: "If you want to build agents rather than just use them, these are the underlying toolkits. You don't need to master any of them — but knowing the names helps you follow the conversation and judge what's possible.",
    cards: [
      { position: 0, title: "LangChain / LangGraph", body: "The most mature and most documented framework. Its graph approach lets you define an agent's work as explicit, debuggable steps — best when you need complex branching logic.", note: "Most tutorials. Start here if you're learning." },
      { position: 1, title: "CrewAI", body: "Purpose-built for multiple agents working together. You define roles — Researcher, Writer, Editor — and they collaborate on a task.", note: "Best for work that feels like team handoffs." },
      { position: 2, title: "AutoGen", body: "Microsoft's framework for multi-agent conversations, where agents talk to each other to solve problems. Enterprise-backed.", note: "Best for Microsoft-stack organizations." },
      { position: 3, title: "Anthropic Agent SDK", body: "Anthropic's own production-ready toolkit for building agents on Claude — newer, cleaner, with built-in tool execution and orchestration.", note: "Best for Claude-native products." },
    ],
    related: ["anthropic-stack", "agent-platforms", "coding"],
  },
  {
    id: "big-picture", group: "Living Landscape", title: "Signal vs. Hype",
    kicker: "Living Landscape · The honest view", read_mins: 7, updated_at: "2026-05-26T00:00:00Z",
    cards_heading: "The honest read",
    blurb: "What's actually working, what's still rough, and what's genuinely coming. The calibrated read.",
    lede: "The most useful thing a guide like this can offer is a calibrated sense of where AI actually is — not the breathless version, and not the dismissive one. Here's the honest read as of mid-2026.",
    cards: [
      { position: 0, title: "What's actually working", body: "Code generation and refactoring are genuinely transforming software teams. Feeding your own documents to AI is in production everywhere. Single, bounded automations are reliable today.", note: "Real, dependable, here now." },
      { position: 1, title: "What's maturing (but rough)", body: "Multiple agents coordinating is real but fragile. Memory across sessions is inconsistent. Long, hands-off tasks still fail more than they succeed.", note: "Promising, but set expectations carefully." },
      { position: 2, title: "What's coming (12–24 months)", body: "AI that reliably clicks through any interface. Agents that review their own past sessions overnight and improve. The gap between 'demo' and 'production-reliable' is closing fast.", note: "The wave worth positioning for." },
      { position: 3, title: "Where the real value is", body: "Most organizations know they need AI but have little idea what's possible or where to start. The gap between what exists and what's actually deployed is enormous.", note: "Understanding the landscape is most of the battle." },
    ],
    related: ["agent-platforms", "frameworks", "benchmarks"],
  },
  {
    id: "benchmarks", group: "Living Landscape", title: "Benchmarks",
    kicker: "Living Landscape", read_mins: 6, updated_at: "2026-05-15T00:00:00Z",
    blurb: "How we measure progress — and why the numbers deserve more skepticism than they get.",
    lede: "Every model launch arrives with a chart showing it beating the last one. Reading those charts well is its own skill — and a useful inoculation against hype.",
    sections: [
      { position: 0, heading: "What benchmarks actually measure", body: "Most are fixed sets of questions with known answers. They're useful for rough comparison, but a high score on a public test can mean the model is capable — or simply that the test leaked into its training data." },
      { position: 1, heading: "The gap that matters", body: "The honest question isn't 'what did it score' but 'does it hold up on my work, on examples it has never seen.' Private, task-specific evaluation beats any public leaderboard for deciding what to actually deploy." },
    ],
    related: ["text-generation", "math", "big-picture"],
  },
]

// ── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding', process.env.NEXT_PUBLIC_SUPABASE_URL)

  for (const page of PAGES) {
    const { sections, cards, related, ...pageRow } = page

    // Upsert page
    const { error: pageErr } = await supabase
      .from('pages')
      .upsert({ ...pageRow }, { onConflict: 'id' })
    if (pageErr) { console.error('Page error:', page.id, pageErr.message); continue }

    // Sections
    if (sections?.length) {
      await supabase.from('page_sections').delete().eq('page_id', page.id)
      const { error } = await supabase.from('page_sections')
        .insert(sections.map(s => ({ ...s, page_id: page.id })))
      if (error) console.error('Sections error:', page.id, error.message)
    }

    // Cards
    if (cards?.length) {
      await supabase.from('page_cards').delete().eq('page_id', page.id)
      const { error } = await supabase.from('page_cards')
        .insert(cards.map(c => ({ ...c, page_id: page.id })))
      if (error) console.error('Cards error:', page.id, error.message)
    }

    // Related
    if (related?.length) {
      await supabase.from('page_related').delete().eq('page_id', page.id)
      const { error } = await supabase.from('page_related')
        .insert(related.map(r => ({ page_id: page.id, related_id: r })))
      if (error) console.error('Related error:', page.id, error.message)
    }

    console.log('✓', page.id)
  }

  console.log('\nDone.')
}

seed()
