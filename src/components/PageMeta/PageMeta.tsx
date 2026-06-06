// src/components/PageMeta.tsx

import { useEffect } from 'react';
import { iconVariants } from '@/components/DesktopEnvironment/UIControls/GlobalStyles/utils/icons';
import { WindowNode } from '@/store/slices/window';


export type Language = 'eng' | 'por';


export interface WindowItem {
  id: string | number;
  title?: { [K in Language]?: string };
  icon?: keyof typeof iconVariants;
}


interface PageMetaProps {
  focusedWindow: string | number | null;
  windowList: WindowNode[];
  isUserBrowserDarkMode: boolean;
  language: Language;
}


const PageMeta: React.FC<PageMetaProps> = ({
  focusedWindow,
  windowList,
  isUserBrowserDarkMode,
  language,
}) => {
  useEffect(() => {
    let iconName = 'icons/favicon.ico';
    let computedTitle = 'GustavOS';


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


    document.title = computedTitle;

    const existingLink =
      document.querySelector<HTMLLinkElement>("link[rel='icon']");
    existingLink?.parentNode?.removeChild(existingLink);


    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = iconName.includes('png') ? 'image/png' : 'image/x-icon';
    link.sizes = '16x16';
    link.href = iconName.replace(/url\('([^']*)'\)/g, '$1');

    document.head.appendChild(link);
  }, [focusedWindow, windowList, isUserBrowserDarkMode, language]);

  return null;
};

export default PageMeta;
