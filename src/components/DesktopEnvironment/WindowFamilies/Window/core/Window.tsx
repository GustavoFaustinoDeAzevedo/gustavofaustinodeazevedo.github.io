import React, { useCallback, useMemo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { ErrorBoundary } from 'react-error-boundary';

import WindowHeader from './WindowHeader';
import WindowContentWrapper from './WindowContentWrapper';
import useClickOutside from '@/shared/hooks/useClickOutside';
import useWindowLifecycle from '../hooks/useWindowLifecycle';
import { UseWindowLifecycleProps } from '../types/hooks.types';
import ErrorFallback from '@/components/DesktopEnvironment/NativeApplications/ErrorFallback/ErrorFallback';

gsap.registerPlugin(useGSAP);

type WindowHandlers = {
  updateWindowState: (updates: any) => void;
  handleClose: () => void;
  handleFocus: () => void;
  handleRequestClose?: () => void;
  handleRequestMinimize?: () => void;
  handleRequestMaximize?: () => void;
  handleRequestRestore?: () => void;
  handleResetFocus?: () => void;
  handleRequestFocus?: () => void;
};

type WindowProps = {
  windowParams: any;
  windowHandlers: WindowHandlers;
  bounds: React.RefObject<HTMLDivElement | null>;
  filesActions: any;
  isMobile: boolean;
};
const Window = ({
  windowParams,
  windowHandlers,
  bounds,
  filesActions,
  isMobile,
}: WindowProps) => {
  const handleMouseDown = () => {
    !isFocused ? handleFocus() : null;
  };
  //props vindos do pai =====================================================================

  const {
    windowId,
    currentNode,
    zIndex,
    isOpened,
    helpContent,
    title,
    icon,
    content,
    contentKey,
    isMinimized,
    isMaximized,
    language,
    type,
    src,
    isFocused,
    windowRef,
    headerRef,
    permission,
    owner,
    windowIndex,
    isRequestingOpen,
  } = windowParams;
  const {
    handleFocus,
    updateWindowState,
    handleRequestClose,
    handleRequestMinimize,
    handleRequestMaximize,
    handleRequestRestore,
    handleResetFocus,
    handleRequestFocus,
  } = windowHandlers;

  //encapsulamento de props ====================================================

  const windowHeaderProps = {
    headerRef,
    handleRequestMinimize,
    handleRequestMaximize,
    handleRequestRestore,
    handleRequestClose,
    handleRequestFocus,
    helpContent,
    windowId,
    title,
    icon,
    isOpened,
    isFocused,
    isMinimized,
    isMaximized,
    language,
    isMobile,
  };

  const windowContentWrapperProps = {
    isFocused,
    isOpened,
    windowId,
    currentNode,
    src,
    windowHandlers,
    content,
    contentKey,
    filesActions,
    permission,
    owner,
    type,
    language,
  };

  //Função para obter dimensões da janela ======================================

  const getWindowInfo = useCallback(() => {
    const rect = windowRef.current?.getBoundingClientRect();
    return {
      savedWidth: rect?.width,
      savedHeight: rect?.height,
    };
  }, [windowRef]);

  //Gerenciamento do ciclo de vida da janela ===================================

  useWindowLifecycle({
    windowRef,
    headerRef,
    bounds,
    windowParams,
    windowHandlers,
    updateWindowState,
    isMobile,
    getWindowInfo,
  } as UseWindowLifecycleProps);

  //hook para lidar com o foco ao clicar fora da janela ========================

  useClickOutside({
    mainRef: windowRef,
    onClickOutside: handleResetFocus as (e: MouseEvent | TouchEvent) => void,
    isActive: isFocused,
    ignoredSelectors: [`.${windowId.replace(/[.#]/g, '')}-taskbar-task`],
    ignoredDataAttributes: ['data-dropdown-menu'],
  });

  //JSX ========================================================================

  return (
    <div
      ref={windowRef}
      className={`window ${isFocused ? 'focus' : ''}  ${
        isMaximized ? 'maximized' : ''
      } parent`}
      style={{ zIndex }}
      // onContextMenu={handleContextMenu}
      id={windowId}
      onMouseDown={handleMouseDown}
    >
      <WindowHeader {...windowHeaderProps} />
      <ErrorBoundary
        FallbackComponent={(fallbackProps) => (
          <ErrorFallback
            {...fallbackProps}
            handleClose={() =>
              updateWindowState({
                isRequestingClose: true,
              })
            }
            queueRef={headerRef}
          />
        )}
      >
        <WindowContentWrapper {...(windowContentWrapperProps as any)} />
      </ErrorBoundary>
    </div>
  );
};

export default React.memo(Window);
