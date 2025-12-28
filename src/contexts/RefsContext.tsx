import React, { createContext, ReactNode, RefObject, useRef } from 'react';

// Interface do context
export interface RefsContextValue {
  createRef: (id: string) => RefObject<HTMLElement | null>;
  getRef: (id: string) => RefObject<HTMLElement | null> | null;
}

// Valor padrão do context
const defaultContext: RefsContextValue = {
  createRef: () => {
    throw new Error('createRef called outside of RefsProvider');
  },
  getRef: () => null,
};

// Cria o context
export const RefsContext = createContext<RefsContextValue>(defaultContext);

interface RefsProviderProps {
  children: ReactNode;
}

// Componente do provider
export const RefsProvider: React.FC<RefsProviderProps> = ({ children }) => {
  const refs = useRef<Record<string, RefObject<HTMLElement | null>>>({});

  const createRef = (id: string): RefObject<HTMLElement | null> => {
    if (!refs.current[id]) {
      refs.current[id] = React.createRef<HTMLElement>();
    }
    return refs.current[id];
  };

  const getRef = (id: string): RefObject<HTMLElement | null> | null => {
    return refs.current[id] ?? null;
  };

  return (
    <RefsContext.Provider value={{ createRef, getRef }}>
      {children}
    </RefsContext.Provider>
  );
};

RefsProvider.displayName = 'RefsProvider';
