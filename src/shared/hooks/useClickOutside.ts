import { useEffect } from 'react';

type UseClickOutsideParams = {
  mainRef: React.RefObject<HTMLElement | null>;
  onClickOutside: (e: MouseEvent | TouchEvent) => void;
  isActive?: boolean;
  extraRef?: React.RefObject<HTMLElement> | Element | null;
  ignoreSelectors?: string[];
};

const useClickOutside = ({
  mainRef,
  onClickOutside,
  isActive = true,
  extraRef = null,
  ignoreSelectors = ['.context-menu.active'],
}: UseClickOutsideParams) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;

      const isInIgnoredElement = ignoreSelectors.some((selector) =>
        target.closest(selector)
      );

      const isInExtraRef =
        extraRef instanceof Element
          ? extraRef.contains(target)
          : extraRef?.current?.contains?.(target);

      if (
        !mainRef.current ||
        mainRef.current.contains(target) ||
        isInExtraRef ||
        isInIgnoredElement
      ) {
        return;
      }
      onClickOutside(e);
    };

    document.addEventListener('pointerdown', handleClick, { capture: true });

    return () => {
      document.removeEventListener('pointerdown', handleClick, {
        capture: true,
      });
    };
  }, [mainRef, extraRef, onClickOutside, isActive, ignoreSelectors]);
};

export default useClickOutside;
