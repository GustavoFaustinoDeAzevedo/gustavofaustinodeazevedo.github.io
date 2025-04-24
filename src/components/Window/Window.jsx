import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';

import WindowHeader from './WindowHeader.jsx';
import WindowContent from './WindowContent';
import useWindowTimeline from './hooks/useWindowTimeline';
import useInitialState from './hooks/useInitialState';
import useClickOutside from '../../hooks/useClickOutside';
import useWindowDraggable from './useWindowDraggable';
import getWindowClass from './utils/getWindowClass';
import useRefs from '../../contexts/useRefs';
import getRandomPosition from './utils/getRandomPosition';
import useWindowAnimations from './useWindowAnimations';

const Window = ({
  id,
  index,
  zIndex,
  isOpen,
  title,
  isFocused,
  isMinimized,
  isMaximized,
  desktopRef,
  onFocus,
  onUnfocus,
  onMinimize,
  onMaximize,
  onClose,
  onContextMenu,
  children,
}) => {
  const { createRef } = useRefs();
  const windowRef = createRef(id);
  const headerRef = useRef(null);
  const maximizeOrRestoreRef = useRef(() => {});
  const minimizeRef = useRef(() => {});

  const { initialState, updateInitialState } = useInitialState(windowRef);
  const timelineRef = useWindowTimeline(windowRef, index);
  const { openWindow, maximizeWindow } = useWindowAnimations;

  useClickOutside(windowRef, onUnfocus, isFocused);

  useEffect(() => {
    if (!windowRef.current || !headerRef.current) return;

    useWindowDraggable(
      windowRef.current,
      headerRef.current,
      desktopRef.current,
      onFocus,
      updateInitialState
    );

    const { x, y } = getRandomPosition();
    gsap.set(windowRef.current, { x, y });
    openWindow(windowRef, onFocus);
    updateInitialState();
  }, []);

  // useEffect(() => {
  //   if (!timelineRef.current) return;
  //   isMinimized ? timelineRef.current.play(0) : timelineRef.current.reverse(1);
  // }, [isMinimized]);

  useEffect(() => {
    maximizeOrRestoreRef.current = () => {
      if (isMaximized) {
        // RESTORE

        const { x, y, width, height } = initialState;
        const rounded = {
          x: Math.round(x),
          y: Math.round(y),
          width: `${Math.round(width)}px`,
          height: `${Math.round(height)}px`,
        };
        maximizeWindow(
          windowRef,
          onMaximize,
          rounded.x,
          rounded.y,
          rounded.width,
          rounded.height
        );
      } else {
        // MAXIMIZE
        updateInitialState();
        maximizeWindow(windowRef, onMaximize);
      }
    };
  }, [isMaximized, onMaximize]);

  useEffect(() => {
    minimizeRef.current = () => {
      if (timelineRef && timelineRef.current) {
        console.log(isMinimized);
        isMinimized
          ? timelineRef.current.reverse()
          : timelineRef.current.play();
      }
    };
  }, [isMinimized, onMinimize]);

  const className = useMemo(
    () => getWindowClass({ isFocused, isMinimized, isOpen, isMaximized }),
    [isFocused, isMinimized, isOpen, isMaximized]
  );

  // const handleMaximize = useCallback(() => {
  //   updateInitialState();
  //   maximizeWindow(windowRef, onMaximize);
  // }, [onMaximize]);

  // const handleRestore = useCallback(() => {
  //   let { x, y, width, height } = initialState.current;

  //   x = Math.round(x);
  //   y = Math.round(y);
  //   width = Math.round(width);
  //   height = Math.round(height);

  //   width = width + 'px';
  //   height = height + 'px';

  //   maximizeWindow(windowRef, onMaximize, x, y, width, height);
  // }, [initialState, onMaximize]);

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
        onMinimize={onMinimize}
        onMaximize={() => maximizeOrRestoreRef.current()}
        onClose={onClose}
        {...{ id, title, isOpen, isFocused, isMinimized, isMaximized }}
      />
      <WindowContent
        onFocus={onFocus}
        isOpen={isOpen}
        id={id}
        children={children}
      />
    </div>
  );
};

export default Window;
