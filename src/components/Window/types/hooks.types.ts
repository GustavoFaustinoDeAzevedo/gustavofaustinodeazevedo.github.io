import { RefObject } from 'react';
import windowAnimations from '../utils/windowAnimations';
import { WindowData } from '@/store/actions/useWindowActions';

type NumOrStr = number | string;

export interface WindowParams {
  /* identidade / ordem */
  windowId: string;
  windowIndex: number;

  /* posição / dimensões correntes */
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  width: NumOrStr;
  height: NumOrStr;
  lastWidth: NumOrStr;
  lastHeight: NumOrStr;
  initialDimensions?: {
    width: string;
    height: string;
  };

  /* estados */
  isOpened: boolean;
  isFocused: boolean;
  isMinimized: boolean;
  isMaximized: boolean;

  /* flags de requisição */
  isRequestingOpen: boolean;
  isRequestingRestore: boolean;
  isRequestingMaximize: boolean;
  isRequestingMinimize: boolean;
  isRequestingClose: boolean;
  isRequestingFocus: boolean;

  /* estados do redux */
  opened: boolean;
  focused: boolean;
  minimized: boolean;
  maximized: boolean;
  requestingOpen: boolean;
  requestingRestore: boolean;
  requestingMaximize: boolean;
  requestingMinimize: boolean;
  requestingClose: boolean;
  requestingFocus: boolean;
}

export interface WindowHandlers {
  updateWindowState: (params: WindowData) => void;
  handleFocus: () => void;
  handleResetFocus: () => void;
  handleClose: () => void;
  handleRestore: () => void;
  handleMaximize: () => void;
  handleMinimize: () => void;
  handleRequestFocus: () => void;
  handleRequestClose: () => void;
  handleRequestRestore: () => void;
  handleRequestMaximize: () => void;
  handleRequestMinimize: () => void;
}

export interface CreateWindowDraggableOptions {
  windowRef: RefObject<HTMLElement | null>;
  triggerElement: HTMLElement | null;
  bounds: HTMLElement | null;
  onFocus: (id: string) => void;
  updateWindowState: (params: Record<string, any>) => void;
  width: NumOrStr;
  height: NumOrStr;
  isFocused: boolean;
}

export interface UseWindowLifecycleProps {
  windowRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLElement | null>;
  desktopRef: RefObject<HTMLElement | null>;
  windowParams: WindowParams;
  windowHandlers: WindowHandlers;
  isMobile: boolean;
  updateWindowState: (updates: Partial<WindowParams>) => void;
  animations: typeof windowAnimations;
  getWindowInfo: () => { savedWidth?: number; savedHeight?: number };
}
