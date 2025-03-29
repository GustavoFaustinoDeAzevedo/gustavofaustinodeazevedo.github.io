import React from 'react';

// This component is used to create a desktop icon with a title and an icon.
// It takes in three props: title, icon, and onClick.
// The title is the text that will be displayed below the icon.
const DesktopIcon = ({ title, id, icon, onClick }) => {
  // Renders a clickable desktop icon with a title and an icon.
  // Supports touch and double-click events.

  const dataInfo = JSON.stringify({
    title,
    icon,
    id,
    targetContextId: 'desktop-icon',
    handler: onClick,
  });
  return (
    <a
      className="desktop-icon parent"
      aria-label={title}
      title={title}
      onTouchStart={onClick}
      onDoubleClick={onClick}
      data-info={dataInfo}
      id={title}
    >
      <i className={`${icon}`}></i>
      <p className="icon-text">{title}</p>
    </a>
  );
};

export default DesktopIcon;
