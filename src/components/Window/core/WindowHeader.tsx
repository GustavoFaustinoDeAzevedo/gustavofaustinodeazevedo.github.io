import React, { useCallback, useMemo } from 'react';
import Icon from '@components/ui/GlobalStyles/components/Icon';
import { Language } from '@/store/slices/settings';
import { windowHeaderData } from '../data';

export type WindowHeaderProps = {
  title?: { [key in Language]: string };
  headerRef?: React.RefObject<HTMLDivElement> | null;
  icon?: string;
  language?: Language;
  isMaximized?: boolean;
  helpContent?: React.ReactNode;
  handleRequestFocus?: () => void;
  handleRequestMinimize?: () => void;
  handleRequestMaximize?: () => void;
  handleRequestRestore?: () => void;
  handleRequestClose?: () => void;
};

const WindowHeader = ({
  title = { eng: 'Untitled', por: 'Sem título' },
  headerRef = null,
  icon = '',
  language = 'eng',
  handleRequestFocus,
  ...props
}: WindowHeaderProps) => {
  const stylePng = {
    color: 'var(--color-text)',
    maxWidth: '1rem',
    maxHeight: '1rem',
    backgroundColor: 'transparent',
  };

  const styleSvg = {
    color: 'var(--color-text)',
    width: '1.1rem',
    height: '1.1rem',
    backgroundColor: 'var(--color-icon-bg)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const headerData = windowHeaderData({
    ...props,
    language,
  });

  const headerIcon = useMemo(
    () => (
      <Icon
        variant={icon}
        style={stylePng}
        aria-hidden="true"
        title={title[language as keyof typeof title] || 'Untitled'}
      />
    ),
    [icon, language, title],
  );

  const headerControls = headerData.map(
    ({ name, title, icon, action, condition }) => {
      if (condition === false) return null;
      return (
        <button
          key={name}
          type="button"
          aria-label={title}
          title={title}
          className={`window__header-controls-${name}`}
          onClick={action}
        >
          {useMemo(
            () => (
              <Icon variant={icon} style={styleSvg} />
            ),
            [icon],
          )}
        </button>
      );
    },
  );

  return useMemo(
    () => (
      <div className="window__header">
        <span
          onTouchStart={handleRequestFocus}
          onClick={handleRequestFocus}
          onDoubleClick={
            props.isMaximized
              ? props.handleRequestRestore
              : props.handleRequestMaximize
          }
          onMouseDown={handleRequestFocus}
          ref={headerRef}
          title={title[language as keyof typeof title] || 'Untitled'}
          aria-label={title[language as keyof typeof title] || 'Untitled'}
          className="window__header-title"
        >
          {headerIcon}
          {title[language as keyof typeof title] || 'Untitled'}
        </span>
        <div className="window__header-controls">{headerControls}</div>
      </div>
    ),
    [title, language, icon, handleRequestFocus, headerRef, headerData],
  );
};

export default WindowHeader;
