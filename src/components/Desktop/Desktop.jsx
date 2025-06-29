import { useCallback } from 'react';
import FilesExplorer from '../FilesExplorer';

const Desktop = ({ onContextMenu, windowActions, ...props }) => {
   const updateWindowState = useCallback(
      (id, updates) => windowActions.handleUpdateWindow({ id, ...updates }),
      [windowActions]
    );
  return (
    <div className="background">
      <FilesExplorer.FilesList
        fileClassName={'desktop-files-wrapper related-background'}
        windowActions={windowActions}
        handleUpdateWindow={updateWindowState}
        {...props}
      />
    </div>
  );
};

export default Desktop;
