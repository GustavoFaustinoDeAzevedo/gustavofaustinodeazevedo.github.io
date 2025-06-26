import { useMemo } from 'react';
import WindowWrapper from '../../WindowWrapper';

const createWindowList = (
  desktopRef,
  windowList,
  focusedWindow,
  language,
  windowActions
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
            windowActions={windowActions}
            language={language}
          />
        )),
    [windowList, focusedWindow]
  );
};

export default createWindowList;
