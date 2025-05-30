import React from 'react';
import DefaultContent from './DefaultContent';

const WindowContent = ({ onFocus, isOpen, id, content, src
 }) => (
  <div
    onTouchStart={onFocus}
    onMouseDown={onFocus}
    onClick={onFocus}
    className="window-content"
  >
    {isOpen && (content || <DefaultContent id={id} src={src} />)}
  </div>
);

export default WindowContent;
