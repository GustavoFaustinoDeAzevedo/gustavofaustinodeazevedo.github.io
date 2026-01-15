import React, { useCallback, useMemo, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { ErrorBoundary } from 'react-error-boundary';

import WindowHeader from './WindowHeader';
import WindowContentWrapper from './WindowContentWrapper';
import useClickOutside from '@/shared/hooks/useClickOutside';
import useWindowLifecycle from '../hooks/useWindowLifecycle';
import { UseWindowLifecycleProps } from '../types/hooks.types';
import { re } from 'mathjs';

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
  desktopRef: React.RefObject<HTMLDivElement | null>;
  filesActions: any;
  isMobile: boolean;
};
const Window = ({
  windowParams,
  windowHandlers,
  desktopRef,
  filesActions,
  isMobile,
}: WindowProps) => {
  const [errorOcurred, setErrorOcurred] = useState(false);
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
    isMinimized,
    isMaximized,
    language,
    type,
    src,
    isFocused,
    windowRef,
    headerRef,
  } = windowParams;
  const {
    updateWindowState,
    handleRequestClose,
    handleRequestMinimize,
    handleRequestMaximize,
    handleRequestRestore,
    handleResetFocus,
    handleRequestFocus,
  } = windowHandlers;

  //encapsulamento de props ====================================================

  const windowHeaderProps = useMemo(() => {
    return {
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
  }, [
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
  ]);

  const windowContentWrapperProps = useMemo(() => {
    return {
      isFocused: isFocused,
      isOpened,
      windowId,
      currentNode,
      src,
      windowHandlers,
      content,
      filesActions,
      type,
      language,
    };
  }, [
    isFocused,
    isOpened,
    windowId,
    currentNode,
    src,
    windowHandlers,
    content,
    filesActions,
    type,
    language,
  ]);

  //Função para obter dimensões da janela ======================================

  const getWindowInfo = useCallback(() => {
    const rect = windowRef.current?.getBoundingClientRect();
    return {
      savedWidth: rect?.width,
      savedHeight: rect?.height,
    };
  }, [windowRef]);

  //Função para verificar erros no conteúdo da janela=========================

  const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
    console.log(error.message);
    setErrorOcurred(true);
    return null;
  };

  //Gerenciamento do ciclo de vida da janela ===================================

  useWindowLifecycle({
    windowRef,
    headerRef,
    desktopRef,
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

  //handler para lidar com o focus da janela ===================================

  const handleFocus = useCallback(() => {
    if (isFocused) return null;
    if (handleRequestFocus) handleRequestFocus();
  }, [isFocused, handleRequestFocus]);

  //JSX ========================================================================

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        ref={windowRef}
        className={`window ${isFocused ? 'focus' : ''}  ${
          isMaximized ? 'maximized' : ''
        } parent`}
        style={{ zIndex }}
        // onContextMenu={handleContextMenu}
        id={windowId}
        onClick={handleFocus}
      >
        <WindowHeader {...windowHeaderProps} />
        {!errorOcurred && (
          <WindowContentWrapper {...(windowContentWrapperProps as any)} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(Window);
