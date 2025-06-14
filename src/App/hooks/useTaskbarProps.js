import { useMemo } from 'react';

export const useTaskbarProps = ({ windowList,
  history, focusedWindow, language, handleChangeLanguage, windowActions }) => {

  return useMemo(
    () => ({
      windowList,
      className: 'enable-context',
      focusedWindow: focusedWindow,
      history: history,
      language: language,
      onChangeLanguage: handleChangeLanguage,
      onUpdateWindow: (data) => windowActions.handleUpdateWindow(data),
      onUnfocus: () => windowActions.handleResetFocus()
    }),
    [windowList, focusedWindow, history, language, handleChangeLanguage, windowActions]
  );
};
