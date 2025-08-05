import { useEffect } from 'react';

type UseClickOutsideParams = {
  mainRef: React.RefObject<HTMLElement>;
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
  isActive?: boolean;
  extraRef?: React.RefObject<HTMLElement> | Element | null;
  ignoreSelectors?: string[];
};

const useClickOutside = ({
  mainRef,
  onClickOutside,
  isActive = true,
  extraRef = null,
  ignoreSelectors = ['.context-menu.active']
}: UseClickOutsideParams) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      const isInIgnoredElement = ignoreSelectors.some(selector =>
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

      onClickOutside(event);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [mainRef, extraRef, onClickOutside, isActive, ignoreSelectors]);
};

export default useClickOutside;
