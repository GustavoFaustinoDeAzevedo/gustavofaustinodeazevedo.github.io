import React, { createContext, useContext, useRef } from 'react';

const RefsContext = createContext({});

export const RefsProvider = ({ children }) => {
  const refs = useRef({}); // Objeto para armazenar os refs dinamicamente

  const createRef = (id) => {
    if (!refs.current[id]) {
      refs.current[id] = React.createRef();
    }
    return refs.current[id];
  };

  const getRef = (id) => refs.current[id] || null;

  return (
    <RefsContext.Provider value={{ createRef, getRef }}>
      {children}
    </RefsContext.Provider>
  );
};

export const useRefs = () => useContext(RefsContext);
