// sp-data.jsx — Sugarpine sample content. Assigns window.SP_DATA.
// Realistic-but-refinable copy. "today" anchored to June 2026.
// Card content adapted from the v1 ai-landscape deployment, retuned for a general reader.

const TODAY = new Date("2026-06-03");
function daysAgo(dateStr) {
  const d = new Date(dateStr);
  return Math.round((TODAY - d) / 86400000);
}
function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
function relTime(dateStr) {
  const d = daysAgo(dateStr);
  if (d <= 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 7) return d + " days ago";
  if (d < 14) return "last week";
  if (d < 60) return Math.round(d / 7) + " weeks ago";
  return Math.round(d / 30) + " months ago";
}

// ── Start-here / AI 101 ────────────────────────────────────────────────
const PRIMER = [
  {
    id: "what-is-ai",
    group: "Start here",
    title: "What AI Actually Is",
    kicker: "AI 101",
    blurb: "No math, no jargon. A plain-language picture of what these systems are — and what they aren't.",
    updated: "2026-05-28",
    readMins: 6,
    lede: "Strip away the headlines and modern AI is a strikingly simple idea applied at enormous scale: a program that has read a very large amount of text and learned to predict what comes next. Everything else — the chatbots, the agents, the coding tools — is built on top of that one trick.",
    sections: [
      { heading: "It learned by reading, not by being told", body: "Nobody hand-wrote the rules for how these systems answer questions. Instead, a model was shown an enormous library of human writing and asked, over and over, to guess the next word. Get it wrong, adjust slightly, try again — billions of times. What emerges is a system that has absorbed patterns of grammar, fact, reasoning, and style without ever being explicitly taught any of them." },
      { heading: "It predicts, it doesn't 'know'", body: "When you ask a question, the model isn't looking up an answer in a database. It's generating a plausible continuation, one word at a time, based on everything it absorbed during training. That's why it can be fluent and confidently wrong in the same breath — a failure mode worth keeping in mind every time you use one." },
      { heading: "Why it suddenly got good", body: "The recipe didn't change much; the scale did. More data, more computing power, and better training methods pushed these systems past a threshold where they became genuinely useful for everyday work. The jump from 'amusing toy' to 'tool I rely on' happened in roughly three years." },
    ],
    related: ["key-terms", "text-generation", "coding"],
  },
  {
    id: "key-terms",
    group: "Start here",
    title: "The Words People Use",
    kicker: "AI 101 · Glossary",
    blurb: "LLM, agent, tool, skill, MCP, RAG — the words you need to follow any AI conversation.",
    updated: "2026-05-30",
    readMins: 7,
    lede: "Most AI conversations are gatekept by a handful of terms. Learn these six and you can follow almost any discussion — and tell when someone is overselling.",
    cardsHeading: "The vocabulary",
    cards: [
      { title: "LLM — Large Language Model", body: "The core engine. Text in, text out. Claude, GPT-5, and Gemini are all LLMs. They're getting smarter and cheaper every few months, and everything else is built on top of them.", note: "Like electricity — raw capability that needs to be wired into something useful." },
      { title: "Agent", body: "A model given tools and a goal, then left to work. Rather than answering one question, it plans steps, takes actions, checks its own results, and keeps going until the job is done.", note: "The difference between asking someone a question and hiring them to finish a project." },
      { title: "Tool", body: "A specific action you let a model take: search the web, read a file, run code, send an email. Each tool is one concrete capability you hand it.", note: "A model without tools is a brain in a jar. Tools are the hands." },
      { title: "Skill", body: "A reusable instruction set — a saved playbook for one kind of task. 'How to research a company,' 'how to draft a cold email.' Skills let an assistant get reliably better at the work you actually do.", note: "A growing skill library is a more capable assistant." },
      { title: "MCP — Model Context Protocol", body: "An open standard for plugging AI into outside tools. Before it, every integration was bespoke glue code. Now it works more like USB-C: build once, connect to anything that speaks it.", note: "Quietly one of the most important pieces of the whole stack." },
      { title: "RAG — Retrieval-Augmented Generation", body: "A way to ground answers in your own documents. The system looks up relevant passages first, then writes its answer from them — which keeps it current and cuts down on confident guessing.", note: "How AI answers questions about your specific material." },
    ],
    related: ["what-is-ai", "anthropic-stack", "benchmarks"],
  },
];

// ── Living Landscape ───────────────────────────────────────────────────
const TOPICS = [
  {
    id: "text-generation",
    group: "Living Landscape",
    title: "Text Generation",
    kicker: "Living Landscape",
    blurb: "Where writing, reasoning, and conversation actually stand — and what changed this quarter.",
    updated: "2026-06-01",
    readMins: 8,
    lede: "Text was the first thing these systems did well, and it remains the deepest. In 2026 the frontier moved from 'writes a clean paragraph' to 'holds a coherent line of reasoning across an entire book-length document.'",
    sections: [
      { heading: "Context windows got enormous", body: "The leading models now hold roughly a million words in working memory at once — an entire codebase, a quarter's worth of email, or several novels. The practical effect: you stop summarizing things for the model and simply hand it everything." },
      { heading: "Reasoning you can watch", body: "Newer models 'think' before answering, working through a problem in visible steps. It's slower and costs more, but for anything involving logic, planning, or multi-part instructions, the quality gap over instant answers is large." },
      { heading: "The reliability ceiling", body: "Fluency is solved; trustworthiness is not. Models still fabricate citations, numbers, and quotes with total confidence. The teams getting real value treat output as a fast first draft from a brilliant, slightly unreliable assistant — never as a finished source of truth." },
    ],
    related: ["coding", "benchmarks", "key-terms"],
    youtube: { id: "aircAruvnKk", title: "How large language models actually work" },
  },
  {
    id: "image-video",
    group: "Living Landscape",
    title: "Image & Video",
    kicker: "Living Landscape",
    blurb: "Generated imagery crossed the realism line; video is months behind and closing fast.",
    updated: "2026-05-31",
    readMins: 7,
    lede: "Two years ago AI images had a tell — too many fingers, melted text, an uncanny gloss. In 2026 a still image from a frontier model is, for most people in most contexts, indistinguishable from a photograph.",
    sections: [
      { heading: "Stills crossed the line", body: "Hands, text, reflections, and fine detail — the old giveaways — are largely fixed. The remaining limits are about direction and consistency: getting exactly the composition you pictured, and keeping a character identical across a dozen images." },
      { heading: "Video is the live frontier", body: "Minute-long clips with coherent motion, lighting, and a consistent cast are now possible from a text prompt. The rough edges are physics and continuity — objects that drift, hands that morph between cuts — but each release narrows the gap." },
    ],
    related: ["deepfakes", "text-generation"],
  },
  {
    id: "deepfakes",
    group: "Living Landscape",
    title: "Deepfakes & Authenticity",
    kicker: "Living Landscape",
    blurb: "When anything can be faked convincingly, the question shifts from detection to provenance.",
    updated: "2026-05-25",
    readMins: 6,
    lede: "The uncomfortable reality of 2026 is that a convincing fake of almost anyone, saying almost anything, can be produced in minutes. The defense is shifting away from spotting fakes and toward proving what's real.",
    sections: [
      { heading: "Detection is a losing race", body: "Every detector that works today is training data for the next generation of fakes. Tools that flag synthetic media are useful, but treating them as a reliable filter is a mistake — the gap between generator and detector keeps closing." },
      { heading: "Provenance is the real answer", body: "The more durable approach is cryptographic: signing content at the moment of capture so its origin can be verified later. Camera makers and platforms are slowly adopting these standards, but coverage is still thin." },
    ],
    related: ["image-video", "what-is-ai"],
  },
  {
    id: "science",
    group: "Living Landscape",
    title: "AI in Science",
    kicker: "Living Landscape",
    blurb: "From protein folding to materials discovery — where AI is genuinely accelerating research.",
    updated: "2026-05-22",
    readMins: 7,
    lede: "Science is where AI's impact is most concrete and least hyped. These systems are compressing years of trial-and-error in the lab into weeks of computation.",
    sections: [
      { heading: "Prediction, then validation", body: "The pattern repeating across fields: AI proposes candidates — protein structures, stable materials, drug molecules — and human labs validate the promising ones. It doesn't replace the experiment; it tells you which experiments are worth running." },
      { heading: "The reproducibility caveat", body: "Splashy results outpace careful verification. The strongest work pairs AI prediction with rigorous lab confirmation; the weakest treats a model's output as a finding in itself. The distinction matters enormously." },
    ],
    related: ["math", "benchmarks"],
  },
  {
    id: "math",
    group: "Living Landscape",
    title: "Mathematics",
    kicker: "Living Landscape",
    blurb: "Models went from failing arithmetic to competing at olympiad level. The story is subtler than that.",
    updated: "2026-05-18",
    readMins: 6,
    lede: "Math has been a dramatic and slightly misleading benchmark for AI. The headline — 'olympiad gold' — is real, but what it means about everyday reliability is easy to overstate.",
    sections: [
      { heading: "Competition math leapt forward", body: "With step-by-step reasoning and tool use, frontier models now solve problems that stump most professional mathematicians. On formal, well-posed problems the progress is genuine and fast." },
      { heading: "But basic arithmetic still slips", body: "The same model that proves a hard theorem can fumble a multi-step calculation if it tries to do it in its head. The fix is mundane — let it use a calculator tool — which is exactly how careful users run these systems." },
    ],
    related: ["science", "benchmarks"],
  },
  {
    id: "coding",
    group: "Living Landscape",
    title: "Coding",
    kicker: "Living Landscape",
    blurb: "The category that went furthest fastest — from autocomplete to autonomous software work.",
    updated: "2026-06-02",
    readMins: 8,
    lede: "If you want to see where AI is most transformative right now, look at software. The tools moved from suggesting the next line to planning and executing changes across an entire codebase.",
    sections: [
      { heading: "From autocomplete to agent", body: "The leap of 2026 is autonomy. Modern coding agents read a whole repository, plan a change across many files, run the tests, fix what breaks, and open a pull request — with a developer reviewing rather than typing." },
      { heading: "Real results, real limits", body: "Teams report large migrations that once took weeks now finishing in days. The catch is supervision: agents still need a knowledgeable human steering and reviewing. They amplify a good engineer; they don't replace the judgment." },
    ],
    cardsHeading: "The main tools",
    cards: [
      { title: "Cursor", body: "A full code editor with AI built into every layer. Its flagship feature edits many files in one pass. Best for developers who live in an editor and want AI embedded in their existing workflow.", note: "Best for maintaining large existing codebases." },
      { title: "Windsurf", body: "An editor known for polish and 'environmental awareness' — it tracks what you're doing contextually, not just what you type. The common verdict: rival tools win on features, this one wins on feel.", note: "Best for flow-state feature building." },
      { title: "GitHub Copilot", body: "The original AI coding tool and the most widely deployed, with deep GitHub integration across many editors. Less autonomous than the newer agents, but unmatched in reach.", note: "Best for teams already living on GitHub." },
      { title: "Lovable / v0 / Bolt", body: "Describe an app in plain language and get a working web app back. These are for founders and non-engineers shipping a prototype or landing page fast — genuinely useful until real complexity arrives.", note: "Best for non-technical builders and quick MVPs." },
    ],
    related: ["text-generation", "frameworks", "anthropic-stack"],
    youtube: { id: "Qnz3Pj3W9JU", title: "What AI coding agents can really do" },
  },
  {
    id: "robotics",
    group: "Living Landscape",
    title: "Robotics",
    kicker: "Living Landscape",
    blurb: "The same models that write text are starting to control bodies. The bottleneck moved to the physical world.",
    updated: "2026-05-12",
    readMins: 7,
    lede: "The surprise of the last year is that the language-model recipe — train on huge amounts of data, predict the next step — works for physical movement too. The hard part is no longer the brain; it's the body and the data to train it.",
    sections: [
      { heading: "Generalist control is emerging", body: "Instead of programming a robot for one rigid task, researchers now train broad models that can attempt many physical tasks from instruction and demonstration. Early, clumsy, but unmistakably a different paradigm than the factory arms of the past." },
      { heading: "Why progress feels slower", body: "Bits are cheap; atoms are not. You can't scrape the physical world the way you scrape text, every mistake has a real-world cost, and hardware iterates in months, not minutes. Expect this frontier to move at a more human pace." },
    ],
    related: ["science", "what-is-ai"],
  },
  {
    id: "anthropic-stack",
    group: "Living Landscape",
    title: "The Anthropic Stack",
    kicker: "Living Landscape · Ecosystem",
    blurb: "One company ships much of the toolkit this site keeps pointing at. Here it is in plain terms.",
    updated: "2026-05-29",
    readMins: 7,
    lede: "Anthropic makes Claude — but in 2026 it ships an entire integrated product stack, not just a chatbot. These are the pieces you'll hear named most often, and what each one actually is.",
    cardsHeading: "The pieces",
    cards: [
      { title: "Claude (claude.ai)", body: "The chat interface most people start with. The model family ranges from a fast, cheap everyday option to a slower, most-capable one — and now holds enormous documents, a whole codebase or several books, in a single conversation.", note: "If you've used an AI chatbot, you've used something like this." },
      { title: "MCP — Model Context Protocol", body: "An open standard for connecting AI to outside tools. Before it, every integration was custom code; now it works like USB-C — build once, plug into anything that speaks it. It quietly became an industry standard.", note: "Boring-sounding; arguably the most strategically important piece." },
      { title: "Claude Code", body: "A coding agent that lives in the terminal. It reads a whole codebase, plans changes across many files, runs the tests, and opens a pull request — with a developer reviewing rather than typing every line.", note: "Autonomous software work, not autocomplete." },
      { title: "Cowork", body: "A desktop agent aimed at non-developers — it opens apps, clicks through interfaces, and handles file-and-task chores. 'Move these invoices into the right folders and email me a summary.' Still early.", note: "The 'AI assistant for everyone' idea." },
      { title: "Skills", body: "Installable capability packs — bundles of instructions, memory, and connectors for one kind of work. You can build your own, which is how a general assistant gets good at your specific tasks.", note: "Reusable playbooks an assistant loads on demand." },
    ],
    related: ["coding", "key-terms", "frameworks"],
  },
  {
    id: "agent-platforms",
    group: "Living Landscape",
    title: "Agent Platforms",
    kicker: "Living Landscape · Open source",
    blurb: "Self-hosted agents that run on your own machine, remember things, and work around the clock.",
    updated: "2026-05-27",
    readMins: 7,
    lede: "Beyond the polished products there's a louder, rougher world: self-hosted agents that live on your own machine, remember things, and run 24/7. Big community energy — and real security risks.",
    cardsHeading: "What's out there",
    cards: [
      { title: "OpenClaw", body: "Started as a weekend project and became one of the most-starred projects on GitHub. It connects an AI to dozens of messaging apps and a library of installable skills, so a personal assistant effectively lives on your computer and talks to you through your phone.", note: "Unmatched reach; security genuinely requires caution." },
      { title: "Hermes Agent", body: "Its key idea is self-improvement: after each complex task it writes itself a note on what worked, building a personal skill library over time. The longer you use it, the better it fits your specific habits.", note: "Compounding knowledge is the interesting part." },
      { title: "Running them together", body: "Power users pair a 'planner' that coordinates with an 'executor' that runs fast task loops. Costs range from about a dollar a day on budget models to far more on top-tier ones for heavy use.", note: "The closest thing to an 'AI employee' outside enterprise tools." },
      { title: "The reality check", body: "The '1,000 agents' headlines are mostly hype. The hard part isn't the agent — it's the plumbing. Sessions break, memory is patchy, security is real. Most people reliably run a handful, not thousands.", note: "If yours feels flaky, you're in good company." },
    ],
    related: ["anthropic-stack", "frameworks", "big-picture"],
  },
  {
    id: "frameworks",
    group: "Living Landscape",
    title: "Builder's Frameworks",
    kicker: "Living Landscape · For developers",
    blurb: "The toolkits developers use to build agents. You don't need to master them — recognizing the names helps.",
    updated: "2026-05-20",
    readMins: 6,
    lede: "If you want to build agents rather than just use them, these are the underlying toolkits. You don't need to master any of them — but knowing the names helps you follow the conversation and judge what's possible.",
    cardsHeading: "The toolkits",
    cards: [
      { title: "LangChain / LangGraph", body: "The most mature and most documented framework. Its graph approach lets you define an agent's work as explicit, debuggable steps — best when you need complex branching logic. Most teams still start here.", note: "Most tutorials. Start here if you're learning." },
      { title: "CrewAI", body: "Purpose-built for multiple agents working together. You define roles — Researcher, Writer, Editor — and they collaborate on a task. Great for workflows that map to a human team.", note: "Best for work that feels like team handoffs." },
      { title: "AutoGen", body: "Microsoft's framework for multi-agent conversations, where agents talk to each other to solve problems. Enterprise-backed and well-suited to corporate IT environments.", note: "Best for Microsoft-stack organizations." },
      { title: "Anthropic Agent SDK", body: "Anthropic's own production-ready toolkit for building agents on Claude — newer, cleaner, with built-in tool execution and orchestration. Increasingly the right starting point if you're building on Claude.", note: "Best for Claude-native products." },
    ],
    related: ["anthropic-stack", "agent-platforms", "coding"],
  },
  {
    id: "big-picture",
    group: "Living Landscape",
    title: "Signal vs. Hype",
    kicker: "Living Landscape · The honest view",
    blurb: "What's actually working, what's still rough, and what's genuinely coming. The calibrated read.",
    updated: "2026-05-26",
    readMins: 7,
    lede: "The most useful thing a guide like this can offer is a calibrated sense of where AI actually is — not the breathless version, and not the dismissive one. Here's the honest read as of mid-2026.",
    cardsHeading: "The honest read",
    cards: [
      { title: "What's actually working", body: "Code generation and refactoring are genuinely transforming software teams. Feeding your own documents to AI is in production everywhere. Single, bounded automations — email triage, data extraction, report drafting — are reliable today.", note: "Real, dependable, here now." },
      { title: "What's maturing (but rough)", body: "Multiple agents coordinating is real but fragile. Memory across sessions is inconsistent. Long, hands-off tasks that run for hours still fail more than they succeed. The 'fully autonomous business' stories are mostly one person with heavy automation.", note: "Promising, but set expectations carefully." },
      { title: "What's coming (12–24 months)", body: "AI that reliably clicks through any interface. Agents that review their own past sessions overnight and improve. Managed multi-agent orchestration as a service. The gap between 'demo' and 'production-reliable' is closing fast.", note: "The wave worth positioning for." },
      { title: "Where the real value is", body: "Most organizations know they need AI but have little idea what's possible or where to start. The gap between what exists and what's actually deployed is enormous — which is exactly where a clear, trustworthy map is worth the most.", note: "Understanding the landscape is most of the battle." },
    ],
    related: ["agent-platforms", "frameworks", "benchmarks"],
  },
  {
    id: "benchmarks",
    group: "Living Landscape",
    title: "Benchmarks",
    kicker: "Living Landscape",
    blurb: "How we measure progress — and why the numbers deserve more skepticism than they get.",
    updated: "2026-05-15",
    readMins: 6,
    lede: "Every model launch arrives with a chart showing it beating the last one. Reading those charts well is its own skill — and a useful inoculation against hype.",
    sections: [
      { heading: "What benchmarks actually measure", body: "Most are fixed sets of questions with known answers. They're useful for rough comparison, but a high score on a public test can mean the model is capable — or simply that the test leaked into its training data." },
      { heading: "The gap that matters", body: "The honest question isn't 'what did it score' but 'does it hold up on my work, on examples it has never seen.' Private, task-specific evaluation beats any public leaderboard for deciding what to actually deploy." },
    ],
    related: ["text-generation", "math", "big-picture"],
  },
];

const ALL = [...PRIMER, ...TOPICS];

window.SP_DATA = {
  TODAY, fmtDate, relTime, daysAgo,
  PRIMER, TOPICS, ALL,
  byId: (id) => ALL.find((p) => p.id === id),
  recent: [...ALL].sort((a, b) => new Date(b.updated) - new Date(a.updated)),
};
