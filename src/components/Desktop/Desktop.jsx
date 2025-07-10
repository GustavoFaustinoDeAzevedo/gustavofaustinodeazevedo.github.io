import { useCallback, useMemo } from 'react';
import FilesExplorer from '../FilesExplorer';

const Desktop = ({ onContextMenu, windowActions, language, ...props }) => {
  const updateWindowState = useCallback(
    (id, updates) => windowActions.handleUpdateWindow({ id, ...updates }),
    [windowActions]
  );
  return useMemo(
    () => (
      <div className="background">
        <FilesExplorer.FilesList
          fileClassName={'desktop-files-wrapper related-background'}
          openMode={'window'}
          windowActions={windowActions}
          handleUpdateWindow={updateWindowState}
          language={language}
          {...props}
        />
      </div>
    ),
    [language, windowActions, updateWindowState, props]
  );
};

export default Desktop;
