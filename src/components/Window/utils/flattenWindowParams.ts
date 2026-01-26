import { WindowNode } from '@/store/slices/window';

type WindowContext = {
  windowIndex: number;
  language: string;
  headerRef: React.RefObject<HTMLElement | null>;
  windowRef: React.RefObject<HTMLElement | null>;
};

const flattenWindowParams = (
  { windowIndex, language, headerRef, windowRef }: WindowContext,
  { windowId, size, position, windowState, ...restParams }: WindowNode,
) => {
  return {
    ...restParams,
    headerRef,
    windowRef,
    windowId,
    windowIndex,
    language,
    x: position?.x,
    y: position?.y,
    width: size?.width,
    height: size?.height,
    lastX: position?.lastX,
    lastY: position?.lastY,
    lastWidth: size?.lastWidth,
    lastHeight: size?.lastHeight,
    isOpened: windowState?.status.opened,
    isFocused: windowState?.status.focused,
    isMinimized: windowState?.status.minimized,
    isMaximized: windowState?.status.maximized,
    isRequestingOpen: windowState?.requests.open,
    isRequestingClose: windowState?.requests.close,
    isRequestingRestore: windowState?.requests.restore,
    isRequestingMaximize: windowState?.requests.maximize,
    isRequestingMinimize: windowState?.requests.minimize,
    isRequestingFocus: windowState?.requests.focus,
  };
};

export default flattenWindowParams;
