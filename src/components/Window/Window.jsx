import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { useRefs } from '../../contexts/useRefs';
import gsap from 'gsap';
import useClickOutside from '../../hooks/useClickOutside';
import DefaultContent from './DefaultContent';
import WindowHeader from './windowHeader';
import useWindowAnimations from './useWindowAnimations';
import useWindowDraggable from './useWindowDraggable';
import getRandomPosition from './utils/getRandomPosition';
import getWindowClass from './windowClasses';

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

  const className = useMemo(
    () => getWindowClass({ isFocused, isMinimized, isOpen, isMaximized }),
    [isFocused, isMinimized, isOpen, isMaximized]
  );

  const { openWindow, closeWindow, maximizeWindow } = useWindowAnimations(
    windowRef,
    onMaximize
  );

  const handleMinimize = useCallback(
    () => closeWindow(onMinimize),
    [closeWindow, onMinimize]
  );
  const handleClose = useCallback(
    () => closeWindow(onClose),
    [closeWindow, onClose]
  );

  useEffect(() => {
    if (!windowRef.current || !headerRef.current) return;
    useWindowDraggable(
      windowRef.current,
      headerRef.current,
      desktopRef.current,
      onFocus
    );

    const { x, y } = getRandomPosition();
    gsap.set(windowRef.current, { x, y });
    openWindow();
  }, [isOpen]);

  useClickOutside(windowRef, onUnfocus, isFocused);

  return (
    <div
      ref={windowRef}
      className={`${className} parent`}
      style={{ zIndex }}
      onContextMenu={onContextMenu}
      id={`window-${zIndex}-${id}`}
    >
      <WindowHeader
        title={title}
        headerRef={headerRef}
        onFocus={onFocus}
        language={language}
        isMaximized={isMaximized}
        onMinimize={handleMinimize}
        onMaximize={maximizeWindow}
        onClose={handleClose}
      />
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
