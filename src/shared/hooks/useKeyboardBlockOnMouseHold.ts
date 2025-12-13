import { useEffect, useState } from 'react';

/**
 * Bloqueia eventos de teclado enquanto o botão esquerdo do mouse estiver pressionado.
 * Retorna `true` se o teclado estiver bloqueado.
 */
const useKeyboardBlockOnMouseHold = (): boolean => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setIsBlocked(true); // botão esquerdo
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) setIsBlocked(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isBlocked) {
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
  }, [isBlocked]);

  return isBlocked;
};

export default useKeyboardBlockOnMouseHold;
