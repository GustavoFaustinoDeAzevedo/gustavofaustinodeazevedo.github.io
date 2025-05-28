import getRandomPosition from '../utils/getRandomPosition';
import gsap from 'gsap';

import { useEffect } from 'react';

const useWindowLifecycle = ({
  windowRef,
  headerRef,
  desktopRef,
  windowParams,
  onFocus,
  onUnfocus,
  onClose,
  updateWindowState,
  animations: {
    openWindow,
    maximizeWindow,
    restoreWindow,
    minimizeWindow,
    closeWindow,
  },
  getWindowInfo,
  useWindowDraggable,
}) => {
  const {
    id,
    index,
    x,
    y,
    startX,
    startY,
    width,
    height,
    startWidth,
    startHeight,
    isFocused,
    isMinimized,
    isMaximized,
    isRequestingOpen,
    isRequestingRestore,
    isRequestingClose,
    isOpen,
  } = windowParams;

  useEffect(() => {
    if (!windowRef.current || !headerRef.current) return;

    const { randomX, randomY } = getRandomPosition();
    gsap.set(windowRef.current, { x: randomX, y: randomY });
    openWindow(windowRef);

    const { width, height } = getWindowInfo();
    updateWindowState({
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
      (params) => updateWindowState(params),
      width,
      height
    );
  }, [isRequestingOpen]);

  useEffect(() => {
    if (!windowRef.current || !isMaximized || isRequestingRestore) return;

    const { width, height } = getWindowInfo();
    maximizeWindow(windowRef, () => {
      updateWindowState({
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
  }, [isMaximized]);

  useEffect(() => {
    if (!windowRef.current || !isMinimized || isRequestingRestore) return;

    const { width, height } = getWindowInfo();
    minimizeWindow(
      windowRef,
      () => {
        updateWindowState({
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
      index * 55
    );
  }, [isMinimized]);

  useEffect(() => {
    if (
      !windowRef.current ||
      !isRequestingRestore ||
      (!isMaximized && !isMinimized)
    )
      return;

    restoreWindow(
      windowRef,
      () => {
        updateWindowState({
          maximized: isMinimized && isMaximized,
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
  }, [isRequestingRestore]);

  useEffect(() => {
    if (!windowRef.current || !isOpen || !isRequestingClose) return;

    closeWindow(windowRef, () => {
      onClose({
        id,
        isRequestingClose: true,
      });
      onUnfocus(id);
    });
  }, [isRequestingClose]);
};

export default useWindowLifecycle;
