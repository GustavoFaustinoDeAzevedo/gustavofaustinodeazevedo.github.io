import { useMemo } from 'react';
import WindowWrapper from '../WindowWrapper';
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
        .filter(
          ({ windowId }) => windowId !== 'new' && windowId !== 'placeholder'
        )
        .map(({ ...windowParams }, index) => (
          <WindowWrapper
            windowIndex={index}
            key={windowParams.windowId}
            windowParams={windowParams}
            language={language}
            windowList={windowList}
            desktopRef={desktopRef}
            filesActions={filesActions}
            windowActions={windowActions}
            isFocused={focusedWindow === windowParams.windowId}
          />
        )),
    [
      windowList,
      focusedWindow,
      language,
      desktopRef,
      windowActions,
      filesActions,
    ]
  );
};

export default createWindowList;
