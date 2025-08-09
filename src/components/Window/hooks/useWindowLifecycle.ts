import gsap from 'gsap';
import getRandomPosition from '../utils/getRandomPosition';
import useAnimationSafe from '../hooks/useAnimationSafe';
import windowAnimations from '../utils/windowAnimations';
import { UseWindowLifecycleProps } from '../types/hooks';

/**
 * @file useWindowLifecycle.ts
 * @module useWindowLifecycle
 * @description
 *   Hook responsible for the lifecycle and animations of windows.
 */

const useWindowLifecycle = ({
  windowRef,
  headerRef,
  desktopRef,
  windowParams,
  windowActions,
  updateWindowState,
  getWindowInfo,
  createWindowDraggable,
}: UseWindowLifecycleProps): void => {
  const {
    windowId,
    windowIndex,
    x,
    y,
    lastX,
    lastY,
    width,
    height,
    lastWidth,
    lastHeight,
    isFocused,
    isMinimized,
    isMaximized,
    isRequestingOpen,
    isRequestingRestore,
    isRequestingMaximize,
    isRequestingMinimize,
    isRequestingClose,
    initialDimensions,
    isOpen,
  } = windowParams;

  const { handleFocusWindow, handleResetFocus, handleCloseWindow } =
    windowActions;

  /* ─────────── Abertura ─────────── */
  useAnimationSafe({
    ref: windowRef,
    trigger: isRequestingOpen,
    dependencies: [headerRef.current],
    animation: (element) => {
      const { randomX, randomY } = getRandomPosition();
      gsap.set(element, { x: randomX, y: randomY });

      const { width: initW, height: initH } = (initialDimensions as {
        width: string;
        height: string;
      }) || {
        width: '1000px',
        height: '600px',
      };

      windowAnimations.openWindow(windowRef, initW, initH);

      updateWindowState({
        x: randomX,
        y: randomY,
        lastX: randomX,
        lastY: randomY,
        width: initW,
        height: initH,
        lastWidth: initW,
        lastHeight: initH,
        requestingOpen: false,
        open: true,
      });

      /* torna arrastável */
      createWindowDraggable({
        windowRef,
        triggerElement: headerRef.current,
        bounds: desktopRef.current,
        onFocus: handleFocusWindow,
        onUpdateWindow: (params) => updateWindowState(params),
        width,
        height,
        isFocused,
      });
    },
  });

  /* ─────────── Maximizar ─────────── */
  useAnimationSafe({
    ref: windowRef,
    trigger: isRequestingMaximize && !isRequestingRestore,
    animation: () => {
      const { savedWidth = width, savedHeight = height } = getWindowInfo();
      return windowAnimations.maximizeWindow(windowRef, () => {
        updateWindowState({
          x: 0,
          y: 0,
          lastX: x,
          lastY: y,
          width: '100%',
          height: '100%',
          lastWidth: savedWidth,
          lastHeight: savedHeight,
          requestingMaximize: false,
          maximized: true,
        });
        !isFocused && handleFocusWindow(windowId);
      });
    },
  });

  /* ─────────── Minimizar ─────────── */
  useAnimationSafe({
    ref: windowRef,
    trigger: isRequestingMinimize && !isRequestingRestore,
    animation: () => {
      const { savedWidth = width, savedHeight = height } = getWindowInfo();
      return windowAnimations.minimizeWindow(
        windowRef,
        () => {
          updateWindowState({
            x: lastX,
            y: lastY,
            lastX: x,
            lastY: y,
            width: lastWidth,
            height: lastHeight,
            lastWidth: savedWidth,
            lastHeight: savedHeight,
            requestingMinimize: false,
            minimized: true,
          });
          handleResetFocus();
        },
        windowIndex * 55
      );
    },
  });

  /* ─────────── Restaurar ─────────── */
  useAnimationSafe({
    ref: windowRef,
    trigger: isRequestingRestore && (isMaximized || isMinimized),
    animation: () =>
      windowAnimations.restoreWindow(
        windowRef,
        () => {
          updateWindowState({
            maximized: isMinimized && isMaximized,
            minimized: false,
            requestingRestore: false,
            x: lastX,
            y: lastY,
            lastX: x,
            lastY: y,
            width: lastWidth,
            height: lastHeight,
            lastWidth: width,
            lastHeight: height,
          });
          !isFocused && handleFocusWindow(windowId);
        },
        lastX,
        lastY,
        lastWidth,
        lastHeight
      ),
  });

  /* ─────────── Fechar ───────────── */
  useAnimationSafe({
    ref: windowRef,
    trigger: isRequestingClose && isOpen,
    animation: () =>
      windowAnimations.closeWindow(windowRef, () => {
        handleCloseWindow({ windowId, requestingClose: true });
        handleResetFocus();
      }),
  });
};

export default useWindowLifecycle;
