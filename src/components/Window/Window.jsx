import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import WindowHeader from './windowHeader';
import WindowContent from './WindowContent';
import useClickOutside from '../../hooks/useClickOutside';
import useWindowDraggable from './useWindowDraggable';
import getWindowClass from './utils/getWindowClass';
import useRefs from '../../contexts/useRefs';
import getRandomPosition from './utils/getRandomPosition';
import useWindowAnimations from './useWindowAnimations';

gsap.registerPlugin(useGSAP);

const Window = ({
  id,
  index,
  zIndex,
  isOpen,
  title,
  icon,
  x,
  y,
  startX,
  startY,
  width,
  height,
  content,
  startWidth,
  startHeight,
  isFocused,
  isMinimized,
  isMaximized,
  isRequestingOpen,
  isRequestingRestore,
  isRequestingClose,
  isRequestingMaximize,
  isRequestingMinimize,
  desktopRef,
  onFocus,
  onUnfocus,
  onUpdateWindow,
  onClose,
  onContextMenu,
  children,
}) => {
  const { createRef } = useRefs();
  const windowRef = createRef(id);
  const headerRef = useRef(null);
  const {
    openWindow,
    maximizeWindow,
    restoreWindow,
    minimizeWindow,
    closeWindow,
  } = useWindowAnimations;

  const className = useMemo(
    () => getWindowClass({ isFocused, isMinimized, isOpen, isMaximized }),
    [isFocused, isMinimized, isOpen, isMaximized]
  );

  const getWindowInfo = (windowRef) =>
    windowRef.current.getBoundingClientRect();

  useEffect(() => {
    if (!windowRef.current || !headerRef.current) return;

    const { randomX, randomY } = getRandomPosition();
    gsap.set(windowRef.current, { x: randomX, y: randomY });
    openWindow(windowRef);

    const { width, height } = getWindowInfo(windowRef);
    onUpdateWindow({
      id,
      x: randomX,
      y: randomY,
      startX: randomX,
      startY: randomY,
      width,
      height,
      startWidth: width,
      startHeight: height,
    });

    useWindowDraggable(
      windowRef,
      headerRef.current,
      desktopRef.current,
      onFocus,
      ({ startX, startY, x, y, width, height, startWidth, startHeight }) =>
        onUpdateWindow({
          id,
          startX,
          startY,
          x,
          y,
          width,
          height,
          startWidth,
          startHeight,
        }),
      width,
      height
    );
  }, [isRequestingOpen]);

  useEffect(() => {
    if (!windowRef.current) return;
    if (isMaximized && !isRequestingRestore) {
      const { width, height } = getWindowInfo(windowRef);
      maximizeWindow(windowRef, () => {
        onUpdateWindow({
          id,
          x: 0,
          y: 0,
          startX: x,
          startY: y,
          width: 0,
          height: 0,
          startWidth: width,
          startHeight: height,
        });
        onFocus(id);
      });
    }
  }, [isMaximized]);

  useEffect(() => {
    if (!windowRef.current) return;
    if (isMinimized && !isRequestingRestore) {
      const { width, height } = getWindowInfo(windowRef);
      minimizeWindow(
        windowRef,
        () => {
          onUpdateWindow({
            id,
            x: startX,
            y: startY,
            startX: x,
            startY: y,
            width: startWidth,
            height: startHeight,
            startWidth: width,
            startHeight: height,
          });
          onUnfocus();
        },
        index * 49
      );
    }
  }, [isMinimized]);

  useEffect(() => {
    if (!windowRef.current) return;
    if ((isMaximized || isMinimized) && isRequestingRestore) {
      restoreWindow(
        windowRef,
        () => {
          onUpdateWindow({
            id,
            maximized: isMinimized && isMaximized ? true : false,
            minimized: false,
            requestingRestore: false,
            x: startX,
            y: startY,
            startX: x,
            startY: y,
            width: startWidth,
            height: startHeight,
            startWidth: width,
            startHeight: height,
          });
          onFocus(id);
        },
        startX,
        startY,
        startWidth,
        startHeight
      );
    }
  }, [isRequestingRestore]);

  useEffect(() => {
    if (!windowRef.current) return;

    if (isOpen && isRequestingClose) {
      closeWindow(windowRef, () => {
        onClose({
          id,
          isRequestingClose: true,
        });
        onUnfocus(id);
      });
    }
  }, [isRequestingClose]);

  const handleMinimize = () => {
    onUpdateWindow({
      id,
      minimized: true,
    });
  };
  const handleMaximize = () => {
    onUpdateWindow({
      id: id,
      maximized: true,
    });
  };

  const handleRestore = () => {
    onUpdateWindow({
      id: id,
      requestingRestore: true,
    });
  };

  const handleClose = () => {
    onUpdateWindow({
      id: id,
      requestingClose: true,
    });
  };

  useClickOutside(windowRef, onUnfocus, isFocused);
  return (
    <div
      ref={windowRef}
      className={`${className} parent`}
      style={{ zIndex }}
      onContextMenu={onContextMenu}
      id={id}
    >
      <WindowHeader
        headerRef={headerRef}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onRestore={handleRestore}
        onClose={handleClose}
        {...{ id, title, icon, isOpen, isFocused, isMinimized, isMaximized }}
      />
      <WindowContent
        onFocus={onFocus}
        isOpen={isOpen}
        id={id}
        content={content}
      />
    </div>
  );
};

export default Window;
