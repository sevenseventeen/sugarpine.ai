import { getAllPages, getAllEntries } from '../lib/data.js'
import Shell from '../components/Shell.jsx'
import Timeline from '../components/Timeline.jsx'

// The pipeline publishes straight to the database, with no redeploy. Without
// this the page stays frozen at whatever the last build saw.
export const revalidate = 300

export default async function HomePage() {
  const pages = await getAllPages()
  const entries = await getAllEntries(pages)
  return (
    <Shell pages={pages} entries={entries}>
      <Timeline />
    </Shell>
  )
}
