import React from 'react';

const DesktopIcon = ({ title, icon, onClick }) => {
  return (
    <div
      className="desktop-icon"
      onTouchStart={onClick}
      onDoubleClick={onClick}
    >
      <i className={`${icon}`}></i>
      <p className="icon-text">{title}</p>
    </div>
  );
};

export default DesktopIcon;
