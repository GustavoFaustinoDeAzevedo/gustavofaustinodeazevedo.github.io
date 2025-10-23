import { useMemo } from 'react';
import WindowManager from '@/components/Window';
import { CreateWindowListProps } from '@/App/types/App.types';

const createWindowList = ({
  isMobile,
  desktopRef,
  windowList,
  focusedWindow,
  language,
  windowActions,
  filesActions,
  settingsActions,
}: CreateWindowListProps) => {
  return useMemo(() => {
    const filteredWindowList = windowList?.filter(
      ({ windowId }) => windowId !== 'new' && windowId !== 'placeholder'
    );
    return filteredWindowList?.map(({ ...windowParams }, index) => (
      <WindowManager
        isMobile={isMobile}
        windowIndex={index}
        key={windowParams.windowId}
        settingsActions={settingsActions}
        windowRawParams={windowParams}
        language={language}
        desktopRef={desktopRef}
        filesActions={filesActions}
        windowActions={windowActions}
      />
    ));
  }, [windowList, language]);
};

export default createWindowList;
