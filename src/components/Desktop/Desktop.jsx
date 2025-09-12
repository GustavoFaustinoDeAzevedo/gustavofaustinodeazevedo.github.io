import { useCallback, useMemo } from 'react';
import { FilesList } from '../FilesExplorer';
import { useSelector } from 'react-redux';
import DesktopBackground from './components';

const Desktop = ({
  onContextMenu,
  windowActions,
  language,
  isMobile,
  // backgroundColor,
  // backgroundImage,
  ...props
}) => {
  const updateWindowState = useCallback(
    (id, updates) => windowActions.handleUpdateWindow({ id, ...updates }),
    [windowActions]
  );
  return useMemo(
    () => (
      <div className="desktop-display">
        <DesktopBackground />
        <FilesList
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
