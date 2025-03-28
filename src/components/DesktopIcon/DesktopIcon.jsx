import React from 'react';

const DesktopIcon = ({ title, icon, dispatch, id, onClick }) => {
  const dataInfo = JSON.stringify({
    title,
    icon,
    id,
    handler: onClick,
  });
  return (
    <a
      className="desktop-icon"
      title={title}
      onTouchStart={onClick}
      onDoubleClick={onClick}
      data-info={dataInfo}
      id="desktopIcon"
    >
      <i className={`${icon}`}></i>
      <p className="icon-text">{title}</p>
    </a>
  );
};

export default DesktopIcon;
