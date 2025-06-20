import React from 'react';
import WindowContent from './WindowContent';

const WindowContentWrapper = ({
  onFocus,
  isFocused,
  isOpen,
  id,
  children,
  windowActions,
  src,
}) => {
  const handleFocus = isFocused ? null : onFocus;
  return (
    <div
      onTouchStart={handleFocus}
      onMouseDown={handleFocus}
      onClick={handleFocus}
      className="window-content"
    >
      {isOpen && (
        <WindowContent
          id={id}
          src={src}
          children={children ?? {}}
          windowActions={windowActions}
        />
      )}
    </div>
  );
};
export default WindowContentWrapper;
