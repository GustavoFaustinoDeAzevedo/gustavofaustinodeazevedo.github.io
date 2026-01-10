import WindowManager from './WindowManager';
import actions from '@/store/actions';
import { useIsMobile } from '@/shared';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';

const ListWindows = ({
  desktopRef,
}: {
  desktopRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const language = useSelector((state: RootState) => state.settings.language);
  const windowList = useSelector(
    (state: RootState) => state.window.openedWindowList
  );

  const filteredWindowList = windowList?.filter(
    ({ windowId }) => windowId !== 'new' && windowId !== 'placeholder'
  );

  const windowActions = actions.useWindowActions();
  const settingsActions = actions.useSettingsActions();
  const filesActions = actions.useFilesActions();

  const isMobile = useIsMobile();

  const windowMapper = filteredWindowList?.map(({ ...windowParams }, index) => (
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

  return windowMapper;
};

export default ListWindows;
