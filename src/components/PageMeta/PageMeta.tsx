// src/components/PageMeta.tsx

import { useEffect } from 'react';
import { iconVariants } from '@/components/ui/GlobalStyles/utils/icons';

// Language codes used in window titles
export type Language = 'eng' | 'por';

// Shape of a window object
export interface WindowItem {
  id: string | number;
  title?: { [K in Language]?: string };
  icon?: keyof typeof iconVariants;
}

// Props for PageMeta component
interface PageMetaProps {
  focusedWindow: string | number | null;
  windowList: WindowItem[];
  isUserBrowserDarkMode: boolean;
  language: Language;
}

/**
 * React component that manages the document's title and favicon
 * based on the currently focused window.
 * Updates dynamically when focused window, window list, browser dark mode, or language changes.
 */
const PageMeta: React.FC<PageMetaProps> = ({
  focusedWindow,
  windowList,
  isUserBrowserDarkMode,
  language,
}) => {
  useEffect(() => {
    let iconName = 'icons/favicon.ico';
    let computedTitle = 'GustavOS';

    // If there's a focused window, update title and icon accordingly
    if (focusedWindow !== null) {
      const target = windowList?.find((win) => win.id === focusedWindow);
      if (target) {
        if (target.icon) {
          iconName = iconVariants[target.icon].backgroundImage;
        }
        const winTitle = target.title?.[language];
        if (winTitle) {
          computedTitle += `/${winTitle}`;
        }
      }
    }

    // Update document title
    document.title = computedTitle;

    // Remove existing favicon link
    const existingLink =
      document.querySelector<HTMLLinkElement>("link[rel='icon']");
    existingLink?.parentNode?.removeChild(existingLink);

    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = iconName.includes('png') ? 'image/png' : 'image/x-icon';
    link.sizes = '16x16';
    link.href = iconName.replace(/url\('([^']*)'\)/g, '$1');

    // Append to head
    document.head.appendChild(link);
  }, [focusedWindow, windowList, isUserBrowserDarkMode, language]);

  return null;
};

export default PageMeta;
