import { Newsreader, DM_Sans, IBM_Plex_Mono, Spectral } from 'next/font/google'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--loaded-newsreader',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['opsz'],
  variable: '--loaded-dm-sans',
  display: 'swap',
})

// Brand wordmark only
const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--loaded-spectral',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--loaded-ibm-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Sugarpine — A Living Guide to AI',
  description: 'Plain-language AI education and a living landscape tracking what AI can actually do — updated as the ground shifts.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${dmSans.variable} ${ibmPlexMono.variable} ${spectral.variable}`}>
      <body>{children}</body>
    </html>
  )
}
