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
        .map(({ ...windowParams }, index) => (
          <WindowWrapper
            index={index}
            key={windowParams.id}
            windowParams={windowParams}
            language={language}
            windowList={windowList}
            desktopRef={desktopRef}
            filesActions={filesActions}
            windowActions={windowActions}
            isFocused={focusedWindow === windowParams.id}
          />
        )),
    [windowList, focusedWindow, language, desktopRef, windowActions, filesActions]
  );
};

export default createWindowList;
