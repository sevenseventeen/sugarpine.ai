import { Spectral, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--loaded-spectral',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--loaded-ibm-sans',
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
    <html lang="en" className={`${spectral.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
