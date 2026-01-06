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
    enableTransform: false,
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

  const handleSingleClick = (e: React.MouseEvent) => {
    if (isDoubleClick && !isMobile) {
      (e.currentTarget as HTMLElement | null)?.focus();
    }
    trigger(() => {
      if (!isDoubleClick || isMobile) {
        onClick?.();
      }
    });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isDoubleClick && !isMobile) {
      (e.currentTarget as HTMLElement | null)?.blur();
      onClick?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClick?.();
    }
  };

  // TODO Adicionar (num futuro distante) a opção de selecionar vários arquivos, tenho que trocar o sistema padrão de focus por um
  // personalizado que permite selecionar vários arquivos ao mesmo tempo.

  return (
    <StyledFileWrapper
      tabIndex={0}
      aria-label={title}
      title={title}
      onKeyDown={handleKeyDown}
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
