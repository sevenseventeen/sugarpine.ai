'use client'
import { createContext, useContext } from 'react'

export const ShellContext = createContext({
  onNavigate: () => {},
  onSubscribe: () => {},
  onSubscribeAll: () => {},
  pages: [],
})

export function useShell() {
  return useContext(ShellContext)
}
