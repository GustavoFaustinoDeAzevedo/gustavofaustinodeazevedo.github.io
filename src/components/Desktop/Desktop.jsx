import { useCallback, useMemo } from 'react';
import FilesExplorer from '../FilesExplorer';

const Desktop = ({
  onContextMenu,
  windowActions,
  language,
  backgroundColor,
  ...props
}) => {
  const updateWindowState = useCallback(
    (id, updates) => windowActions.handleUpdateWindow({ id, ...updates }),
    [windowActions]
  );
  return useMemo(
    () => (
      <div className="background" style={{ backgroundColor: backgroundColor }}>
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
    [language, windowActions, updateWindowState, backgroundColor, props]
  );
};

export default Desktop;
