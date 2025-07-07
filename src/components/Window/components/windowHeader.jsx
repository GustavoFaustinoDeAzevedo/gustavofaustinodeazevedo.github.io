import React from 'react';
import Icon from '../../ui/GlobalStyles/components/Icon';

const WindowHeader = ({
  title = 'Untitled',
  headerRef = null,
  icon = '',
  language = 'eng',
  isMaximized = false,
  onFocus = () => {},
  onMinimize = () => {},
  onMaximize = () => {},
  onRestore = () => {},
  onClose = () => {},
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
    <div className="window-header">
      <span
        onTouchStart={onFocus}
        onClick={onFocus}
        onMouseDown={onFocus}
        ref={headerRef}
        title={title[language]}
        aria-label={title[language]}
        className="window-title"
      >
        <Icon variant={icon} style={stylePng} />
        {title[language]}
      </span>
      <div className="window-controls">
        <button
          aria-label={language === 'por' ? 'Minimizar' : 'Minimize'}
          title={language === 'por' ? 'Minimizar' : 'Minimize'}
          className="minimize"
          onClick={onMinimize}
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
          className="maximize"
          onClick={() => (isMaximized ? onRestore() : onMaximize())}
        >
          <Icon
            variant={`${isMaximized ? 'restore' : 'maximize'}`}
            style={styleSvg}
          />
        </button>
        <button
          aria-label={language === 'por' ? 'Fechar' : 'Close'}
          title={language === 'por' ? 'Fechar' : 'Close'}
          className="close"
          onClick={onClose}
        >
          <Icon variant="close" style={styleSvg} />
        </button>
      </div>
    </div>
  );
};

export default WindowHeader;
