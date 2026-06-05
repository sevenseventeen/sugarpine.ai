// Seed script — run with: node scripts/seed.js
// For prod:              node scripts/seed.js --prod

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const isProd = process.argv.includes('--prod')
const envFile = isProd ? '.env.prod' : '.env.local'

const env = Object.fromEntries(
  readFileSync(envFile, 'utf8').split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => [l.split('=')[0], l.split('=').slice(1).join('=')])
)

console.log(`Seeding ${isProd ? 'PROD' : 'DEV'}:`, env.NEXT_PUBLIC_SUPABASE_URL)

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── Page metadata ─────────────────────────────────────────────────────────────

const PAGES = [
  {
    slug: "ai-glossary", group: "Start here", title: "AI Glossary", position: 1,
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
    related: ["what-is-ai", "the-anthropic-stack", "benchmarks"],
  },
  {
    slug: "what-is-ai", group: "Start here", title: "What is AI?", position: 2,
    kicker: "AI 101", read_mins: 6, updated_at: "2026-05-28T00:00:00Z",
    blurb: "No math, no jargon. A plain-language picture of what these systems are — and what they aren't.",
    lede: "Strip away the headlines and modern AI is a strikingly simple idea applied at enormous scale: a program that has read a very large amount of text and learned to predict what comes next. Everything else — the chatbots, the agents, the coding tools — is built on top of that one trick.",
    sections: [
      { position: 0, heading: "It learned by reading, not by being told", body: "Nobody hand-wrote the rules for how these systems answer questions. Instead, a model was shown an enormous library of human writing and asked, over and over, to guess the next word. Get it wrong, adjust slightly, try again — billions of times. What emerges is a system that has absorbed patterns of grammar, fact, reasoning, and style without ever being explicitly taught any of them." },
      { position: 1, heading: "It predicts, it doesn't 'know'", body: "When you ask a question, the model isn't looking up an answer in a database. It's generating a plausible continuation, one word at a time, based on everything it absorbed during training. That's why it can be fluent and confidently wrong in the same breath — a failure mode worth keeping in mind every time you use one." },
      { position: 2, heading: "Why it suddenly got good", body: "The recipe didn't change much; the scale did. More data, more computing power, and better training methods pushed these systems past a threshold where they became genuinely useful for everyday work. The jump from 'amusing toy' to 'tool I rely on' happened in roughly three years." },
    ],
    related: ["ai-glossary", "text-generation", "coding"],
  },
  { slug: "text-generation",          group: "Living Landscape", title: "Text Generation",          position: 3,  kicker: "Living Landscape",                   read_mins: 8, updated_at: "2026-06-01T00:00:00Z", youtube_id: "aircAruvnKk", youtube_title: "How large language models actually work", blurb: "Where writing, reasoning, and conversation actually stand — and what changed this quarter.", lede: "Text was the first thing these systems did well, and it remains the deepest. The frontier moved from 'writes a clean paragraph' to 'holds a coherent argument across an entire book-length document.'", related: ["coding", "benchmarks", "ai-glossary"] },
  { slug: "image-and-video",          group: "Living Landscape", title: "Image & Video",            position: 4,  kicker: "Living Landscape",                   read_mins: 7, updated_at: "2026-05-31T00:00:00Z", blurb: "Generated imagery crossed the realism line; video is months behind and closing fast.", lede: "Two years ago AI images had a tell — too many fingers, melted text, an uncanny gloss. In 2026 a still image from a frontier model is, for most people in most contexts, indistinguishable from a photograph.", related: ["deepfakes-and-authenticity", "text-generation"] },
  { slug: "deepfakes-and-authenticity", group: "Living Landscape", title: "Deepfakes & Authenticity", position: 5, kicker: "Living Landscape",                  read_mins: 6, updated_at: "2026-05-25T00:00:00Z", blurb: "When anything can be faked convincingly, the question shifts from detection to provenance.", lede: "The uncomfortable reality of 2026 is that a convincing fake of almost anyone, saying almost anything, can be produced in minutes. The defense is shifting away from spotting fakes and toward proving what's real.", related: ["image-and-video", "what-is-ai"] },
  { slug: "ai-in-science",            group: "Living Landscape", title: "AI in Science",            position: 6,  kicker: "Living Landscape",                   read_mins: 7, updated_at: "2026-05-22T00:00:00Z", blurb: "From protein folding to materials discovery — where AI is genuinely accelerating research.", lede: "Science is where AI's impact is most concrete and least hyped. These systems are compressing years of trial-and-error in the lab into weeks of computation.", related: ["mathematics", "benchmarks"] },
  { slug: "mathematics",              group: "Living Landscape", title: "Mathematics",              position: 7,  kicker: "Living Landscape",                   read_mins: 6, updated_at: "2026-05-18T00:00:00Z", blurb: "Models went from failing arithmetic to competing at olympiad level. The story is subtler than that.", lede: "Math has been a dramatic and slightly misleading benchmark for AI. The headline — 'olympiad gold' — is real, but what it means about everyday reliability is easy to overstate.", related: ["ai-in-science", "benchmarks"] },
  { slug: "coding",                   group: "Living Landscape", title: "Coding",                   position: 8,  kicker: "Living Landscape",                   read_mins: 8, updated_at: "2026-06-02T00:00:00Z", youtube_id: "Qnz3Pj3W9JU", youtube_title: "What AI coding agents can really do", cards_heading: "The main tools", blurb: "The category that went furthest fastest — from autocomplete to autonomous software work.", lede: "If you want to see where AI is most transformative right now, look at software. The tools moved from suggesting the next line to planning and executing changes across an entire codebase.", related: ["text-generation", "builders-frameworks", "the-anthropic-stack"] },
  { slug: "robotics",                 group: "Living Landscape", title: "Robotics",                 position: 9,  kicker: "Living Landscape",                   read_mins: 7, updated_at: "2026-05-12T00:00:00Z", blurb: "The same models that write text are starting to control bodies. The bottleneck moved to the physical world.", lede: "The surprise of the last year is that the language-model recipe — train on huge amounts of data, predict the next step — works for physical movement too. The hard part is no longer the brain; it's the body and the data to train it.", related: ["ai-in-science", "what-is-ai"] },
  { slug: "the-anthropic-stack",      group: "Living Landscape", title: "The Anthropic Stack",      position: 10, kicker: "Living Landscape · Ecosystem",        read_mins: 7, updated_at: "2026-05-29T00:00:00Z", cards_heading: "The pieces", blurb: "One company ships much of the toolkit this site keeps pointing at. Here it is in plain terms.", lede: "Anthropic makes Claude — but in 2026 it ships an entire integrated product stack, not just a chatbot. These are the pieces you'll hear named most often, and what each one actually is.", related: ["coding", "ai-glossary", "builders-frameworks"] },
  { slug: "agent-platforms",          group: "Living Landscape", title: "Agent Platforms",          position: 11, kicker: "Living Landscape · Open source",      read_mins: 7, updated_at: "2026-05-27T00:00:00Z", cards_heading: "What's out there", blurb: "Self-hosted agents that run on your own machine, remember things, and work around the clock.", lede: "Beyond the polished products there's a louder, rougher world: self-hosted agents that live on your own machine, remember things, and run 24/7. Big community energy — and real security risks.", related: ["the-anthropic-stack", "builders-frameworks", "signal-vs-hype"] },
  { slug: "builders-frameworks",      group: "Living Landscape", title: "Builder's Frameworks",     position: 12, kicker: "Living Landscape · For developers",   read_mins: 6, updated_at: "2026-05-20T00:00:00Z", cards_heading: "The toolkits", blurb: "The toolkits developers use to build agents. You don't need to master them — recognizing the names helps.", lede: "If you want to build agents rather than just use them, these are the underlying toolkits. You don't need to master any of them — but knowing the names helps you follow the conversation and judge what's possible.", related: ["the-anthropic-stack", "agent-platforms", "coding"] },
  { slug: "signal-vs-hype",           group: "Living Landscape", title: "Signal vs. Hype",          position: 13, kicker: "Living Landscape · The honest view",  read_mins: 7, updated_at: "2026-05-26T00:00:00Z", cards_heading: "The honest read", blurb: "What's actually working, what's still rough, and what's genuinely coming. The calibrated read.", lede: "The most useful thing a guide like this can offer is a calibrated sense of where AI actually is — not the breathless version, and not the dismissive one. Here's the honest read as of mid-2026.", related: ["agent-platforms", "builders-frameworks", "benchmarks"] },
  { slug: "benchmarks",               group: "Living Landscape", title: "Benchmarks",               position: 14, kicker: "Living Landscape",                   read_mins: 6, updated_at: "2026-05-15T00:00:00Z", blurb: "How we measure progress — and why the numbers deserve more skepticism than they get.", lede: "Every model launch arrives with a chart showing it beating the last one. Reading those charts well is its own skill — and a useful inoculation against hype.", related: ["text-generation", "mathematics", "signal-vs-hype"] },
]

// Cards / sections for Start here pages only (Living Landscape uses entries instead)
const PRIMER_SECTIONS = {
  "what-is-ai": [
    { position: 0, heading: "It learned by reading, not by being told", body: "Nobody hand-wrote the rules for how these systems answer questions. Instead, a model was shown an enormous library of human writing and asked, over and over, to guess the next word. Get it wrong, adjust slightly, try again — billions of times. What emerges is a system that has absorbed patterns of grammar, fact, reasoning, and style without ever being explicitly taught any of them." },
    { position: 1, heading: "It predicts, it doesn't 'know'", body: "When you ask a question, the model isn't looking up an answer in a database. It's generating a plausible continuation, one word at a time, based on everything it absorbed during training. That's why it can be fluent and confidently wrong in the same breath — a failure mode worth keeping in mind every time you use one." },
    { position: 2, heading: "Why it suddenly got good", body: "The recipe didn't change much; the scale did. More data, more computing power, and better training methods pushed these systems past a threshold where they became genuinely useful for everyday work. The jump from 'amusing toy' to 'tool I rely on' happened in roughly three years." },
  ],
}

const PRIMER_CARDS = {
  "ai-glossary": [
    { position: 0, title: "LLM — Large Language Model", body: "The core engine. Text in, text out. Claude, GPT-5, and Gemini are all LLMs. They're getting smarter and cheaper every few months, and everything else is built on top of them.", note: "Like electricity — raw capability that needs to be wired into something useful." },
    { position: 1, title: "Agent", body: "A model given tools and a goal, then left to work. Rather than answering one question, it plans steps, takes actions, checks its own results, and keeps going until the job is done.", note: "The difference between asking someone a question and hiring them to finish a project." },
    { position: 2, title: "Tool", body: "A specific action you let a model take: search the web, read a file, run code, send an email. Each tool is one concrete capability you hand it.", note: "A model without tools is a brain in a jar. Tools are the hands." },
    { position: 3, title: "Skill", body: "A reusable instruction set — a saved playbook for one kind of task. 'How to research a company,' 'how to draft a cold email.' Skills let an assistant get reliably better at the work you actually do.", note: "A growing skill library is a more capable assistant." },
    { position: 4, title: "MCP — Model Context Protocol", body: "An open standard for plugging AI into outside tools. Before it, every integration was bespoke glue code. Now it works more like USB-C: build once, connect to anything that speaks it.", note: "Quietly one of the most important pieces of the whole stack." },
    { position: 5, title: "RAG — Retrieval-Augmented Generation", body: "A way to ground answers in your own documents. The system looks up relevant passages first, then writes its answer from them — which keeps it current and cuts down on confident guessing.", note: "How AI answers questions about your specific material." },
  ],
}

// ── State of the Art summaries (one per Living Landscape page) ────────────────

const SUMMARIES = [
  {
    page_slug: "text-generation", period: "June 2026", is_current: true,
    today: "Leading text models can hold roughly a million words in working memory, reason step-by-step through problems in visible stages, and produce writing that's difficult to distinguish from expert human output in many domains. The frontier moved decisively from 'writes a clean paragraph' to 'holds a coherent argument across a book-length document.'",
    near_future: "Context windows will continue expanding while inference costs fall. Reasoning will become fast enough to use by default rather than only on difficult problems. Expect text models to handle most routine knowledge work reliably within 12 months.",
    bold_visions: "Models that maintain coherent context across weeks of interaction — a working memory spanning an entire project from kickoff to delivery. Writing indistinguishable from any domain expert, not just in prose quality but in accuracy and depth of ideas.",
  },
  {
    page_slug: "image-and-video", period: "June 2026", is_current: true,
    today: "Generated images crossed the photorealism line in late 2025 and haven't looked back. The classic tells — too many fingers, melted text, uncanny gloss — are largely solved in frontier models. Video is following 12-18 months behind, with coherent minute-long clips now possible but physics and continuity still rough.",
    near_future: "Video generation will reach the realism bar images crossed in 2025. Consistent characters across an entire video — the key unsolved problem — will be cracked within a year. Image generation is becoming a commodity; the value is shifting to control and consistency.",
    bold_visions: "On-demand video production at feature-film quality from a text prompt. A single person producing what currently requires a production crew of dozens.",
  },
  {
    page_slug: "deepfakes-and-authenticity", period: "June 2026", is_current: true,
    today: "A convincing fake of almost anyone, saying almost anything, can be produced in minutes. Detection tools exist but are losing a structural arms race — every detector that works today becomes training data for better fakes. The defensive response has shifted from 'spot the fake' to 'prove the real.'",
    near_future: "Cryptographic provenance standards (C2PA and similar) will see wider adoption as camera makers and platforms respond to regulatory pressure. Detection will become a tool for flagging rather than certifying — useful context, not a reliable verdict.",
    bold_visions: "A world where every piece of media carries a verifiable chain of custody from capture to distribution, making fabrication not impossible but auditable. The question shifts from 'is this real?' to 'can we trace where it came from?'",
  },
  {
    page_slug: "ai-in-science", period: "June 2026", is_current: true,
    today: "AI is compressing years of lab trial-and-error into weeks of computation across protein folding, drug discovery, and materials science. The pattern repeating across fields: AI proposes candidates, human labs validate the promising ones. It doesn't replace the experiment — it tells you which experiments are worth running.",
    near_future: "AI-designed molecules will enter clinical trials in meaningful numbers. The reproducibility gap will narrow as labs adopt AI-assisted verification workflows. Expect breakthroughs to cluster in fields where good training data already exists.",
    bold_visions: "AI as a full scientific collaborator — generating hypotheses, designing experiments, interpreting results, and iterating on its own findings. Compressing decades of progress in materials and medicine into years.",
  },
  {
    page_slug: "mathematics", period: "June 2026", is_current: true,
    today: "Frontier models with step-by-step reasoning now solve olympiad-level problems that stump most professional mathematicians. The progress on formal, well-posed problems is genuine and fast. The caveat: the same model can fumble a multi-step arithmetic problem if it tries to compute in its head rather than using a calculator tool.",
    near_future: "Formal proof verification will become a standard part of math AI workflows, catching errors that fluent-but-wrong generation currently misses. Expect AI to become a genuine collaborator on unsolved problems rather than a test-passer.",
    bold_visions: "AI that independently discovers and proves significant new mathematical results — not as a benchmark exercise but as a working member of a research team, opening territory humans hadn't thought to explore.",
  },
  {
    page_slug: "coding", period: "June 2026", is_current: true,
    today: "AI coding tools moved decisively from autocomplete to autonomy in 2026. Modern agents read a whole repository, plan changes across many files, run the tests, fix what breaks, and open a pull request — with a developer reviewing rather than typing. Teams are reporting large migrations that once took weeks finishing in days.",
    near_future: "Agents will handle increasingly open-ended tasks: debugging production incidents, reviewing entire codebases for security issues, implementing features from a product spec with minimal hand-holding. The developer's role shifts from writing to directing and reviewing.",
    bold_visions: "Software that maintains itself — catching and fixing its own bugs, refactoring for performance, updating dependencies, and adapting to changing requirements without a human in the loop for routine changes.",
  },
  {
    page_slug: "robotics", period: "June 2026", is_current: true,
    today: "The language-model training recipe — learn from enormous amounts of data, predict the next step — is starting to work for physical movement. Generalist robots that can attempt many tasks from instruction and demonstration are emerging from research labs. Early, clumsy, but unmistakably a different paradigm from the rigid factory arms of the past.",
    near_future: "Hardware iteration will accelerate as the software stack matures. Expect warehouse and logistics robots to reach reliable general-purpose capability first — constrained environments with high economic incentive. Household and field robotics will follow.",
    bold_visions: "Robots with genuine physical common sense — able to navigate novel situations, handle unexpected objects, and recover from failure the way a skilled human worker would. The point where physical labor becomes as automatable as knowledge work.",
  },
  {
    page_slug: "the-anthropic-stack", period: "June 2026", is_current: true,
    today: "Anthropic has shipped an integrated product stack around Claude: a consumer chat product, an API, a coding agent (Claude Code), a desktop agent for non-developers (Cowork), the MCP open standard, and a Skills system for installable capability packs. The stack is increasingly interconnected, with each piece designed to work with the others.",
    near_future: "MCP will continue consolidating as the industry standard for AI-to-tool connectivity. Expect Claude Code to expand from coding tasks to broader engineering work — infrastructure, security, debugging production systems. Cowork will mature as the ambient AI layer for non-technical users.",
    bold_visions: "An AI that seamlessly handles the full range of a knowledge worker's day — writing, research, coding, scheduling, communication — with each tool aware of what the others are doing, creating a genuinely integrated intelligence layer over all software.",
  },
  {
    page_slug: "agent-platforms", period: "June 2026", is_current: true,
    today: "Self-hosted agent platforms have a large and enthusiastic community, with tools like OpenClaw reaching millions of installs. The appeal is real: persistent memory, 24/7 operation, deep customization. The reality is also real: sessions break, memory is patchy, security requires genuine caution.",
    near_future: "Reliability will improve as the community matures and best practices solidify. Memory and session persistence — the current weak spots — will see dedicated tooling. Enterprise-grade self-hosted deployments will become more viable.",
    bold_visions: "Fleets of specialized agents working in concert, each with a defined role and deep domain memory, orchestrated by a planner agent that assigns work and synthesizes results. The 'AI employee' concept moving from demo to deployed reality.",
  },
  {
    page_slug: "builders-frameworks", period: "June 2026", is_current: true,
    today: "The frameworks for building agents — LangChain, CrewAI, AutoGen, Anthropic's own Agent SDK — have matured considerably. Each has found a niche: LangChain for complex branching logic, CrewAI for multi-agent collaboration, AutoGen for enterprise Microsoft stacks, and the Anthropic SDK for Claude-native products with the cleanest production story.",
    near_future: "Framework consolidation is coming. The current fragmentation will narrow as teams find which abstractions actually hold up in production and which add complexity without payoff. Expect MCP to absorb many bespoke integration layers.",
    bold_visions: "A world where building a capable AI agent is as straightforward as building a web app — well-understood patterns, reliable primitives, and a mature ecosystem of components that just work together.",
  },
  {
    page_slug: "signal-vs-hype", period: "June 2026", is_current: true,
    today: "The honest calibration as of mid-2026: AI is genuinely transforming software development, making document-based knowledge work dramatically faster, and producing reliable results for single, bounded automation tasks. Multiple coordinating agents, persistent memory, and long autonomous tasks are real but fragile — promising, not production-ready.",
    near_future: "The gap between demo and deployment will narrow significantly. Memory and session reliability will improve. Expect the 'works in production' list to grow from a handful of use cases to dozens over the next 18 months.",
    bold_visions: "The thing worth positioning for: AI that handles the full cognitive load of a skilled professional across extended, open-ended work. Not there yet — but the trajectory is unmistakable to anyone watching closely.",
  },
  {
    page_slug: "benchmarks", period: "June 2026", is_current: true,
    today: "Benchmark scores dominate AI coverage, but the relationship between a score and real-world usefulness is weaker than it looks. Most benchmarks are fixed test sets — and a high score can mean the model is genuinely capable, or that the test leaked into training data. The leading labs have largely stopped claiming benchmark wins as primary evidence of progress.",
    near_future: "Private, task-specific evaluations will become the standard for organizations deploying AI seriously. Public benchmarks will remain useful for rough orientation but will be increasingly supplemented with custom held-out test sets.",
    bold_visions: "Standardized evaluation frameworks that actually measure what matters for real work — not just 'can it answer this question' but 'can it do this job reliably, safely, and at scale.' The technical infrastructure for trusting AI outputs at production.",
  },
]

// ── Feed entries (timestamped advances) ───────────────────────────────────────

const ENTRIES = [
  // ── Text Generation ──────────────────────────────────────────────────────────
  {
    page_slug: "text-generation", slug: "context-windows-got-enormous", published_at: "2026-06-01T00:00:00Z",
    title: "Context Windows Got Enormous",
    summary: "The leading models now hold roughly a million words in working memory at once — an entire codebase, a quarter's worth of email, or several novels. The practical effect is that you stop summarizing things for the model and simply hand it everything.",
    body: "The leading models now hold roughly a million words in working memory at once — an entire codebase, a quarter's worth of email, or several novels. The practical effect: you stop summarizing things for the model and simply hand it everything.\n\nThis is a qualitative shift, not just a quantitative one. When context limits were tight, working with AI meant a constant tax of summarization and chunking. That overhead is gone. The model can read the whole project history before responding, track every constraint you've mentioned, and stay consistent across a long conversation in a way that wasn't possible a year ago.\n\nThe race to expand context windows isn't over. Several labs are pushing toward ten million tokens. At some point the limit becomes not what the model can hold but what it can usefully attend to — which is a harder problem, and the one the field is starting to focus on now.",
  },
  {
    page_slug: "text-generation", slug: "reasoning-you-can-watch", published_at: "2026-05-15T00:00:00Z",
    title: "Reasoning You Can Watch",
    summary: "Newer models think before answering, working through a problem in visible steps. It's slower and costs more, but for anything involving logic, planning, or multi-part instructions, the quality gap over instant answers is significant.",
    body: "Newer models think before answering, working through a problem in visible steps you can follow. It's slower and costs more than instant-answer mode — but for anything involving logic, planning, or multi-part instructions, the quality gap is significant.\n\nThe mechanism is simple: the model generates a chain of reasoning tokens before producing its final answer, essentially working through the problem out loud. What's striking is how much this improves outputs on tasks that require holding multiple constraints simultaneously — legal analysis, multi-step math, complex scheduling, nuanced writing.\n\nThe tradeoff is real. Thinking mode can take 20-30 seconds on a difficult problem and costs 3-5x more per query. Most practitioners have settled on a practical rule: use instant mode for drafting and ideation, thinking mode for anything that needs to be right.",
  },
  {
    page_slug: "text-generation", slug: "the-reliability-ceiling", published_at: "2026-05-01T00:00:00Z",
    title: "The Reliability Ceiling",
    summary: "Fluency is solved; trustworthiness is not. Models still fabricate citations, numbers, and quotes with total confidence. Teams getting real value treat output as a fast first draft from a brilliant, slightly unreliable assistant — never as a finished source of truth.",
    body: "Fluency is effectively solved — these models write well. Trustworthiness is a different problem, and progress is slower.\n\nThe failure mode is specific and persistent: confident fabrication. A model will invent a citation, state a wrong number, or quote a person saying something they never said — not hesitantly, but with the same smooth confidence it brings to accurate claims. This isn't a bug that will be patched in the next release. It's structural, rooted in how these systems generate text.\n\nThe teams getting real, durable value from text AI have converged on the same mental model: treat output as a fast first draft from a brilliant, slightly unreliable assistant. Verify anything that matters. Never paste model output directly into a document where accuracy is load-bearing. This isn't a limitation that makes AI less useful — it's just the correct frame for using a tool that excels at speed and fluency while needing human oversight for accuracy.",
  },

  // ── Image & Video ─────────────────────────────────────────────────────────────
  {
    page_slug: "image-and-video", slug: "stills-crossed-the-realism-line", published_at: "2026-05-31T00:00:00Z",
    title: "Stills Crossed the Realism Line",
    summary: "Hands, text, reflections, and fine detail — the old giveaways — are largely fixed in frontier image models. The remaining challenges are about direction and consistency: getting exactly the composition you pictured, and keeping a character identical across images.",
    body: "Hands, text, reflections, and fine detail — the four classic tells of AI-generated imagery — are largely solved in frontier models as of mid-2026. For most people in most contexts, a still image from a top-tier model is indistinguishable from a photograph.\n\nThe practical implications are already playing out. Stock photography is facing an existential question. Marketing teams are generating entire campaigns in hours. The legal and ethical conversations about synthetic media are only beginning.\n\nThe remaining frontier for stills is control and consistency. Getting a model to produce exactly the composition you had in mind — specific lighting, specific angle, specific mood — still requires significant prompt engineering. And keeping a character visually identical across a dozen different images remains unreliable. These are the problems the image labs are focused on now, and both are closer to being solved than the realism problem was a year ago.",
  },
  {
    page_slug: "image-and-video", slug: "video-is-the-live-frontier", published_at: "2026-05-10T00:00:00Z",
    title: "Video Is the Live Frontier",
    summary: "Minute-long clips with coherent motion, lighting, and a consistent cast are now possible from a text prompt. The rough edges are physics and continuity, but each model release narrows the gap considerably.",
    body: "Minute-long video clips with coherent motion, consistent lighting, and recognizable characters are achievable from a text prompt. This is genuinely new — twelve months ago, ten coherent seconds was the benchmark.\n\nThe rough edges are physics and continuity. Objects that drift through walls. Hands that change shape between cuts. A camera move that seems to lose track of what it was filming. These aren't subtle glitches — they're often jarring. But the trajectory is clear: each major release cuts the error rate roughly in half.\n\nThe key unsolved problem is character consistency. You can generate a beautiful clip of a woman walking through a market. Generating a second clip where she's recognizably the same woman is still unreliable. Solving that — what the field calls identity locking — is the milestone that will change video generation from a creative toy into a serious production tool.",
  },

  // ── Deepfakes & Authenticity ──────────────────────────────────────────────────
  {
    page_slug: "deepfakes-and-authenticity", slug: "detection-is-a-losing-race", published_at: "2026-05-25T00:00:00Z",
    title: "Detection Is a Losing Race",
    summary: "Every detector that works today is training data for the next generation of fakes. Tools that flag synthetic media are useful as a first pass, but treating them as a reliable filter is a mistake — the gap between generator and detector keeps closing.",
    body: "Deepfake detectors work — until the fakes get better, which they always do. The structural problem is that every effective detector creates an incentive to generate fakes that fool it, and those fakes become training data for the next generation of generators. It's a treadmill, and the generator is winning.\n\nThis doesn't mean detection tools are useless. They're valuable as a first-pass filter, for flagging content that warrants closer scrutiny, and for catching low-sophistication fakes. The mistake is treating a detection tool as a reliable verdict rather than a probabilistic signal.\n\nThe deeper issue is that detection orients the defense backward — trying to identify what's fake rather than establishing what's real. Provenance-based approaches, which attach a cryptographic record to content at the moment of capture, flip this orientation and don't face the same arms-race dynamic.",
  },
  {
    page_slug: "deepfakes-and-authenticity", slug: "provenance-is-the-real-answer", published_at: "2026-05-08T00:00:00Z",
    title: "Provenance Is the Real Answer",
    summary: "The more durable defense is cryptographic: signing content at the moment of capture so its origin can be verified later. Camera makers and platforms are slowly adopting these standards, but coverage is still thin.",
    body: "The Coalition for Content Provenance and Authenticity (C2PA) has been working on this problem since 2021: a technical standard for attaching a tamper-evident record to digital content at the moment it's created. Camera manufacturers, stock photo platforms, and major news organizations have signed on. Implementation is accelerating, if unevenly.\n\nThe idea is simple. A camera — or a content creation app — signs content with a cryptographic key at the moment of capture. That signature travels with the file and can be verified at any point downstream. You can see not just that the image is signed, but where it was taken, on what device, and whether it's been edited since.\n\nThe gaps are significant. Most smartphones don't implement the standard yet. The chain of custody breaks the moment content goes through an unsigned app or a social platform that strips metadata. And the standard only helps with content generated by compliant tools — purpose-built synthetic media generators simply won't sign their output. But the infrastructure is being built, and once it's in place, the conversation shifts from 'is this real?' to 'can we trace it?'",
  },

  // ── AI in Science ─────────────────────────────────────────────────────────────
  {
    page_slug: "ai-in-science", slug: "prediction-then-validation", published_at: "2026-05-22T00:00:00Z",
    title: "Prediction, Then Validation",
    summary: "The pattern repeating across fields: AI proposes candidates — protein structures, stable materials, drug molecules — and human labs validate the promising ones. It doesn't replace the experiment; it tells you which experiments are worth running.",
    body: "AlphaFold changed the conversation about AI in science, but the pattern it established is more important than any single result. The pattern: AI narrows the hypothesis space dramatically, human experiments validate what's in the narrowed space. Neither step replaces the other.\n\nDrug discovery illustrates it well. A traditional small-molecule drug discovery campaign might screen millions of compounds over years. AI models can predict which structural properties are likely to bind to a target protein, narrowing the candidate pool from millions to thousands or hundreds before a single lab test is run. The experiments still happen — but they're focused on candidates that have already passed a computational filter.\n\nMaterials science, protein engineering, and genomics are following the same arc. The constraint is usually training data: AI performs well where there's a large corpus of labeled examples and poorly where data is sparse. The scientific fields moving fastest are the ones that had the foresight to digitize and standardize their data.",
  },
  {
    page_slug: "ai-in-science", slug: "the-reproducibility-caveat", published_at: "2026-05-05T00:00:00Z",
    title: "The Reproducibility Caveat",
    summary: "Splashy results outpace careful verification. The strongest work pairs AI prediction with rigorous lab confirmation; the weakest treats a model's output as a finding in itself. The distinction matters enormously.",
    body: "Science already had a reproducibility crisis before AI arrived. AI is making it more acute in specific ways.\n\nThe most common failure mode: a model predicts a result, the prediction is treated as preliminary evidence, that evidence gets cited, and a body of literature accumulates around a finding that's never been cleanly replicated in a lab. The model was confident; the citation chain is long; the actual experimental validation is thin.\n\nThe strongest AI-assisted science work is explicit about what the model contributed and what the lab confirmed. The weakest conflates prediction with finding. Peer reviewers and journal editors are starting to require disclosure of AI involvement in research, and the norms around what counts as validation are being renegotiated in real time.\n\nThis is solvable. The scientific community worked through similar methodology questions when computational modeling became widespread. But it requires the field to distinguish clearly between 'the model predicts X' and 'we have demonstrated X.'",
  },

  // ── Mathematics ───────────────────────────────────────────────────────────────
  {
    page_slug: "mathematics", slug: "competition-math-leapt-forward", published_at: "2026-05-18T00:00:00Z",
    title: "Competition Math Leapt Forward",
    summary: "With step-by-step reasoning and tool use, frontier models now solve problems that stump most professional mathematicians. On formal, well-posed problems the progress is genuine and fast.",
    body: "In 2024, frontier models were reaching IMO bronze. In 2026, they're competing for gold. The improvement isn't incremental — it's the kind of step-change that happens when a capability crosses a threshold.\n\nThe key enablers were two: explicit reasoning chains (letting the model 'show its work' before stating an answer) and tool use (letting the model call a computer algebra system rather than computing in its head). Together they transformed performance on structured mathematical problems from mediocre to genuinely impressive.\n\nWhat does this mean practically? For formal, well-posed problems with clear criteria — competition math, proof verification, algorithm design — these models are now useful collaborators and will become more so. For the messier mathematics of real research, where the problem formulation is itself part of the work, the picture is more complicated. The models are good at solving the problems you hand them; they're much less good at figuring out which problem to solve.",
  },
  {
    page_slug: "mathematics", slug: "basic-arithmetic-still-slips", published_at: "2026-05-02T00:00:00Z",
    title: "Basic Arithmetic Still Slips",
    summary: "The same model that solves an olympiad problem can fumble a multi-step calculation if it tries to compute in its head. The fix is mundane: let it use a calculator tool. Which is exactly how careful users run these systems.",
    body: "It seems contradictory: a model that can prove complex theorems occasionally gets 247 × 13 wrong. The contradiction dissolves once you understand what these systems are doing.\n\nLanguage models don't compute — they pattern-match. When asked a math question, they generate an answer that looks like the kind of answer that follows that question, based on patterns in their training data. For simple arithmetic that appears constantly in text, this works fine. For multi-step calculations that don't appear verbatim in any training document, the model is essentially guessing at a plausible-looking result.\n\nThe fix is well understood: give the model a calculator tool and tell it to use the tool rather than computing directly. Models that do this are dramatically more reliable on arithmetic. The lesson generalizes: these systems perform best when you route each kind of task to the right kind of tool. Language for language tasks, computation for computation tasks. The model as orchestrator, not as calculator.",
  },

  // ── Coding ────────────────────────────────────────────────────────────────────
  {
    page_slug: "coding", slug: "from-autocomplete-to-agent", published_at: "2026-06-02T00:00:00Z",
    title: "From Autocomplete to Agent",
    summary: "The leap of 2026 is autonomy. Modern coding agents read a whole repository, plan changes across many files, run the tests, fix what breaks, and open a pull request — with a developer reviewing rather than typing.",
    body: "The first wave of AI coding tools — Copilot, Tabnine, Codeium — were autocomplete at scale. They were genuinely useful: faster, smarter completion, less time in documentation. But the developer was still the one doing the work.\n\nThe second wave is different in kind. Claude Code, Cursor Agent, and similar tools don't complete your code — they read your entire codebase, understand your architecture and conventions, plan a change that spans multiple files, implement it, run your test suite, fix what breaks, and submit a pull request for your review. You describe what you want. You review what comes back.\n\nThe early results are striking. Teams are reporting migrations that previously took weeks — Rails upgrades, dependency bumps, large refactors — completing in hours. New features that would have been a sprint are delivered as a PR in an afternoon. The bottleneck is shifting from implementation to specification and review, which is a fundamentally different job.",
  },
  {
    page_slug: "coding", slug: "real-results-real-limits", published_at: "2026-05-20T00:00:00Z",
    title: "Real Results, Real Limits",
    summary: "Teams report large migrations finishing in days instead of weeks. The catch is supervision: agents still need a knowledgeable human steering and reviewing. They amplify a good engineer; they don't replace the judgment.",
    body: "The productivity numbers coming out of early adopters are real, and they're large. But the failure modes are also real, and they're worth understanding before you commit to an agentic workflow.\n\nThe most common problem: the agent does the wrong thing confidently. It misunderstands the spec, makes an architectural decision that's locally reasonable but globally wrong, or takes a shortcut that passes tests but introduces a subtle bug. These aren't obvious failures — they look like success until they don't. A less experienced engineer reviewing the output might not catch them.\n\nThe implication is important: AI coding agents amplify a good engineer and can mislead a junior one. The more you know about what correct looks like, the more value you extract from these tools. They're not a ladder from junior to senior — they're a multiplier on the skills you already have. Teams treating them as a replacement for engineering judgment are accumulating technical debt they don't know about yet.",
  },

  // ── Robotics ──────────────────────────────────────────────────────────────────
  {
    page_slug: "robotics", slug: "generalist-control-is-emerging", published_at: "2026-05-12T00:00:00Z",
    title: "Generalist Control Is Emerging",
    summary: "Instead of programming a robot for one rigid task, researchers now train broad models that can attempt many physical tasks from instruction and demonstration. Early, clumsy, but unmistakably a different paradigm.",
    body: "For decades, industrial robots were programmed. Every movement was specified. Every task was a deterministic sequence of instructions that worked in a controlled environment and broke when that environment changed. The job of robot programming was essentially writing very precise choreography.\n\nThe paradigm emerging from research labs in 2025-2026 is different. Models like RT-2, Pi-0, and their successors are trained on large datasets of human demonstrations rather than programmed step-by-step. They generalize — imperfectly, impressively — to tasks and objects they weren't explicitly trained on. Ask a robot trained this way to pick up an object it's never seen, and it will usually try, and sometimes succeed.\n\n'Usually try' and 'sometimes succeed' are not strong enough for most industrial applications. But the trajectory matters. The gap between a rigid programmed robot and a general-purpose physical assistant is closing from the AI side, even as hardware catches up from the other direction.",
  },
  {
    page_slug: "robotics", slug: "why-progress-feels-slower", published_at: "2026-04-28T00:00:00Z",
    title: "Why Robotics Progress Feels Slower",
    summary: "Bits are cheap; atoms are not. You can't scrape the physical world the way you scrape text, every mistake has a real-world cost, and hardware iterates in months, not minutes. Expect this frontier to move at a more human pace.",
    body: "AI progress in text and code has been so fast it's recalibrated expectations. Robotics feels slow by comparison. There are structural reasons for this, and they're worth understanding.\n\nData is the first constraint. Language models trained on the internet had essentially unlimited text. Robots need physical interaction data — sensor readings, motor commands, outcomes — and generating that data at scale means running physical robots for millions of hours. Simulation helps but doesn't fully bridge the gap; models trained in simulation often fail to transfer cleanly to real hardware.\n\nHardware iteration is the second constraint. When a software model fails, you update the weights and run again in seconds. When a robot fails, you may have broken something, hurt someone, or created a mess that takes time to clean up. The feedback loop is fundamentally slower, and safety requirements add overhead that pure software development doesn't face.\n\nThe result: robotics will advance significantly over the next five years, but at a pace that feels modest compared to what happened in language AI. The breakthroughs are coming. They're just coming at the speed of atoms, not bits.",
  },

  // ── The Anthropic Stack ───────────────────────────────────────────────────────
  {
    page_slug: "the-anthropic-stack", slug: "mcp-became-an-industry-standard", published_at: "2026-05-29T00:00:00Z",
    title: "MCP Became an Industry Standard",
    summary: "The Model Context Protocol quietly became the default way to connect AI to outside tools. What started as an Anthropic initiative has been adopted across the industry — a rare case of a single company's open standard winning.",
    body: "When Anthropic released the Model Context Protocol in late 2024, the reception was politely interested. By mid-2026, MCP is the connective tissue of the AI tool ecosystem.\n\nThe reason it won is mundane: it solved a real problem well. Before MCP, every AI integration was bespoke — a custom connector, a proprietary API contract, an integration that broke when either side updated. MCP gave everyone a shared language, the way USB-C gave hardware makers a shared connector standard.\n\nThe adoption has been broad. Every major AI coding tool supports MCP. Enterprise software vendors are shipping MCP servers alongside their products. A registry of community-built MCP servers covers thousands of tools and services. Anthropic's strategy of releasing it as an open standard rather than a proprietary advantage paid off: the ecosystem built around it makes the protocol more valuable, and Claude benefits disproportionately as the model that started there.",
  },
  {
    page_slug: "the-anthropic-stack", slug: "claude-code-changed-how-engineers-work", published_at: "2026-05-14T00:00:00Z",
    title: "Claude Code Changed How Engineers Work",
    summary: "A coding agent that lives in the terminal and works on your entire codebase changed the day-to-day of software development faster than most engineers expected. The shift from 'what do I type next' to 'what do I ask for next' is more fundamental than it looks.",
    body: "Claude Code launched as a terminal-based coding agent with access to your full codebase. The positioning was modest — a developer tool, not a replacement for engineers. The actual effect on how software gets built has been more significant than that framing suggested.\n\nThe shift is not primarily about speed, though the speed gains are real. It's about what problems become tractable. Large-scale refactors that no one wanted to touch because they'd take weeks are now approachable. Comprehensive test coverage that always got deferred is something you can actually do. Security audits of an unfamiliar codebase become feasible in hours rather than days.\n\nThe role it creates pressure on is not the senior engineer — it's the work that senior engineers were avoiding. The high-leverage, high-effort, low-urgency work that accumulated as technical debt now has a tool that makes it tractable. The engineers who've adopted it most fully describe a similar experience: they spend more time thinking and less time typing, and they're working on harder problems because easier ones are handled.",
  },

  // ── Agent Platforms ───────────────────────────────────────────────────────────
  {
    page_slug: "agent-platforms", slug: "the-community-energy-is-real", published_at: "2026-05-27T00:00:00Z",
    title: "The Community Energy Is Real",
    summary: "Open-source agent platforms have built enormous communities of builders. The enthusiasm isn't hype — people are doing genuinely useful things with these tools. The security and reliability gaps are equally real.",
    body: "OpenClaw has more GitHub stars than most well-funded startups. Hermes Agent has a Discord server with hundreds of thousands of members sharing prompts, skills, and deployment guides. The open-source agent community is one of the more energetic corners of tech in 2026.\n\nWhat's driving it is real utility. People have built agents that manage their email, monitor their investment portfolios, track competitors, synthesize research, run social media, and handle scheduling — tasks that previously required either a VA or significant engineering effort. The rough edges are tolerated by enthusiasts who enjoy the craft of making these things work.\n\nThe genuine gaps are security and reliability. Self-hosted agents often require broad permissions to do their jobs — access to email, files, calendars, browsers. An agent with those permissions is also an agent that, if compromised or misbehaving, can do significant damage. The community has produced some good security guidance, but the average deployment is less careful than it should be.",
  },
  {
    page_slug: "agent-platforms", slug: "memory-is-the-hard-part", published_at: "2026-05-10T00:00:00Z",
    title: "Memory Is the Hard Part",
    summary: "Getting an agent to do a task is now the easy part. Getting it to remember context across sessions, build up a working model of your preferences and history, and improve over time — that's where most agent platforms still fall short.",
    body: "The demos of autonomous agents look seamless. The reality is that most agents start fresh with each session, having no memory of what they did last time, what you told them worked and what didn't, or what context is relevant to today's task.\n\nMemory architectures are being built — vector databases for semantic search over past interactions, structured logs of decisions and outcomes, explicit preference files that agents update as they learn. But none of this works as well as the demos suggest. Retrieval is imperfect. Stored context can be wrong or outdated. Agents that update their own memory can corrupt it in hard-to-debug ways.\n\nHermes Agent's self-improvement mechanism — writing notes after each task to build a personal skill library — is one of the more interesting approaches. It compounds: an agent that successfully handles a complex research task records what made it work, and applies that knowledge the next time. Early users report that the agent does get noticeably better over weeks. The compounding is slow and the quality is variable, but the direction is right.",
  },

  // ── Builder's Frameworks ──────────────────────────────────────────────────────
  {
    page_slug: "builders-frameworks", slug: "which-framework-actually-wins-in-production", published_at: "2026-05-20T00:00:00Z",
    title: "Which Framework Actually Wins in Production",
    summary: "After a year of building and shipping, teams are converging on clearer opinions. LangGraph for complex state machines, Anthropic's Agent SDK for Claude-native products, and CrewAI for multi-agent collaboration each have real advantages — in the right context.",
    body: "The framework landscape for building AI agents looked like a gold rush eighteen months ago — dozens of options, loud community advocates for each, and no clear winners. The field has clarified somewhat.\n\nLangGraph (the graph-based orchestration layer built on LangChain) has earned its position as the default for complex, stateful agent workflows. The graph model maps well to how real agent work actually flows: branches, loops, conditional paths, recoveries from failure. It's verbose and the abstractions leak, but it handles complexity that simpler frameworks buckle under.\n\nFor teams building on Claude specifically, Anthropic's Agent SDK offers a cleaner production story — tighter integration with Claude's tool use and context handling, better defaults for common patterns, and the confidence that it won't drift away from the model's capabilities. The tradeoff is lock-in.\n\nCrewAI remains the clearest choice when the problem genuinely decomposes into collaborative roles — a researcher, a writer, an editor, a critic. The role metaphor is intuitive and the implementation is solid. Where it struggles is on problems that don't fit the crew metaphor cleanly, which turns out to be many of them.",
  },
  {
    page_slug: "builders-frameworks", slug: "mcp-is-replacing-custom-integrations", published_at: "2026-05-05T00:00:00Z",
    title: "MCP Is Replacing Custom Integrations",
    summary: "A year ago, connecting an agent to a tool meant writing custom glue code. Today, if the tool has an MCP server, you connect it in minutes. The long tail of bespoke integrations is disappearing.",
    body: "Every agent framework built before MCP has a custom integration layer — a way to define tools that the agent can call, with adapters for different services. Building on LangChain meant writing LangChain tool definitions. Building on a different framework meant writing a different integration.\n\nMCP is dissolving this. Any tool with an MCP server — and there are now thousands — can be connected to any agent framework that supports MCP, which is most of them. The work of integration has shifted from 'write a custom adapter' to 'point at the MCP server.'\n\nThe practical effect is that agent builders are spending less time on plumbing and more time on logic. The long tail of one-off integrations that made agent development laborious is shrinking. What remains bespoke tends to be genuinely custom business logic — the kind of integration that MCP wouldn't help with anyway, because it's unique to your organization's systems.",
  },

  // ── Signal vs. Hype ───────────────────────────────────────────────────────────
  {
    page_slug: "signal-vs-hype", slug: "what-is-actually-working-right-now", published_at: "2026-05-26T00:00:00Z",
    title: "What Is Actually Working Right Now",
    summary: "Code generation, document-based knowledge work, and single bounded automations are delivering real value in production. Everything else is promising but fragile.",
    body: "After years of hype cycles, the AI use cases that are genuinely working in production have clarified.\n\nCode generation and refactoring is the clearest win. Software teams that have integrated AI coding tools are reporting 20-40% productivity gains on implementation work, with the gains concentrated on the most tedious parts of the job. This is real and repeatable.\n\nDocument-based knowledge work is the second clear win. Summarizing research, drafting communications, extracting information from large document sets, generating first drafts for human review — these tasks have moved from 'interesting experiment' to 'standard workflow' in organizations that have pushed adoption.\n\nSingle, bounded automations are the third. A workflow that takes a specific input, runs a defined process, and produces a specific output — these are reliable today if they're designed carefully. The more open-ended the task, the more human oversight is still required.\n\nEverything beyond these three categories — multi-agent coordination, persistent memory, long autonomous tasks — is real but fragile. Worth experimenting with, not safe to depend on.",
  },
  {
    page_slug: "signal-vs-hype", slug: "the-deployment-gap-is-enormous", published_at: "2026-05-12T00:00:00Z",
    title: "The Deployment Gap Is Enormous",
    summary: "The gap between what AI can do and what most organizations have actually deployed is larger than the technology gap between AI leaders and laggards. Understanding the landscape is most of the competitive advantage.",
    body: "The AI capability frontier is moving fast. The adoption frontier is moving much slower.\n\nSurveys of enterprise AI use consistently show that most organizations are in early experimentation — pilot programs, isolated use cases, individual employees using AI tools on their own. Systematic deployment across workflows, with proper security controls and change management, remains the exception.\n\nThis creates a strange situation. The organizations at the leading edge of AI deployment are not primarily winning because they have access to better models — the same models are available to everyone via API. They're winning because they've figured out where AI actually helps, how to integrate it into how people work, and how to handle the failure modes.\n\nKnowing what's possible — really knowing it, not just knowing the press releases — is currently a significant competitive advantage. Most organizations don't know what the tools can do, so they can't make good decisions about where to apply them. This guide exists because that knowledge gap is real and consequential.",
  },

  // ── Benchmarks ────────────────────────────────────────────────────────────────
  {
    page_slug: "benchmarks", slug: "what-benchmarks-actually-measure", published_at: "2026-05-15T00:00:00Z",
    title: "What Benchmarks Actually Measure",
    summary: "Most benchmarks are fixed test sets with known answers. A high score can mean the model is genuinely capable — or simply that the test leaked into training data. Reading the numbers well requires knowing which is which.",
    body: "AI benchmarks are to model quality what SAT scores are to intelligence: correlated with something real, easy to goodhart, and routinely overinterpreted.\n\nThe structural problem: most benchmarks are public test sets with known answers. If those answers appear in the model's training data — which they often do, given how much of the internet is scraped — the model can score well by recall rather than reasoning. This is called benchmark contamination, and it's endemic.\n\nLabs are aware of this and increasingly use held-out test sets that haven't been publicly released. The results tend to be more honest but less dramatic, which is why press releases tend to feature the public benchmarks. When you see a chart showing Model X beating the previous leader on MMLU or GSM8K, the appropriate response is 'interesting data point' rather than 'clear proof of superiority.'\n\nThe benchmarks that are hardest to contaminate — those requiring multi-step reasoning over novel problems, or real-world task completion rather than question answering — are the most informative. Agentic benchmarks like SWE-bench (fixing bugs in real codebases) are harder to fake and better predictors of practical utility.",
  },
  {
    page_slug: "benchmarks", slug: "the-gap-that-actually-matters", published_at: "2026-04-30T00:00:00Z",
    title: "The Gap That Actually Matters",
    summary: "The honest question isn't 'what did it score' but 'does it hold up on my work, on examples it has never seen.' Private, task-specific evaluation beats any public leaderboard for deciding what to actually deploy.",
    body: "The most important benchmark for any organization deploying AI is one they build themselves.\n\nA private evaluation set — examples of the actual tasks the model will be asked to do, with known correct answers, that weren't in anyone's training data — is worth more than any public leaderboard score. It tells you whether the model performs on your work, in your context, at the quality level you need.\n\nBuilding these sets takes effort. You need representative examples, clear criteria for what counts as correct, and the discipline to keep the evaluation set held out rather than using it as a debugging tool. Most organizations skip this step because it's unglamorous. The ones that do it make much better deployment decisions.\n\nThe secondary implication: be skeptical of vendor evaluations. A lab testing its own model on a task it designed is not an independent evaluation. The most credible performance data comes from third-party researchers with no stake in the outcome, or from your own team's private evaluation against your actual use cases.",
  },
]

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  // 1. Upsert pages
  for (const page of PAGES) {
    const { sections, cards, related, ...pageRow } = page
    const { error } = await supabase.from('pages').upsert({ ...pageRow }, { onConflict: 'slug' })
    if (error) { console.error('Page error:', page.slug, error.message); continue }
    console.log('✓ page:', page.slug)
  }

  // 2. Build slug → integer id map
  const { data: allPages, error: fetchErr } = await supabase.from('pages').select('id, slug')
  if (fetchErr) { console.error('Failed to fetch pages:', fetchErr.message); return }
  const slugToId = Object.fromEntries(allPages.map(p => [p.slug, p.id]))

  // 3. Upsert sections, cards, and related for Start here pages
  for (const page of PAGES) {
    const pageId = slugToId[page.slug]
    if (!pageId) continue

    const sections = PRIMER_SECTIONS[page.slug]
    if (sections) {
      await supabase.from('page_sections').delete().eq('page_id', pageId)
      const { error } = await supabase.from('page_sections').insert(sections.map(s => ({ ...s, page_id: pageId })))
      if (error) console.error('Sections error:', page.slug, error.message)
      else console.log('  ✓ sections:', page.slug)
    }

    const cards = PRIMER_CARDS[page.slug]
    if (cards) {
      await supabase.from('page_cards').delete().eq('page_id', pageId)
      const { error } = await supabase.from('page_cards').insert(cards.map(c => ({ ...c, page_id: pageId })))
      if (error) console.error('Cards error:', page.slug, error.message)
      else console.log('  ✓ cards:', page.slug)
    }

    if (page.related?.length) {
      await supabase.from('page_related').delete().eq('page_id', pageId)
      const rows = page.related.map(s => ({ page_id: pageId, related_id: slugToId[s] })).filter(r => r.related_id)
      const { error } = await supabase.from('page_related').insert(rows)
      if (error) console.error('Related error:', page.slug, error.message)
      else console.log('  ✓ related:', page.slug)
    }
  }

  // 4. Upsert summaries
  for (const summary of SUMMARIES) {
    const pageId = slugToId[summary.page_slug]
    if (!pageId) { console.error('No page found for summary:', summary.page_slug); continue }
    const { page_slug, ...row } = summary
    const { error } = await supabase.from('page_summaries')
      .upsert({ ...row, page_id: pageId }, { onConflict: 'page_id,period' })
    if (error) console.error('Summary error:', summary.page_slug, error.message)
    else console.log('  ✓ summary:', summary.page_slug, summary.period)
  }

  // 5. Upsert entries
  for (const entry of ENTRIES) {
    const pageId = slugToId[entry.page_slug]
    if (!pageId) { console.error('No page found for entry:', entry.page_slug, entry.slug); continue }
    const { page_slug, ...row } = entry
    const { error } = await supabase.from('entries')
      .upsert({ ...row, page_id: pageId, updated_at: row.published_at }, { onConflict: 'page_id,slug' })
    if (error) console.error('Entry error:', entry.page_slug, entry.slug, error.message)
    else console.log('  ✓ entry:', entry.page_slug, '/', entry.slug)
  }

  console.log('\nDone.')
}

seed()
