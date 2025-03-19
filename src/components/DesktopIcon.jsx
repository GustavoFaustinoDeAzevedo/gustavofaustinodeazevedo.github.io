import React from 'react';

function DesktopIcon({ id, title, icon, onClick }) {
  return (
    <div
      className="desktop-icon"
      onTouchStart={onClick}
      onDoubleClick={onClick}
    >
      <i className={`bi ${icon}`}></i>
      <span>{title}</span>
    </div>
  );
}

export default DesktopIcon;
