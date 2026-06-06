// src/hooks/useAutoLineClamp.ts
import { useRef, useLayoutEffect, useState, RefObject } from 'react';

/**
 * Hook para calcular automaticamente o número de linhas que cabem
 * no container antes de aplicar line-clamp.
 *
 * @param text Dependência para recálculo (normalmente o próprio conteúdo)
 * @param initialLines Valor inicial de linhas antes da primeira medição
 * @returns [ref, lines] — ref para anexar ao elemento e número calculado de linhas
 */
const useAutoLineClamp = (
  text: string,
  initialLines = 2
): [RefObject<HTMLDivElement>, number] => {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(initialLines);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const style = getComputedStyle(element);
    const lineHeight = parseFloat(style.lineHeight);
    const height = element.clientHeight;
    const maxLines = Math.max(1, Math.floor(height / lineHeight));

    setLines(maxLines);
  }, [text]);

  return [ref as RefObject<HTMLDivElement>, lines];
};

export default useAutoLineClamp;
