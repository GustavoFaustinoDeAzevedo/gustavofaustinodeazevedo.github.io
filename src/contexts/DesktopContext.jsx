import React, { createContext, useContext, useRef, useMemo } from 'react';
import { useDesktop } from '../hooks/useDesktop';

// Context for Desktop State and References
const DesktopContext = createContext({});

// Provider to wrap around components that need desktop state
export const DesktopProvider = ({ children }) => {

  // Store dynamic refs without losing them between renders
  const refs = useRef({});

  // Function to create and store a ref dynamically
  const createRef = (id) => {
    if (!refs.current[id]) {
      refs.current[id] = useRef(null);
    }
    return refs.current[id];
  };

  // Function to get an existing ref (or return null if not found)
  const getRef = (id) => refs.current[id] || null;

  // Memoized value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ createRef, getRef);

  return (
    <DesktopContext.Provider value={contextValue}>
      {children}
    </DesktopContext.Provider>
  );
};

// Hook to use the desktop context in any component
export const useDesktopContext = () => useContext(DesktopContext);
