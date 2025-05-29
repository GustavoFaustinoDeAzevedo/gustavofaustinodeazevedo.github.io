import React from 'react';
import DefaultContent from './DefaultContent';

const WindowContent = ({ onFocus, isOpen, id, content }) => (
  <div
    onTouchStart={onFocus}
    onMouseDown={onFocus}
    onClick={onFocus}
    className="window-content"
  >
    {isOpen && (content || <DefaultContent id={id} />)}
  </div>
);

export default WindowContent;
