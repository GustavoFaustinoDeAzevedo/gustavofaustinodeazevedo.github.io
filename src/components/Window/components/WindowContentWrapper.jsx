import React from 'react';
import WindowContent from './WindowContent';
import FilesExplorer from '../../FilesExplorer';

const WindowContentWrapper = ({
  onFocus,
  isFocused,
  isOpen,
  id,
  nodeId,
  children,
  windowActions,
  language,
  windowList,
  filesActions,
  src,
  type,
  handleUpdate,
}) => {
  const handleFocus = isFocused ? null : onFocus;
  const windowContent =
    isOpen && type === 'folder' ? (
      <FilesExplorer.FilesList
        nodeId={nodeId}
        language={language}
        windowList={windowList}
        children={children}
        filesActions={filesActions}
        windowActions={windowActions}
        handleUpdate={handleUpdate}
        nodeType={type}
        dataInitialDimension='{"width": "1000px", "height": "600px"}'
        fileClassName="files-explorer"
      />
    ) : (
      <WindowContent
        id={id}
        nodeId={nodeId}
        src={src}
        children={children ?? {}}
        windowActions={windowActions}
      />
    );
  
  return (
    <div
      onTouchStart={handleFocus}
      onMouseDown={handleFocus}
      onClick={handleFocus}
      className="window-content"
    >
      {windowContent}
    </div>
  );
};
export default WindowContentWrapper;
