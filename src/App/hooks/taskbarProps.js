import { useMemo } from 'react';

export const taskbarProps = ({ windowList,
  history, focusedWindow, language, handleChangeLanguage, windowActions }) => {

  return useMemo(
    () => ({
      windowList,
      className: 'enable-context',
      focusedWindow: focusedWindow,
      history: history,
      language: language,
      windowActions: windowActions,
      onUpdateWindow: (data) => windowActions.handleUpdateWindow(data),
      onUnfocus: () => windowActions.handleResetFocus()
    }),
    [windowList, focusedWindow, history, language, handleChangeLanguage, windowActions]
  );
};
