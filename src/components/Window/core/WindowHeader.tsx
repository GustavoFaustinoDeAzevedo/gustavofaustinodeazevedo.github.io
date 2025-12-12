import React from 'react';
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

  return (
    <div className="window__header">
      <span
        onTouchStart={handleRequestFocus}
        onClick={handleRequestFocus}
        onMouseDown={handleRequestFocus}
        ref={headerRef}
        title={title[language as keyof typeof title] || 'Untitled'}
        aria-label={title[language as keyof typeof title] || 'Untitled'}
        className="window__header-title"
      >
        <Icon variant={icon || 'default'} style={stylePng} />
        {title[language as keyof typeof title] || 'Untitled'}
      </span>
      <div className="window__header-controls">
        {headerData.map(({ name, title, icon, action, condition }) => {
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
              <Icon variant={icon} style={styleSvg} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WindowHeader;
