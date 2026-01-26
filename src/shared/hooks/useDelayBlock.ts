import { useCallback, useRef, useState } from 'react';

export function useDelayBlock(delayMs: number = 2000) {
  const [isBlocked, setIsBlocked] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const trigger = useCallback(
    (action: () => void) => {
      if (isBlocked) return;

      setIsBlocked(true);
      action();

      timeoutRef.current = setTimeout(() => {
        setIsBlocked(false);
      }, delayMs);
    },
    [isBlocked, delayMs],
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsBlocked(false);
    }
  }, []);

  return { isBlocked, trigger, cancel };
}
