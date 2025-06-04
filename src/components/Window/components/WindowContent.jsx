import React from 'react';
import DefaultContent from './DefaultContent';

const WindowContent = ({
  onFocus,
  isOpen,
  id,
  content,
  windowActions,
  src,
}) => (
  <div
    onTouchStart={onFocus}
    onMouseDown={onFocus}
    onClick={onFocus}
    className="window-content"
  >
    {isOpen &&
      (content || (
        <DefaultContent id={id} src={src} windowActions={windowActions} />
      ))}
  </div>
);

export default WindowContent;
