import { useEffect } from 'react';

export const useClickOutside = (ref, handler, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      console.log([event, ref])
      // Return if the ref or current is not available
      if (!ref.current ||
        event.target.closest('.context-menu') &&
        event.target.closest('.active') ||
        ref.current.contains(event.target))
        return;

      handler(event);

    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
};