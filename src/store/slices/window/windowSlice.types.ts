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

export interface Position {
  lastX?: number;
  lastY?: number;
  x?: number;
  y?: number;
}

export interface Size {
  lastWidth?: number;
  lastHeight?: number;
  width?: number;
  height?: number;
}

export interface Title {
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
  title?: Title;
  icon?: string;
  zIndex?: number;
  type?: string;
  content?: any;
  src?: string;
  children?: FileNode[];
  position?: Position;
  size?: Size;
  windowState?: WindowState;
  isUnique?: boolean;
  isRequestingFullScreen?: boolean;
  initialDimensions?: Size;
}

//Estado do slice

export interface WindowSliceState {
  openedWindowList: WindowNode[];
  focusedWindow: string | null;
  history: Title[];
}
