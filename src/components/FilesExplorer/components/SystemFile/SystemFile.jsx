import React, { useMemo } from 'react';
import {
  StyledFileWrapper,
  StyledFileWrapper__Icon,
  StyledFileWrapper__Text,
} from './StyledFileWrapper';
import { useAutoLineClamp } from '../../hooks';
import { useSelector } from 'react-redux';

const SystemFile = React.memo(
  ({ fileId, title, icon, onClick, isMobile, backgroundColorContrast }) => {
    const [ref, lines] = useAutoLineClamp(title, 2);
    const { isDoubleClick } = useSelector((state) => state.settings);
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
        onDoubleClick={isDoubleClick && !isMobile ? onClick : undefined}
        onMouseUp={isDoubleClick && !isMobile ? undefined : onClick}
        data-info={dataInfo}
        id={fileId}
        // backgroundColorContrast={backgroundColorContrast ?? '#ffffffff'}
      >
        <StyledFileWrapper__Icon variant={icon} />
        <StyledFileWrapper__Text
          ref={ref}
          $backgroundColorContrast={backgroundColorContrast ?? '#ffffffff'}
          $line={lines}
        >
          {title}
        </StyledFileWrapper__Text>
      </StyledFileWrapper>
    );
  }
);

export default SystemFile;
