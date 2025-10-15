import React, { useMemo } from 'react';
import {
  StyledFileWrapper,
  StyledFileWrapper__Icon,
  StyledFileWrapper__Text,
} from './StyledFileWrapper';
import { useAutoLineClamp } from '../../hooks';
import { useSelector } from 'react-redux';
import { useDelayBlock } from '@/shared/hooks/useDelayBlock';

const SystemFile = React.memo(
  ({ fileId, title, icon, onClick, isMobile, backgroundColorContrast }) => {
    const [ref, lines] = useAutoLineClamp(title, 2);
    const { isBlocked, trigger } = useDelayBlock(1000);
    const { isDoubleClick } = useSelector((state) => state.settings);

    const handleSingleClick = () => {
      trigger(() => {
        if (!isDoubleClick || isMobile) {
          onClick?.();
        }
      });
    };

    const handleDoubleClick = () => {
      if (isDoubleClick && !isMobile) {
        onClick?.();
      }
    };

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
        onDoubleClick={handleDoubleClick}
        onMouseUp={handleSingleClick}
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
