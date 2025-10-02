import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import WindowHeader from './windowHeader';
import WindowContentWrapper from './WindowContentWrapper';
import useClickOutside from '@/hooks/useClickOutside';
import createWindowDraggable from '../utils/createWindowDraggable';
import useRefs from '@/contexts/useRefs';
import useWindowLifecycle from '../hooks/useWindowLifecycle';
import { useIsMobile } from '@/hooks';

gsap.registerPlugin(useGSAP);

const Window = ({
  // className,
  windowParams,
  windowHandlers,
  desktopRef,
  filesActions,
  isMobile,
}) => {
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
  });

  //hook para lidar com o foco ao clicar fora da janela ========================

  useClickOutside({
    mainRef: windowRef,
    onClickOutside: handleResetFocus,
    isActive: windowParams.isFocused,
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
      onClick={isFocused ? null : handleRequestFocus}
    >
      <WindowHeader {...windowHeaderProps} />
      <WindowContentWrapper {...windowContentWrapperProps} />
    </div>
  );
};

export default React.memo(Window);
