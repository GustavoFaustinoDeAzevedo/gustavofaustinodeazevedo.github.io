import { useEffect, useRef, useState } from "react";
import {
  lightTheme,
  darkTheme
} from "../../../../components/ui/GlobalStyles/utils/themes";

const useChangeTheme = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    setTheme(darkMode ? darkTheme : lightTheme);
  }, [darkMode]);

  return { theme, isDarkMode: darkMode, setDarkMode };
};

export default useChangeTheme;


