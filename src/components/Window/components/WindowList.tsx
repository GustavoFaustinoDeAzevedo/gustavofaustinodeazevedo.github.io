import { useMemo } from 'react';
import WindowManager from '@/components/Window';
import { CreateWindowListProps } from '@/App/types/App.types';
import actions from '@/store/actions';
import { useIsMobile } from '@/shared';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const CreateWindowList = ({
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
};

export default CreateWindowList;
