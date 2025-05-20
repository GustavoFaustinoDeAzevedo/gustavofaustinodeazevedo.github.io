import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import WindowHeader from './windowHeader';
import WindowContent from './WindowContent';
import useWindowTimeline from './hooks/useWindowTimeline';
import useInitialState from './hooks/useInitialState';
import useClickOutside from '../../hooks/useClickOutside';
import useWindowDraggable from './useWindowDraggable';
import getWindowClass from './utils/getWindowClass';
import useRefs from '../../contexts/useRefs';
import getRandomPosition from './utils/getRandomPosition';
import useWindowAnimations from './useWindowAnimations';
import { updateWindow } from '../../store/slices/windowSlice';
// import useWindowTimeline from './useWindowTimeline';

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
  isRequestingRestore,
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
  const timelineRef = createRef('timeline' + id);
  const headerRef = useRef(null);
  const { openWindow, maximizeWindow, restoreWindow, minimizeWindow } =
    useWindowAnimations;

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
  }, []);

  useEffect(() => {
    if (!windowRef.current) return;
    if (isMaximized) {
      const { width, height } = getWindowInfo(windowRef);
      maximizeWindow(windowRef, () =>
        onUpdateWindow({
          id,
          startX: x,
          startY: y,
          width: 0,
          height: 0,
          startWidth: width,
          startHeight: height,
        })
      );
    }
  }, [isMaximized]);

  useEffect(() => {
    if (!windowRef.current) return;
    if (isMinimized) {
      const { width, height } = getWindowInfo(windowRef);
      minimizeWindow(
        windowRef,
        () =>
          onUpdateWindow({
            id,
            startX: x,
            startY: y,
            startWidth: width,
            startHeight: height,
          }),
        x
      );
    }
  }, [isMinimized]);

  useEffect(() => {
    if (!windowRef.current) return;
    if ((isMaximized || isMinimized) && isRequestingRestore) {
      restoreWindow(
        windowRef,
        () =>
          onUpdateWindow({
            id,
            maximized: isMinimized && isMaximized ? true : false,
            minimized: false,
            requestingRestore: false,
            x: startX,
            y: startY,
            width: startWidth,
            height: startHeight,
          }),
        startX,
        startY,
        startWidth,
        startHeight
      );
    }
  }, [isRequestingRestore]);

  const handleMinimize = () => {
    onUpdateWindow({
      id,
      minimized: true,
    });
    onUnfocus();
  };
  const handleMaximize = () => {
    onUpdateWindow({
      id: id,
      maximized: true,
    });
    onFocus(id);
  };

  const handleRestore = () => {
    onUpdateWindow({
      id: id,
      requestingRestore: true,
    });
    onFocus(id);
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
        onClose={onClose}
        {...{ id, title, isOpen, isFocused, isMinimized, isMaximized }}
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
