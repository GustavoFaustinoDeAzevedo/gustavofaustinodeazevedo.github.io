import React from 'react';
import Icon from '@components/ui/GlobalStyles/components/Icon';
import { Language } from '@/store/slices/settings';

type WindowHeaderProps = {
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
  isMaximized = false,
  helpContent = null,
  handleRequestFocus,
  handleRequestMinimize,
  handleRequestMaximize,
  handleRequestRestore,
  handleRequestClose,
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
        {helpContent && (
          <button
            type="button"
            aria-label={language === 'por' ? 'Ajuda' : 'Help'}
            title={language === 'por' ? 'Ajuda' : 'Help'}
            className="window__header-controls-help"
            onClick={() => alert(helpContent)}
          >
            <Icon variant="help" />
          </button>
        )}
        {handleRequestMinimize && (
          <button
            type="button"
            aria-label={language === 'por' ? 'Minimizar' : 'Minimize'}
            title={language === 'por' ? 'Minimizar' : 'Minimize'}
            className="window__header-controls-minimize"
            onClick={handleRequestMinimize}
          >
            <Icon variant="minimize" style={styleSvg} />
          </button>
        )}
        {handleRequestMaximize && (
          <button
            type="button"
            aria-label={
              language === 'por'
                ? isMaximized
                  ? 'Restaurar'
                  : 'Maximizar'
                : isMaximized
                ? 'Restore'
                : 'Maximize'
            }
            title={
              language === 'por'
                ? isMaximized
                  ? 'Restaurar'
                  : 'Maximizar'
                : isMaximized
                ? 'Restore'
                : 'Maximize'
            }
            className="window__header-controls-maximize"
            onClick={isMaximized ? handleRequestRestore : handleRequestMaximize}
          >
            <Icon
              variant={`${isMaximized ? 'restore' : 'maximize'}`}
              style={styleSvg}
            />
          </button>
        )}
        {handleRequestClose && (
          <button
            type="button"
            aria-label={language === 'por' ? 'Fechar' : 'Close'}
            title={language === 'por' ? 'Fechar' : 'Close'}
            className="window__header-controls-close"
            onClick={handleRequestClose}
          >
            <Icon variant="close" style={styleSvg} />
          </button>
        )}
      </div>
    </div>
  );
};

export default WindowHeader;
