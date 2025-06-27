import { useMemo } from 'react';
import WindowWrapper from '../../WindowWrapper';

const createWindowList = (
  desktopRef,
  windowList,
  focusedWindow,
  language,
  windowActions,
  filesActions
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
            windowList={windowList}
            isFocused={focusedWindow === window.id}
            desktopRef={desktopRef}
            windowActions={windowActions}
            filesActions={filesActions}
            language={language}
          />
        )),
    [windowList, focusedWindow]
  );
};

export default createWindowList;
