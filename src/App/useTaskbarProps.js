import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import actions from '../store/actions';

/**
 * Custom hook to generate props for the Taskbar component.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {Function} params.handleChangeLanguage - Callback function to handle language change.
 * @returns {Object} Taskbar props.
 * @returns {string} TaskbarProps.className - CSS class name for the taskbar.
 * @returns {string} TaskbarProps.focusedWindow - The ID of the currently focused window.
 * @returns {Array} TaskbarProps.openedWindowList - List of opened windows.
 * @returns {Array} TaskbarProps.history - History of window actions.
 * @returns {string} TaskbarProps.language - Current language setting.
 * @returns {Function} TaskbarProps.onChangeLanguage - Function to change the language.
 * @returns {Function} TaskbarProps.onWindowMinimize - Function to minimize a window.
 * @returns {Function} TaskbarProps.onWindowRestore - Function to restore a minimized window.
 */

export const useTaskbarProps = ({ handleChangeLanguage }) => {
  const { handleMinimizeWindow, handleRestoreWindow } =
    actions.useWindowActions();

  const language = useSelector((state) => state.language);
  const windowList = useSelector((state) => state.window.openedWindowList);
  const focusedWindow = useSelector((state) => state.window.focusedWindow);
  const history = useSelector((state) => state.window.history);

  return useMemo(
    () => ({
      className: 'enable-context',
      focusedWindow: focusedWindow,
      openedWindowList: windowList,
      history: history,
      language: language,
      onChangeLanguage: handleChangeLanguage,
      onWindowMinimize: handleMinimizeWindow,
      onWindowRestore: handleRestoreWindow,
    }),
    [handleChangeLanguage]
  );
};
