import { useEffect } from 'react';

// Custom hook to detect clicks outside a specified element
const useClickOutside = (ref, handler, enabled, optionalRef = null, elementClassToBlock = '.context-menu.active') => {
  useEffect(() => {
    // If the hook is not enabled, return empty cleanup function
    if (!enabled) {
      return () => {};
    }

    // Listener function to handle click events
    const listener = (event) => {
      // Check if the optional reference contains the event (click) target
      let secondRef = false;
      if (optionalRef && optionalRef.current) {
        secondRef = optionalRef.current.contains(event.target);
      } else if (optionalRef && optionalRef instanceof Element) {
        secondRef = optionalRef.contains(event.target);
      }

      // If the click is inside the ref element, inside an element with specified class, or inside the optional ref, do nothing
      if (
        !ref.current ||
        event.target.closest(elementClassToBlock) ||
        ref.current.contains(event.target) ||
        secondRef
      )
        return;

      // If the click is outside, call the handler
      handler(event);
    };

    // Add event listeners for mousedown and touchstart
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [enabled]); // Dependencies array for useEffect
  
  return undefined;
};

export default useClickOutside;