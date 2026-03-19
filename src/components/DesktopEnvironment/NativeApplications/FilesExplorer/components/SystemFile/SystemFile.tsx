import React, { useEffect, useMemo, useState } from 'react';
import {
  StyledFileWrapper,
  StyledFileWrapper__Icon,
  StyledFileWrapper__Text,
} from './StyledFileWrapper';
import { useDelayBlock } from '@/shared/hooks/useDelayBlock';
import { StylesConfig } from './StyledFileWrapper/fileWrapperStyle';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Permission, Title } from '@/store/slices/file';
import User from '@/store/utils/db.types';

const defaultProps: StylesConfig = {
  $direction: 'vertical',
  $size: '6.2rem',
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
  currentUser,
  permission,
  isMobile,
}: {
  fileId: string;
  title?: Title;
  icon: string;
  onClick?: () => void;
  stylesConfig?: StylesConfig;
  isDoubleClick?: boolean;
  permission?: Permission;
  currentUser?: User;
  isMobile?: boolean;
}) => {
  const { isBlocked, trigger } = useDelayBlock(1000);

  const language = useSelector((state: RootState) => state?.settings.language);

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

  const translatedTitle = useMemo(
    () => title?.[language as keyof typeof title] || '',
    [language, title],
  );

  // TODO Adicionar (num futuro distante) a opção de selecionar vários arquivos, tenho que trocar o sistema padrão de focus por um
  // personalizado que permite selecionar vários arquivos ao mesmo tempo.

  const memoizedIcon = useMemo(
    () => <StyledFileWrapper__Icon variant={icon} {...stylesConfig} />,
    [icon, stylesConfig],
  );

  const memoizedTitle = useMemo(
    () => (
      <StyledFileWrapper__Text {...stylesConfig}>
        {translatedTitle}
      </StyledFileWrapper__Text>
    ),
    [translatedTitle],
  );

  return (
    <li>
      <label>
        <input
          title={translatedTitle}
          type="radio"
          className={'none'}
          name="file"
          id={fileId}
        />
        <StyledFileWrapper
          tabIndex={0}
          aria-label={translatedTitle}
          onKeyDown={handleKeyDown}
          onDoubleClick={handleDoubleClick}
          onMouseUp={handleSingleClick}
          id={fileId}
          {...stylesConfig}
        >
          {memoizedIcon}
          {memoizedTitle}
        </StyledFileWrapper>
      </label>
    </li>
  );
};

export default React.memo(SystemFile);
