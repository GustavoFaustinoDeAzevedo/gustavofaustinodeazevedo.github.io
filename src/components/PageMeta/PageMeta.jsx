import { useEffect, useState } from 'react';
import { iconVariants } from '../ui/GlobalStyles/utils/icons';

/**
 * React component that manages the document's title and favicon based on the currently focused window.
 * Updates the favicon and title dynamically when the focused window, window list, or user's browser dark mode changes.
 *
 * @component
 * @param {Object} props
 * @param {string|number|null} props.focusedWindow - The ID of the currently focused window, or null if none is focused.
 * @param {Array<Object>} props.windowList - List of window objects, each containing at least `id`, `title`, and optionally `icon`.
 * @param {boolean} props.isUserBrowserDarkMode - Indicates if the user's browser is in dark mode.
 * @returns {null} This component does not render anything to the DOM.
 */
const PageMeta = ({
  focusedWindow,
  windowList,
  isUserBrowserDarkMode,
  language,
}) => {
  useEffect(() => {
    let iconName = 'icons/favicon.ico';
    let computedTitle = 'GustavOS';
    if (focusedWindow) {
      if (windowList && windowList.length > 0) {
        const focusedWindowParams = windowList.find(
          (win) => win.id === focusedWindow
        );
        if (focusedWindowParams) {
          if (focusedWindowParams.icon) {
            iconName = iconVariants[focusedWindowParams.icon].backgroundImage;
          }
          if (
            focusedWindowParams.title &&
            language &&
            focusedWindowParams.title[language]
          ) {
            computedTitle += '/' + focusedWindowParams.title[language];
          }
        }
      }
    }
    document.title = computedTitle;

    let link = document.querySelector("link[rel='icon']");

    if (link && link.parentNode) {
      link.parentNode.removeChild(link);
    }
    link = document.createElement('link');
    link.rel = 'icon';
    link.type = iconName.includes('png') ? 'image/png' : 'image/x-icon';
    link.sizes = '16x16';
    link.href = iconName.replace(/url\('([^']*)'\)/g, '$1');
    document.head.appendChild(link);
  }, [focusedWindow, windowList, isUserBrowserDarkMode, language]);

  return null;
};

export default PageMeta;
