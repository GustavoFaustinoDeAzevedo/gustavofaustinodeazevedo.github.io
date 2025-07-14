import React, { createContext, ReactNode, RefObject, useRef } from 'react'

/**
 * Shape of the context value.
 * Provides methods to create and retrieve refs by string ID.
 */
export interface RefsContextValue {
  createRef: (id: string) => RefObject<HTMLElement | null>
  getRef: (id: string) => RefObject<HTMLElement | null> | null
}

/**
 * Default context with placeholder implementations.
 * These functions will throw if used outside of the provider.
 */
const defaultContext: RefsContextValue = {
  createRef: () => {
    throw new Error('createRef called outside of RefsProvider')
  },
  getRef: () => null,
}

/**
 * React context for storing and looking up refs by ID.
 */
export const RefsContext = createContext<RefsContextValue>(defaultContext)

interface RefsProviderProps {
  children: ReactNode
}

/**
 * Provider component that manages a map of refs.
 * - createRef(id): returns or creates a RefObject for the given ID
 * - getRef(id): retrieves the RefObject or null if none exists
 */
export const RefsProvider: React.FC<RefsProviderProps> = ({ children }) => {
  const refs = useRef<Record<string, RefObject<HTMLElement | null>>>({})

  const createRef = (id: string): RefObject<HTMLElement | null> => {
    if (!refs.current[id]) {
      refs.current[id] = React.createRef<HTMLElement>()
    }
    return refs.current[id]
  }

  const getRef = (id: string): RefObject<HTMLElement | null> | null => {
    return refs.current[id] ?? null
  }

  return (
    <RefsContext.Provider value={{ createRef, getRef }}>
      {children}
    </RefsContext.Provider>
  )
}

RefsProvider.displayName = 'RefsProvider'
