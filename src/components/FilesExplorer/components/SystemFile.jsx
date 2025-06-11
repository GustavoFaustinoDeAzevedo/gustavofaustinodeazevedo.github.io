import React, { useMemo } from 'react';

const SystemFile = React.memo(({ id, title, icon, onClick }) => {
  const dataInfo = useMemo(
    () =>
      JSON.stringify({
        title,
        icon,
        id,
        targetContextId: 'file',
        handler: onClick,
      }),
    [title, icon, id, onClick]
  );
  return (
    <a
      className="file parent"
      aria-label={title}
      title={title}
      onTouchStart={onClick}
      onDoubleClick={onClick}
      data-info={dataInfo}
      id={id}
    >
      <i className={`icon ${icon}`}></i>
      <p className="icon-text">{title}</p>
    </a>
  );
});

export default SystemFile;
