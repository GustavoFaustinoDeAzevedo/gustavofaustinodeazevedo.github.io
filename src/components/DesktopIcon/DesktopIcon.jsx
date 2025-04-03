import React, { useMemo } from 'react';

const DesktopIcon = React.memo(({ title, id, icon, onClick }) => {
  const dataInfo = useMemo(
    () =>
      JSON.stringify({
        title,
        icon,
        id,
        targetContextId: 'desktop-icon',
        handler: onClick,
      }),
    [title, icon, id, onClick]
  );

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
      <i className={icon}></i>
      <p className="icon-text">{title}</p>
    </a>
  );
});

export default DesktopIcon;
