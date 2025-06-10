/**
 * Custom React hook to manage the lifecycle and animations of a window component.
 *
 * Handles window opening, maximizing, minimizing, restoring, and closing with GSAP animations,
 * updates window state, and manages focus/unfocus events.
 *
 * @param {Object} params - Parameters for the window lifecycle.
 * @param {React.RefObject} params.windowRef - Ref to the window DOM element.
 * @param {React.RefObject} params.headerRef - Ref to the window header DOM element.
 * @param {React.RefObject} params.desktopRef - Ref to the desktop/container DOM element.
 * @param {Object} params.windowParams - State and configuration for the window.
 * @param {Function} params.onFocus - Callback when the window is focused.
 * @param {Function} params.onUnfocus - Callback when the window is unfocused.
 * @param {Function} params.onClose - Callback when the window is closed.
 * @param {Function} params.updateWindowState - Function to update the window state.
 * @param {Object} params.animations - Animation functions for window actions.
 * @param {Function} params.animations.openWindow - Function to animate opening the window.
 * @param {Function} params.animations.maximizeWindow - Function to animate maximizing the window.
 * @param {Function} params.animations.restoreWindow - Function to animate restoring the window.
 * @param {Function} params.animations.minimizeWindow - Function to animate minimizing the window.
 * @param {Function} params.animations.closeWindow - Function to animate closing the window.
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
    filesData
  } = windowParams;

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
      filesData
    });

    createWindowDraggable(
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
