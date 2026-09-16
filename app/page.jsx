import { getAllPages, getAllEntries } from '../lib/data.js'
import Shell from '../components/Shell.jsx'
import Timeline from '../components/Timeline.jsx'

export default async function HomePage() {
  const pages = await getAllPages()
  const entries = await getAllEntries(pages)
  return (
    <Shell pages={pages} entries={entries}>
      <Timeline />
    </Shell>
  )
}
