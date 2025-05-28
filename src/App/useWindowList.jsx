import { useMemo } from 'react';
import WindowWrapper from '../components/WindowWrapper';

const useWindowList = (
  desktopRef,
  windowList,
  focusedWindow,
  language,
  handleOpenWindow,
  handleFocusWindow,
  handleResetFocus,
  handleCloseWindow,
  handleUpdateWindow
) => {
  return useMemo(
    () =>
      windowList
        .filter(({ id }) => id !== 'new' && id !== 'placeholder')
        .map(({ ...window }, index) => (
          <WindowWrapper
            key={window.id}
            window={window}
            index={index}
            isFocused={focusedWindow === window.id}
            desktopRef={desktopRef}
            handlers={{
              handleOpenWindow,
              handleFocusWindow,
              handleResetFocus,
              handleCloseWindow,
              handleUpdateWindow,
            }}
            language={language}
          />
        )),
    [windowList, focusedWindow]
  );
};

export default useWindowList;
