import { useMemo } from 'react';

const useTaskbarProps = ({ windowList, history, focusedWindow, language, handleChangeLanguage, windowActions }) => {
  return useMemo(() => ({
    windowList,
    className: 'enable-context',
    focusedWindow,
    history,
    language,
    windowActions,
    onUpdateWindow: (data) => windowActions.handleUpdateWindow(data),
    onUnfocus: () => windowActions.handleResetFocus()
  }), [windowList, focusedWindow, history, language, handleChangeLanguage, windowActions]);
};

export default useTaskbarProps;
