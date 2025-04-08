import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useRefs } from '../../contexts/RefsContext';
import useClickOutside from '../../hooks/useClickOutside';
import DefaultContent from './DefaultContent';

gsap.registerPlugin(Draggable);

const Window = ({
  id,
  title,
  zIndex,
  isOpen,
  children,
  desktopRef,
  language,
  ...handlers
}) => {
  const {
    isFocused,
    isMinimized,
    isMaximized,
    onFocus,
    onUnfocus,
    onMinimize,
    onMaximize,
    onClose,
    onContextMenu,
  } = handlers;

  const { createRef } = useRefs();
  const windowRef = createRef(id);
  const headerRef = useRef(null);

  // Use useMemo to derive class based on states
  const className = useMemo(
    () =>
      `window 
      ${isFocused ? 'focus' : ''} 
      ${isMinimized ? 'minimized' : ''} 
      ${isOpen ? 'open' : ''} 
      ${isMaximized ? 'maximized' : ''}`,
    [isFocused, isMinimized, isOpen, isMaximized]
  );

  // Function to open the window with animation
  const openWindow = useCallback(() => {
    if (!windowRef.current) return;
    gsap.set(windowRef.current, { scale: 0.8, opacity: 0 });
    gsap.to(windowRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [windowRef]);

  // Function that closes (or minimizes/closes) the window with animation
  const closeWindow = useCallback(
    (handler) => {
      if (!windowRef.current) return;
      gsap.to(windowRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: () => handler(),
      });
    },
    [windowRef]
  );

  // Function to maximize the window with a separate animation
  const maximizeWindow = useCallback(() => {
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    const clone = windowRef.current.cloneNode(true);

    Object.assign(clone.style, {
      position: 'fixed',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: '0',
      opacity: '1',
      pointerEvents: 'none',
      zIndex: '9999',
    });

    document.body.appendChild(clone);

    gsap.to(clone, {
      x: -rect.left,
      y: -rect.top,
      width: '100vw',
      height: '100vh',
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.removeChild(clone);
        windowRef.current.classList.add('maximized');
        onMaximize();
      },
    });
  }, [windowRef, onMaximize]);

  // Specific handlers for minimizing and closing, memorized to avoid inline functions
  const handleMinimize = useCallback(
    () => closeWindow(onMinimize),
    [closeWindow, onMinimize]
  );
  const handleClose = useCallback(
    () => closeWindow(onClose),
    [closeWindow, onClose]
  );

  // Effect to initialize the Draggable and the opening animation
  useEffect(() => {
    if (windowRef.current && headerRef.current) {
      Draggable.create(windowRef.current, {
        trigger: headerRef.current,
        type: 'x,y',
        bounds: desktopRef.current,
        inertia: true,
        onPress: onFocus,
        onDragStart: onFocus,
      });

      // Set a random starting position
      const desktop = document.querySelector('body');
      if (desktop) {
        const x = Math.floor(Math.random() * (desktop.offsetWidth / 2));
        const y = Math.floor(Math.random() * (desktop.offsetHeight / 4));
        gsap.set(windowRef.current, { x, y });
      }

      openWindow();
    }
  }, [isOpen]);

  // Hook to close window on click outside (if applicable)
useClickOutside(windowRef, onUnfocus, isFocused);

  return (
    <div
      ref={windowRef}
      className={`${className} parent`}
      style={{ zIndex: zIndex }}
      onContextMenu={onContextMenu}
      id={`window-${zIndex}-${id}`}
    >
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
            onClick={handleMinimize}
          >
            <i className="icon minimize"></i>
          </button>
          <button
            aria-label={
              isMaximized
                ? language !== 'POR'
                  ? 'Maximize'
                  : 'Maximizar'
                : language !== 'POR'
                ? 'Restore'
                : 'Restaurar'
            }
            title={
              isMaximized
                ? language !== 'POR'
                  ? 'Maximize'
                  : 'Maximizar'
                : language !== 'POR'
                ? 'Restore'
                : 'Restaurar'
            }
            className="maximize"
            onClick={maximizeWindow}
          >
            {isMaximized ? (
              <i className="icon restore"></i>
            ) : (
              <i className="icon maximize"></i>
            )}
          </button>
          <button
            aria-label={language !== 'POR' ? 'Close' : 'Fechar'}
            title={language !== 'POR' ? 'Close' : 'Fechar'}
            className="close"
            onClick={handleClose}
          >
            <i className="icon close"></i>
          </button>
        </div>
      </div>
      <div
        onTouchStart={onFocus}
        onMouseDown={onFocus}
        onClick={onFocus}
        className="window-content"
      >
        {children || <DefaultContent id={id} />}
      </div>
    </div>
  );
};

export default Window;
