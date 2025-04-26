import { useMemo } from 'react';
import Window from '../components/Window';
import actions from '../store/actions';
import { useSelector } from 'react-redux';

/**
 * Custom hook `useWindowList` generates a list of `Window` components based on the current state of opened windows.
 *
 * @param {React.RefObject} desktopRef - A reference to the desktop container element.
 * @returns {React.ReactNode[]} - A memoized array of `Window` components.
 *
 * @description
 * This hook retrieves the list of opened windows, the currently focused window, and the application's language
 * from the Redux store. It filters out windows with specific IDs ('new' and 'placeholder') and maps the remaining
 * windows to `Window` components. Each `Window` component is configured with its respective properties and event
 * handlers for focus, minimize, maximize, and close actions.
 *
 * @dependencies
 * - Redux state: `state.window.openedWindowList`, `state.window.focusedWindow`, `state.language`
 * - Actions: `handleFocusWindow`, `handleMinimizeWindow`, `handleMaximizeWindow`, `handleResetFocus`, `handleCloseWindow`
 *
 * @example
 * const windowList = useWindowList(desktopRef);
 * return <div>{windowList}</div>;
 */
export const useWindowList = (desktopRef) => {
  const {
    handleFocusWindow,
    handleMinimizeWindow,
    handleMaximizeWindow,
    handleResetFocus,
    handleCloseWindow,
  } = actions.useWindowActions();

  const language = useSelector((state) => state.language);
  const windowList = useSelector((state) => state.window.openedWindowList);
  const focusedWindow = useSelector((state) => state.window.focusedWindow);
  return useMemo(
    () =>
      windowList
        .filter(({ id }) => id !== 'new' && id !== 'placeholder')
        .map(
          (
            { id, title, isMinimized, isMaximized, zIndex, open, icon },
            index
          ) => (
            <Window
              key={id}
              id={id}
              icon={icon}
              desktopRef={desktopRef}
              title={title}
              isFocused={focusedWindow === id}
              isMinimized={isMinimized}
              isMaximized={isMaximized}
              isOpen={open}
              zIndex={zIndex}
              language={language}
              index={index}
              onFocus={() => handleFocusWindow(id)}
              onUnfocus={() => handleResetFocus()}
              onMinimize={() => handleMinimizeWindow(id)}
              onMaximize={() => handleMaximizeWindow(id)}
              onClose={() => handleCloseWindow(id)}
            />
          )
        ),
    [windowList, language, focusedWindow, desktopRef, handleFocusWindow, handleMinimizeWindow, handleMaximizeWindow, handleResetFocus, handleCloseWindow]
  );
};
