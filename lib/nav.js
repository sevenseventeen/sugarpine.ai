// The left navigation. Every row is a page; `timeline` rows list dated entries.
export const NAV = [
  { slug: 'ai-glossary',   label: 'Glossary',      kind: 'page' },
  { slug: 'conversations', label: 'Conversations', kind: 'timeline' },
  { slug: 'economics',     label: 'Economics',     kind: 'timeline' },
  { slug: 'science',       label: 'Science',       kind: 'timeline' },
  { slug: 'robotics',      label: 'Robotics',      kind: 'timeline' },
  { slug: 'space',         label: 'Space',         kind: 'timeline' },
  { slug: 'the-frontier',  label: 'The Frontier',  kind: 'timeline' },
]

export function sectionBySlug(slug) {
  return NAV.find((n) => n.slug === slug && n.kind === 'timeline') || null
}
