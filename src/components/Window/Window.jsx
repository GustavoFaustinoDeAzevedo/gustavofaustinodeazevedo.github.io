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
import { useMachine } from '@xstate/react';
import { windowMachine } from '../../machines/windowMachine';
// import useWindowTimeline from './useWindowTimeline';

gsap.registerPlugin(useGSAP);

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
  const timelineRef = createRef('timeline' + id);
  const headerRef = useRef(null);
  const maximizeOrRestoreRef = useRef(() => {});
  const minimizeOrRestoreRef = useRef(() => {});
  // const minimizeRef = useRef(() => {});

  const isWindowMounted = useRef(false);
  const minimizeTimelineRef = useRef(null);

  const { initialState, updateInitialState } = useInitialState(windowRef);

  const { openWindow, maximizeWindow } = useWindowAnimations;

  const [state, send] = useMachine(windowMachine);

  useEffect(() => {
    console.log('State changed:', state.value);

    switch (state.value) {
      case 'unset':
        send({ type: 'OPEN', onFocus });
        break;
      case 'minimized':
        gsap.to(windowRef.current, {
          scale: 0.5,
          opacity: 0.7,
          duration: 0.5,
        });
        break;
      case 'maximized':
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
        break;
      case 'closed':
        gsap.to(windowRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          onComplete: () => onClose(),
        });
        break;
      default:
        gsap.to(windowRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
        });
        break;
    }
  }, [state]);

  // useEffect(() => {
  //   if (!timelineRef.current) {
  //     timelineRef.current = useWindowTimeline(windowRef, index, timelineRef);
  //   }
  // }, [windowRef, index]);

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
    // openWindow(windowRef, onFocus);
  }, []);

  // useEffect(() => {
  //   if (!timelineRef.current) return;
  //   isMinimized ? timelineRef.current.play(0) : timelineRef.current.reverse(1);
  // }, [isMinimized]);

  // useGSAP(() => {
  //   maximizeOrRestoreRef.current = () => {
  //     if (isMaximized) {

  //       const { x, y, width, height } = initialState;
  //       const rounded = {
  //         x: Math.round(x),
  //         y: Math.round(y),
  //         width: `${Math.round(width)}px`,
  //         height: `${Math.round(height)}px`,
  //       };
  //       maximizeWindow(
  //         windowRef,
  //         onMaximize,
  //         rounded.x,
  //         rounded.y,
  //         rounded.width,
  //         rounded.height
  //       );
  //     } else {
  //       updateInitialState();
  //       maximizeWindow(windowRef, onMaximize);
  //     }
  //   };
  // }, [isMaximized, onMaximize]);

  // useGSAP(() => {
  //   minimizeOrRestoreRef.current = () => {
  //     if (isMinimized) {
  //       // RESTORE

  //       const { x, y, width, height } = initialState;
  //       const rounded = {
  //         x: Math.round(x),
  //         y: Math.round(y),
  //         width: `${Math.round(width)}px`,
  //         height: `${Math.round(height)}px`,
  //       };
  //       minimizeWindow(
  //         windowRef,
  //         onMinimize,
  //         rounded.x,
  //         rounded.y,
  //         rounded.width,
  //         rounded.height
  //       );
  //     } else {
  //       // MAXIMIZE
  //       updateInitialState();
  //       maximizeWindow(windowRef, onMinimize);
  //     }
  //   };
  // }, [isMinimized, onMaximize]);

  // const handleMinimize = () => {
  //   if (timelineRef && timelineRef.current) {
  //     onMinimize();
  //     timelineRef.current.play();
  //   }
  // };

  // useEffect(() => {
  //   // prevIsMinimized.current = !isMinimized;
  //   if (isWindowMounted.current === false) {
  //     isWindowMounted.current = true;
  //     return;
  //   }
  //   // minimizeTimelineRef.current = timelineRef.current.tweenFromTo(
  //   //   'minimize',
  //   //   'minimizeEnd'
  //   // );

  //   if (timelineRef.current) {
  //     console.log('isMinimized mudou: ', isMinimized);
  //     if (isMinimized) {
  //       timelineRef.current.reverse();
  //     } else {
  //       timelineRef.current.play();
  //     }
  //   }
  // }, [isMinimized]);

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

  const handleMinimize = () => {
    const rect = windowRef.current.getBoundingClientRect();
    send({ type: 'MINIMIZE', x: rect.x, y: rect.y });
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      const rect = windowRef.current.getBoundingClientRect();
      send({ type: 'MAXIMIZE', width: rect.width, height: rect.height });
    } else {
      send({ type: 'RESTORE' });
    }
  };
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
        // onMinimize={() => minimizeOrRestoreRef.current()}
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onClose={() => send({ type: 'CLOSE' })}
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
