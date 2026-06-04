import { getAllPages } from '../lib/data.js'
import Shell from '../components/Shell.jsx'
import HomeView from '../components/HomeView.jsx'

export default async function HomePage() {
  const pages = await getAllPages()
  return (
    <Shell pages={pages}>
      <HomeView />
    </Shell>
  )
}
