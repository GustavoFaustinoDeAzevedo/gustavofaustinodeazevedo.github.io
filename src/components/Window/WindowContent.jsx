import React from 'react';
import DefaultContent from './DefaultContent';

const WindowContent = ({ onFocus, isOpen, id, children }) => (
  <div
    onTouchStart={onFocus}
    onMouseDown={onFocus}
    onClick={onFocus}
    className="window-content"
  >
    {isOpen && (children || <DefaultContent id={id} />)}
  </div>
);

export default WindowContent;
