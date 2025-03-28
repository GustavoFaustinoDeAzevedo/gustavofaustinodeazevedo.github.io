import React, { useEffect, useRef } from 'react';
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

  const className = `window 
  ${isFocused ? 'focus' : ''}
  ${isMinimized ? 'minimized' : ''} 
  ${isOpen ? 'open' : ''}
  ${isMaximized ? 'maximized' : ''}`;

  useEffect(() => {
    if (windowRef.current && headerRef.current) {
      // Initialize draggable
      Draggable.create(windowRef.current, {
        trigger: headerRef.current,
        type: 'x,y',
        bounds: desktopRef.current,
        inertia: true,
        onPress: onFocus,
        onDragStart: onFocus,
      });

      // Random initial position
      const desktop = document.querySelector('.desktop');
      const x = Math.floor(Math.random() * (desktop.offsetWidth / 2));
      const y = Math.floor(Math.random() * (desktop.offsetHeight / 4));

      gsap.set(windowRef.current, { x, y });

      openWindow(windowRef, y);
    }
  }, [desktopRef, isOpen]);

  useEffect(() => {
    // Chama a animação ao montar a janela
  }, [isOpen]);

  useClickOutside(windowRef, onUnfocus, isFocused);

  const openWindow = (windowRef) => {
    if (!windowRef.current) return;

    // Define o estado inicial (invisível e pequeno)
    gsap.set(windowRef.current, { scale: 0.8, opacity: 0 });

    // Faz a animação de abertura
    gsap.to(windowRef.current, {
      scale: 1, // Tamanho normal
      opacity: 1, // Totalmente visível
      duration: 0.3, // Duração da animação
      ease: 'power2.out',
    });
  };

  const closeWindow = (handler) => {
    if (!windowRef.current) return;

    gsap.to(windowRef.current, {
      scale: 0.9, // Reduz levemente o tamanho
      opacity: 0, // Some suavemente
      duration: 0.2, // Duração da animação
      ease: 'power2.inOut',
      onComplete: () => handler(), // Chama a função de fechar após a animação
    });
  };

  const maximizeWindow = () => {
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
        windowRef.current.classList.add('maximized'); // Aplica a classe de full-screen
        onMaximize();
      },
    });
  };

  return (
    <div
      ref={windowRef}
      className={`${className} parent`}
      style={{ zIndex: zIndex }}
      onContextMenu={onContextMenu}
      id={id}
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
            onClick={() => closeWindow(onMinimize)}
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
            onClick={() => closeWindow(onClose)}
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
