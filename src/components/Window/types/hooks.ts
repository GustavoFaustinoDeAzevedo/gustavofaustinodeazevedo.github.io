import { RefObject } from 'react';
import windowAnimations from '../utils/windowAnimations';

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
  isOpen: boolean;
  isFocused: boolean;
  isMinimized: boolean;
  isMaximized: boolean;

  /* flags de requisição */
  isRequestingOpen: boolean;
  isRequestingRestore: boolean;
  isRequestingMaximize: boolean;
  isRequestingMinimize: boolean;
  isRequestingClose: boolean;

  /* estados do redux */
  open: boolean;
  focused: boolean;
  minimized: boolean;
  maximized: boolean;
  requestingOpen: boolean;
  requestingRestore: boolean;
  requestingMaximize: boolean;
  requestingMinimize: boolean;
  requestingClose: boolean;
}

export interface WindowActions {
  handleFocusWindow: (id: string) => void;
  handleResetFocus: () => void;
  handleCloseWindow: (payload: {
    windowId: string;
    requestingClose: boolean;
  }) => void;
}

export interface CreateWindowDraggableOptions {
  windowRef: RefObject<HTMLElement>;
  triggerElement: HTMLElement | null;
  bounds: HTMLElement | null;
  onFocus: (id: string) => void;
  onUpdateWindow: (params: {
    x: number;
    y: number;
    width: NumOrStr;
    height: NumOrStr;
  }) => void;
  width: NumOrStr;
  height: NumOrStr;
  isFocused: boolean;
}

export interface UseWindowLifecycleProps {
  windowRef: RefObject<HTMLElement>;
  headerRef: RefObject<HTMLElement>;
  desktopRef: RefObject<HTMLElement>;
  windowParams: WindowParams;
  windowActions: WindowActions;

  updateWindowState: (updates: Partial<WindowParams>) => void;
  animations: typeof windowAnimations;
  getWindowInfo: () => { savedWidth?: number; savedHeight?: number };
  createWindowDraggable: (options: CreateWindowDraggableOptions) => void;
}
