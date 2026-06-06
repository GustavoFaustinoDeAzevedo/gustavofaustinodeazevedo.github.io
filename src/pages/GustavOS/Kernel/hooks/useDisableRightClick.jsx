import { useEffect } from 'react';

const useDisableRightClick = () => {
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

export default useDisableRightClick;
