// File: components/WindowHeader.jsx
import React from 'react';

const WindowHeader = ({
  title,
  headerRef,
  onFocus,
  language,
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
}) => (
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
        aria-label={language !== 'POR' ? 'Minimize' : 'Minimizar'}
        title={language !== 'POR' ? 'Minimize' : 'Minimizar'}
        className="minimize"
        onClick={onMinimize}
      >
        <i className="icon minimize" />
      </button>
      <button
        aria-label={
          isMaximized
            ? language !== 'POR'
              ? 'Restore'
              : 'Restaurar'
            : language !== 'POR'
            ? 'Maximize'
            : 'Maximizar'
        }
        title={
          isMaximized
            ? language !== 'POR'
              ? 'Restore'
              : 'Restaurar'
            : language !== 'POR'
            ? 'Maximize'
            : 'Maximizar'
        }
        className="maximize"
        onClick={onMaximize}
      >
        {isMaximized ? (
          <i className="icon restore" />
        ) : (
          <i className="icon maximize" />
        )}
      </button>
      <button
        aria-label={language !== 'POR' ? 'Close' : 'Fechar'}
        title={language !== 'POR' ? 'Close' : 'Fechar'}
        className="close"
        onClick={onClose}
      >
        <i className="icon close" />
      </button>
    </div>
  </div>
);

export default WindowHeader;
