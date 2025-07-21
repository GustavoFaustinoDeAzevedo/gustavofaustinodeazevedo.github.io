import { useEffect } from 'react';

type MouseEventHandlers = {
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
};

function useMouseEvents({
  onMouseDown,
  onMouseUp,
  onMouseMove,
}: MouseEventHandlers) {
  useEffect(() => {
    if (onMouseDown) window.addEventListener('mousedown', onMouseDown);
    if (onMouseUp) window.addEventListener('mouseup', onMouseUp);
    if (onMouseMove) window.addEventListener('mousemove', onMouseMove);

    return () => {
      if (onMouseDown) window.removeEventListener('mousedown', onMouseDown);
      if (onMouseUp) window.removeEventListener('mouseup', onMouseUp);
      if (onMouseMove) window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseDown, onMouseUp, onMouseMove]);
}

export default useMouseEvents;
