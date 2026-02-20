//Tipos principais

import { WindowData } from '@/store/actions/useWindowActions';
import { FileNode } from '../file';

export type WindowRequestType =
  | 'open'
  | 'focus'
  | 'restore'
  | 'close'
  | 'maximize'
  | 'minimize';

export type WindowState = {
  status: {
    opened: boolean;
    maximized: boolean;
    minimized: boolean;
    focused: boolean;
  };
  requests: Partial<Record<WindowRequestType, boolean>>;
};

export interface WindowPosition {
  lastX?: number;
  lastY?: number;
  x?: number;
  y?: number;
}

export interface WindowSize {
  lastWidth?: number;
  lastHeight?: number;
  width?: number;
  height?: number;
}

export interface WindowTitle {
  por: string;
  eng: string;
  icon?: string | any;
  reopenProps?: WindowData;
  [key: string]: any;
}

export interface WindowNode {
  windowId?: string;
  currentNode?: string;
  nodeDepth?: number;
  title?: WindowTitle;
  icon?: string;
  zIndex?: number;
  type?: string;
  contentKey?: string;
  src?: string;
  content?: FileNode[];
  position?: WindowPosition;
  size?: WindowSize;
  windowState?: WindowState;
  isUnique?: boolean;
  isFocused?: boolean;
  isMaximized?: boolean;
  isMinimized?: boolean;
  isOpened?: boolean;
  unique?: boolean;
  focused?: boolean;
  maximized?: boolean;
  minimized?: boolean;
  opened?: boolean;
  open?: boolean;
  close?: boolean;
  focus?: boolean;
  restore?: boolean;
  maximize?: boolean;
  minimize?: boolean;
  isRequestingClose?: boolean;
  isRequestingFocus?: boolean;
  isRequestingOpen?: boolean;
  isRequestingFullScreen?: boolean;
  isRequestingMaximize?: boolean;
  isRequestingMinimize?: boolean;
  isRequestingRestore?: boolean;
  initialDimensions?: WindowSize;
  helpContent?: string | null;
  windowType?: 'window' | 'modal' | 'dialog' | 'tool' | 'notification';
}

export interface WindowSliceState {
  activeWindowParams: WindowNode;
  openedWindows: Record<string, WindowNode>;
  openedWindowList: WindowNode[];
  focusedWindow: string | null;
  history: WindowTitle[];
}
