import React, { useMemo } from 'react';
import {
  StyledFileWrapper,
  StyledFileWrapper__Icon,
  StyledFileWrapper__Text,
} from './StyledFileWrapper';

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
    <StyledFileWrapper
      aria-label={title}
      title={title}
      onTouchStart={onClick}
      onDoubleClick={onClick}
      data-info={dataInfo}
      id={id}
    >
      <StyledFileWrapper__Icon
        variant={icon}
        style={{ color: 'var(--c-text)' }}
      />
      <StyledFileWrapper__Text>{title}</StyledFileWrapper__Text>
    </StyledFileWrapper>
  );
});

export default SystemFile;
