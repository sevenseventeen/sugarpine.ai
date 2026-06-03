'use client'
import { createContext, useContext } from 'react'

export const ShellContext = createContext({ onNavigate: () => {}, onSubscribe: () => {}, onSubscribeAll: () => {} })

export function useShell() {
  return useContext(ShellContext)
}
