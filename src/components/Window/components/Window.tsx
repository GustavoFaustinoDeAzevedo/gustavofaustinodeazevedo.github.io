import React, {
  useRef,
  useMemo,
  useCallback,
  useEffect,
  use,
  useState,
} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { ErrorBoundary } from 'react-error-boundary';

import WindowHeader from './windowHeader';
import WindowContentWrapper from './WindowContentWrapper';
import useClickOutside from '@/shared/hooks/useClickOutside';
import createWindowDraggable from '../utils/createWindowDraggable';
import useRefs from '@/contexts/useRefs';
import useWindowLifecycle from '../hooks/useWindowLifecycle';
import { useIsMobile } from '@/shared/hooks';
import { UseWindowLifecycleProps } from '../types/hooks.types';

gsap.registerPlugin(useGSAP);

type WindowProps = {
  // className?: string;
  windowParams: any;
  windowHandlers: any;
  desktopRef: React.RefObject<HTMLDivElement | null>;
  filesActions: any;
  isMobile: boolean;
};

const Window = ({
  // className,
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
    title,
    icon,
    children,
    isFocused,
    isMinimized,
    isMaximized,
    language,
    type,
    src,
    windowRef,
    headerRef,
  } = windowParams;
  const {
    updateWindowState,
    handleClose,
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
    children,
    filesActions,
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
    createWindowDraggable,
  } as UseWindowLifecycleProps);

  //hook para lidar com o foco ao clicar fora da janela ========================

  useClickOutside({
    mainRef: windowRef,
    onClickOutside: handleResetFocus,
    isActive: windowParams.isFocused,
  });

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
        onClick={isFocused ? null : handleRequestFocus}
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
