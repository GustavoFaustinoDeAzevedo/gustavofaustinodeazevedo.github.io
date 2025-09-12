import gsap from 'gsap';
import getRandomPosition from '../utils/getRandomPosition';
import useAnimationSafe from '../hooks/useAnimationSafe';
import windowAnimations from '../utils/windowAnimations';
import { UseWindowLifecycleProps } from '../types/hooks.types';
import { useEffect } from 'react';

/**
 * @file useWindowLifecycle.ts
 * @module useWindowLifecycle
 * @description
 *   Hook responsável pelo ciclo de vida e animações das janelas.
 */

const useWindowLifecycle = ({
  windowRef,
  headerRef,
  desktopRef,
  windowParams,
  windowHandlers,
  isMobile,
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
    isRequestingFocus,
    initialDimensions,
    isOpened,
  } = windowParams;

  const { updateWindowState, handleFocus, handleResetFocus, handleClose } =
    windowHandlers;

  /* ──────────── Foco ────────────── */
  useEffect(() => {
    if (isRequestingFocus) {
      handleFocus();
    }
  }, [isRequestingFocus]);
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
        x: isMobile ? '0px' : randomX,
        y: isMobile ? '0px' : randomY,
        lastX: isMobile ? '0px' : randomX,
        lastY: isMobile ? '0px' : randomY,
        width: isMobile ? '100%' : initW,
        height: isMobile ? '100%' : initH,
        lastWidth: isMobile ? '100%' : initW,
        lastHeight: isMobile ? '100%' : initH,
        isRequestingOpen: false,
        isRequestingFocus: true,
        isRequestingMaximize: isMobile,
        opened: true,
      });

      /* torna arrastável */
      !isMobile &&
        createWindowDraggable({
          windowRef,
          triggerElement: headerRef.current,
          bounds: desktopRef.current,
          onFocus: () => handleFocus(),
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
          isRequestingMaximize: false,
          isRequestingFocus: true,
          maximized: true,
        });
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
            isRequestingMinimize: false,
            isRequestingFocus: false,
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
            isRequestingRestore: false,
            isRequestingFocus: true,
            x: lastX,
            y: lastY,
            lastX: x,
            lastY: y,
            width: lastWidth,
            height: lastHeight,
            lastWidth: width,
            lastHeight: height,
          });
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
    trigger: isRequestingClose && isOpened,
    animation: () =>
      windowAnimations.closeWindow(windowRef, () => {
        handleClose();
        handleResetFocus();
      }),
  });
};

export default useWindowLifecycle;
