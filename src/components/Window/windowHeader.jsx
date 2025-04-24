import React from 'react';

const WindowHeader = ({
  title = 'Untitled',
  headerRef = null,
  onFocus = () => {},
  language = 'ENG',
  isMaximized = false,
  onMinimize = () => {},
  onMaximize = () => {},
  onClose = () => {},
}) => {
  return (
    <div className="window-header">
      <span
        onTouchStart={onFocus}
        onClick={onFocus}
        onMouseDown={onFocus}
        ref={headerRef}
        title={title}
        aria-label={title}
        className="window-title"
      >
        {title}
      </span>
      <div className="window-controls">
        <button
          aria-label={language === 'POR' ? 'Minimizar' : 'Minimize'}
          title={language === 'POR' ? 'Minimizar' : 'Minimize'}
          className="minimize"
          onClick={onMinimize}
        >
          <i className="icon minimize" />
        </button>
        <button
          aria-label={
            language === 'POR'
              ? isMaximized
                ? 'Restaurar'
                : 'Maximizar'
              : isMaximized
              ? 'Restore'
              : 'Maximize'
          }
          title={
            language === 'POR'
              ? isMaximized
                ? 'Restaurar'
                : 'Maximizar'
              : isMaximized
              ? 'Restore'
              : 'Maximize'
          }
          className="maximize"
          onClick={onMaximize}
        >
          <i className={`icon ${isMaximized ? 'restore' : 'maximize'}`} />
        </button>
        <button
          aria-label={language === 'POR' ? 'Fechar' : 'Close'}
          title={language === 'POR' ? 'Fechar' : 'Close'}
          className="close"
          onClick={onClose}
        >
          <i className="icon close" />
        </button>
      </div>
    </div>
  );
};

export default WindowHeader;
