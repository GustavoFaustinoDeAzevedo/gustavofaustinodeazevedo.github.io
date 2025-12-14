import { useEffect, useRef, useState } from 'react';

/**
 * Bloqueia eventos de teclado enquanto o botão esquerdo do mouse estiver pressionado.
 * Retorna `true` se o teclado estiver bloqueado.
 */
const useKeyboardBlockOnMouseHold = (): boolean => {
  // const [isBlocked, setIsBlocked] = useState(false);
  const isBlocked = useRef(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) isBlocked.current = true;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) isBlocked.current = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isBlocked.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  return isBlocked.current;
};

export default useKeyboardBlockOnMouseHold;
