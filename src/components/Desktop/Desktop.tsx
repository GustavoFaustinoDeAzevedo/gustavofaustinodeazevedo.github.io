import { useCallback, useMemo } from 'react';
import { ListFiles } from '../FilesExplorer';
import DesktopBackground from './components';

type DesktopProps = {
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
  windowActions: any;
  language: string;
  isMobile: boolean;
  currentNode?: string;
  windowList?: any;
  backgroundImage?: string;
  backgroundColorContrast?: string;
  children: any;
  filesActions: any;
};

const Desktop = ({
  onContextMenu,
  windowActions,
  language,
  isMobile,
  // backgroundColor,
  // backgroundImage,
  ...props
}: DesktopProps) => {
  const updateWindowState = useCallback(
    (id, updates) => windowActions.handleUpdateWindow({ id, ...updates }),
    [windowActions]
  );
  return useMemo(
    () => (
      <div className="desktop-display">
        <DesktopBackground />
        <ListFiles
          fileClassName={'desktop-files-wrapper related-background'}
          openMode={'window'}
          windowActions={windowActions}
          handleUpdateWindow={updateWindowState}
          language={language}
          isMobile={isMobile}
          {...props}
        />
      </div>
    ),
    [language, windowActions, updateWindowState, props]
  );
};

export default Desktop;
