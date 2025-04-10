/* @refresh reset */
import React, { createContext, useRef } from 'react';

export const RefsContext = createContext({});

export function RefsProvider({ children }) {
  const refs = useRef({});

  function createRef(id) {
    if (!refs.current[id]) {
      refs.current[id] = React.createRef();
    }
    return refs.current[id];
  }

  function getRef(id) {
    return refs.current[id] || null;
  }

  return (
    <RefsContext.Provider value={{ createRef, getRef }}>
      {children}
    </RefsContext.Provider>
  );
}

RefsProvider.displayName = 'RefsProvider';
