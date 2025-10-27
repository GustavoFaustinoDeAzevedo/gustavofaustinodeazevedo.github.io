import React from 'react';
import Icon from '@/components/ui/GlobalStyles/components/Icon';

const WindowHeader = ({
  title = 'Untitled',
  headerRef = null,
  icon = '',
  language = 'eng',
  isMaximized = false,
  handleRequestFocus,
  handleRequestMinimize,
  handleRequestMaximize,
  handleRequestRestore,
  handleRequestClose,
}) => {
  const stylePng = {
    color: 'var(--c-text)',
    maxWidth: '1rem',
    maxHeight: '1rem',
    backgroundColor: 'transparent',
  };

  const styleSvg = {
    color: 'var(--c-text)',
    maxWidth: '1rem',
    maxHeight: '1rem',
    backgroundColor: 'var(--c-icon-bg)',
  };
  return (
    <div className="window__header">
      <span
        onTouchStart={handleRequestFocus}
        onClick={handleRequestFocus}
        onMouseDown={handleRequestFocus}
        ref={headerRef}
        title={title[language] || 'Untitled'}
        aria-label={title[language] || 'Untitled'}
        className="window__header-title"
      >
        <Icon variant={icon || 'default'} style={stylePng} />
        {title[language] || 'Untitled'}
      </span>
      <div className="window__header-controls">
        <button
          aria-label={language === 'por' ? 'Minimizar' : 'Minimize'}
          title={language === 'por' ? 'Minimizar' : 'Minimize'}
          className="window__header-controls-minimize"
          onClick={handleRequestMinimize}
        >
          <Icon variant="minimize" style={styleSvg} />
        </button>
        <button
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
        <button
          aria-label={language === 'por' ? 'Fechar' : 'Close'}
          title={language === 'por' ? 'Fechar' : 'Close'}
          className="window__header-controls-close"
          onClick={handleRequestClose}
        >
          <Icon variant="close" style={styleSvg} />
        </button>
      </div>
    </div>
  );
};

export default WindowHeader;
