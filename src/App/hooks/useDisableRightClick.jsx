import { useEffect } from 'react';

export const useDisableRightClick = () => {
  useEffect(() => {
    const disableRightClick = (e) => {
      if (!e.target.closest('.enable-context')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', disableRightClick);
    return () => document.removeEventListener('contextmenu', disableRightClick);
  }, []);
};
