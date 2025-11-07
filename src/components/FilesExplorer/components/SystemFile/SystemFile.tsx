import React, { useMemo } from 'react';
import {
  StyledFileWrapper,
  StyledFileWrapper__Icon,
  StyledFileWrapper__Text,
} from './StyledFileWrapper';
import { useDelayBlock } from '@/shared/hooks/useDelayBlock';
import { StylesConfig } from './StyledFileWrapper/fileWrapperStyle';

const defaultProps: StylesConfig = {
  $direction: 'vertical',
  $size: '6rem',
  $fontSize: '1rem',
  $fontFamily: 'inherit',
  $fontWeight: '900',
  $iconSize: '2.5rem',
  $color: 'var(--color-text)',
  $backgroundColor: { default: 'transparent', hover: '#00000080' },
  $togglers: {
    enableFilter: true,
    enableShadow: true,
    enableBorder: true,
    enableTextShadow: true,
    enableBorderRadius: true,
    enableTransform: true,
    enableSmoothTransition: true,
  },
};

const SystemFile = ({
  fileId,
  title,
  icon,
  onClick,
  stylesConfig = useMemo(() => ({ ...defaultProps }), []),
  isDoubleClick,
  isMobile,
}: {
  fileId: string;
  title: string;
  icon: string;
  onClick?: () => void;
  stylesConfig?: StylesConfig;
  isDoubleClick?: boolean;
  isMobile?: boolean;
}) => {
  const { isBlocked, trigger } = useDelayBlock(1000);

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

  return (
    <StyledFileWrapper
      aria-label={title}
      title={title}
      onDoubleClick={handleDoubleClick}
      onMouseUp={handleSingleClick}
      id={fileId}
      {...stylesConfig}
    >
      <StyledFileWrapper__Icon variant={icon} {...stylesConfig} />
      <StyledFileWrapper__Text {...stylesConfig}>
        {title}
      </StyledFileWrapper__Text>
    </StyledFileWrapper>
  );
};

export default React.memo(SystemFile);
