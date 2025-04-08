import { useMemo } from 'react';
import { minimizeWindow, focusWindow } from '../actions/windowActions';

export const useTaskbarProps = ({ state, dispatch, handleChangeLanguage }) => {
  return useMemo(
    () => ({
      className: 'enable-context',
      desktopIconsData: state.desktopIcons.desktopIconsData,
      focusedWindow: state.focus,
      openedWindows: state.opened,
      minimizedWindows: state.minimized,
      history: state.history,
      language: state.language,
      onChangeLanguage: handleChangeLanguage,
      onWindowMinimize: (id) => minimizeWindow(dispatch, id),
      onWindowRestore: (id) => focusWindow(dispatch, id),
    }),
    [state, dispatch, handleChangeLanguage]
  );
};
