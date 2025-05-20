import { useMemo } from 'react';

export const useTaskbarProps = ({ windowList,
  history, focusedWindow, language, handleChangeLanguage, handleUpdateWindow, handleFocusWindow, handleResetFocus, handleCloseWindow,
  handleOpenWindow, }) => {

  return useMemo(
    () => ({
      windowList,
      className: 'enable-context',
      focusedWindow: focusedWindow,
      history: history,
      language: language,
      onChangeLanguage: handleChangeLanguage,
      onUpdateWindow: (data) => handleUpdateWindow(data),
      onFocus: () => handleFocusWindow(id),
      onUnfocus: () => handleResetFocus()
    }),
    [windowList, focusedWindow, history, language, handleChangeLanguage, handleUpdateWindow]
  );
};
