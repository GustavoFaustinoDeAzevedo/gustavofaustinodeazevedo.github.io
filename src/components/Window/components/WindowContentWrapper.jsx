import React from 'react';
import WindowContent from './WindowContent';

const WindowContentWrapper = ({
  onFocus,
  isOpen,
  id,
  filesData,
  windowActions,
  src,
}) => (
  <div
    onTouchStart={onFocus}
    onMouseDown={onFocus}
    onClick={onFocus}
    className="window-content"
  >
    {isOpen && (
      <WindowContent
        id={id}
        src={src}
        filesData={filesData ?? {}}
        windowActions={windowActions}
      />
    )}
  </div>
);

export default WindowContentWrapper;
