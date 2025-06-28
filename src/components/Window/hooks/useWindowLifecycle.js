
/**
 * Custom React hook to manage the lifecycle and animations of a window component.
 *
 * Handles opening, maximizing, minimizing, restoring, and closing window states,
 * as well as updating window position and dimensions, and managing focus/unfocus events.
 *
 * @param {Object} params - The parameters object.
 * @param {React.RefObject} params.windowRef - Ref to the window DOM element.
 * @param {React.RefObject} params.headerRef - Ref to the window header DOM element.
 * @param {React.RefObject} params.desktopRef - Ref to the desktop DOM element.
 * @param {Object} params.windowParams - Current state and parameters of the window.
 * @param {Function} params.updateWindowState - Function to update the window's state.
 * @param {Object} params.animations - Animation functions for window transitions.
 * @param {Function} params.animations.openWindow - Animation for opening the window.
 * @param {Function} params.animations.maximizeWindow - Animation for maximizing the window.
 * @param {Function} params.animations.restoreWindow - Animation for restoring the window.
 * @param {Function} params.animations.minimizeWindow - Animation for minimizing the window.
 * @param {Function} params.animations.closeWindow - Animation for closing the window.
 * @param {Function} params.getWindowInfo - Function to get current window dimensions.
 * @param {Function} params.createWindowDraggable - Function to make the window draggable.
 *
 * @returns {void}
 */
import getRandomPosition from '../utils/getRandomPosition';
import gsap from 'gsap';
import { useEffect } from 'react';

const useWindowLifecycle = ({
  windowRef,
  headerRef,
  desktopRef,
  windowParams,
  windowActions,
  // handleFocusWindow,
  // onUnfocus,
  // onClose,
  updateWindowState,
  animations: {
    openWindow,
    maximizeWindow,
    restoreWindow,
    minimizeWindow,
    closeWindow,
  },
  getWindowInfo,
  createWindowDraggable,
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
    children,
    
  } = windowParams;

  const { handleFocusWindow, handleResetFocus, handleCloseWindow } = windowActions

  useEffect(() => {
    if (!windowRef.current || !headerRef.current) return;

    const { randomX, randomY } = getRandomPosition();
    gsap.set(windowRef.current, { x: randomX, y: randomY });

    const childElement = windowRef.current.querySelector("[data-initial-dimension]");
    const { width, height } = JSON.parse(childElement?.dataset?.initialDimension ?? '{"width": "350", "height": "450"}');

    openWindow(windowRef, width, height);

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

    createWindowDraggable(
      windowRef,
      headerRef.current,
      desktopRef.current,
      handleFocusWindow,
      (params) => updateWindowState(params),
      width,
      height,
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
      handleFocusWindow(id);
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
        handleResetFocus;
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
    handleFocusWindow(id);
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
      handleCloseWindow({
        id,
        isRequestingClose: true,
      });
      handleResetFocus();
    });
  }, [isRequestingClose]);
};

export default useWindowLifecycle;
