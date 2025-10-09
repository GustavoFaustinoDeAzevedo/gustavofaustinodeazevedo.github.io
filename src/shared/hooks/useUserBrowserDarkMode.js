import { useEffect, useState } from 'react';

const useUserBrowserDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setIsDarkMode(mediaQuery.matches);

    const handleChange = (event) => setIsDarkMode(event.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isDarkMode;
}

export default useUserBrowserDarkMode;