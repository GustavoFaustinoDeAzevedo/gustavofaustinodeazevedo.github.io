import gsap from 'gsap';
import getRandomPosition from '../utils/getRandomPosition';
import useAnimationSafe from '../hooks/useAnimationSafe';
import windowAnimations from '../utils/windowAnimations';
import createWindowDraggable from '../utils/createWindowDraggable';
import { UseWindowLifecycleProps } from '../types/hooks.types';
import { useEffect, useState } from 'react';

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
}: UseWindowLifecycleProps): void => {
  const {
    windowId,
    windowIndex,
    contentKey,
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

  /* ──────────── Criação do draggable ────────────── */

  useEffect(() => {
    if (isMobile) return;
    createWindowDraggable({
      windowRef: windowRef as React.RefObject<HTMLElement>,
      triggerElement: headerRef.current as HTMLElement,
      desktopRef: desktopRef as React.RefObject<HTMLElement>,
      updateWindowState: updateWindowState as <T>(state: T) => void,
      width: width as number,
      height: height as number,
    });
  }, [isMobile, headerRef, windowRef]);

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
      if (!element) return;

      const { width: initW, height: initH } = (initialDimensions as {
        width: string;
        height: string;
      }) || {
        width: '1000px',
        height: '600px',
      };
      gsap.set(element, {
        x: isMobile ? '0rem' : randomX,
        y: isMobile ? 'var(--taskbar-height)' : randomY,
        width: initW,
        height: initH,
        scale: isMobile ? 1 : 0.8,
        transformOrigin: isMobile ? 'top' : 'center',
      });

      windowAnimations.openWindow(windowRef, () => {}, isMobile);
      updateWindowState({
        x: randomX,
        y: randomY,
        lastX: randomX,
        lastY: randomY,
        width: initW,
        height: initH,
        lastWidth: initW,
        lastHeight: initH,
        isRequestingOpen: false,
        isRequestingFocus: true,
        contentKey,
        isRequestingMaximize: isRequestingMaximize || isMobile,
        isOpened: true,
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
          isMaximized: true,
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
            isMinimized: true,
          });
          handleResetFocus();
        },
        windowIndex + 1,
        null,
        isMobile,
      );
    },
  });

  /* ─────────── Restaurar ─────────── */
  useAnimationSafe({
    ref: windowRef,
    trigger: isRequestingRestore,
    animation: () =>
      windowAnimations.restoreWindow(
        windowRef,
        () => {
          updateWindowState({
            isMaximized: isMinimized && isMaximized,
            isMinimized: false,
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
        lastHeight,
        isMobile,
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

  /* ─────────── Quando houver predefinição ──────────── */
  useEffect(() => {
    if (!windowRef?.current || !isOpened) return;
    if (isMinimized) {
      gsap.set(windowRef.current, {
        x: x,
        y: '100vh',
        minWidth: isMobile ? width : '150px',
        minHeight: '150px',
        scale: 0,
        opacity: 0,
        height: isMobile ? height : 0,
        ease: isMobile ? 'power2.in' : 'expo.inOut',
      });
      return;
    }

    gsap.set(windowRef.current, {
      width: width,
      height: height,
      x: x,
      y: y,
      display: 'flex',
    });
  }, []);
};

export default useWindowLifecycle;
