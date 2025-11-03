import { useCallback, useMemo } from 'react';
import { ListFiles } from '../FilesExplorer';
import DesktopBackground from './components';

type DesktopProps = {
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  windowActions: any;
  language: string;
  isMobile: boolean;
  windowList?: any;
  children: any;
  filesActions: any;
};

const Desktop = ({
  onContextMenu,
  windowActions,
  language,
  isMobile,
  ...props
}: DesktopProps) => {
  const updateWindowState = useCallback(
    (id: string, updates: any) =>
      windowActions.handleUpdateWindow({ id, ...updates }),
    [windowActions]
  );
  return useMemo(
    () => (
      <div className="desktop-display">
        <DesktopBackground />
        <ListFiles
          fileClassName={'desktop-files-wrapper related-background'}
          openMode={'window'}
          handleWindowUpdate={updateWindowState as any}
          language={language}
          isMobile={isMobile}
          {...(props as any)}
        />
      </div>
    ),
    [language, windowActions, updateWindowState, props]
  );
};

export default Desktop;
