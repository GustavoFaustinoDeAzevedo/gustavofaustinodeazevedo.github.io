import React, { useMemo } from 'react';
import {
  StyledFileWrapper,
  StyledFileWrapper__Icon,
  StyledFileWrapper__Text,
} from './StyledFileWrapper';

const SystemFile = React.memo(
  ({ fileId, title, icon, onClick, backgroundColorContrast }) => {
    const dataInfo = useMemo(
      () =>
        JSON.stringify({
          title,
          icon,
          fileId,
          targetContextId: 'file',
          handler: onClick,
        }),
      [title, icon, fileId, onClick]
    );

    return (
      <StyledFileWrapper
        aria-label={title}
        title={title}
        onTouchStart={onClick}
        onDoubleClick={onClick}
        data-info={dataInfo}
        id={fileId}
        // backgroundColorContrast={backgroundColorContrast ?? '#ffffffff'}
      >
        <StyledFileWrapper__Icon
          variant={icon}
          backgroundColorContrast={`drop-shadow( 0px 0px 0.5px ${
            backgroundColorContrast ?? '#3c3c3c' 
          })`}
        />
        <StyledFileWrapper__Text
          backgroundColorContrast={backgroundColorContrast ?? '#ffffffff'}
        >
          {title}
        </StyledFileWrapper__Text>
      </StyledFileWrapper>
    );
  }
);

export default SystemFile;
