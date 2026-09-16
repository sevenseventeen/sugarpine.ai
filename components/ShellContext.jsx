'use client'
import { createContext, useContext } from 'react'

export const ShellContext = createContext({
  onNavigate: () => {},
  onSubscribe: () => {},
  onSubscribeAll: () => {},
  pages: [],
  entries: [],
  timeline: { from: 0, to: 0, minY: 0, maxY: 0, setRange: () => {}, reset: () => {} },
})

export function useShell() {
  return useContext(ShellContext)
}
