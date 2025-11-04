import { WindowNode, WindowState } from '@/store/slices/window';

type Size = {
  width: number;
  height: number;
  lastWidth: number;
  lastHeight: number;
};
type Position = { x: number; y: number; lastX: number; lastY: number };

export type WindowParams = {
  windowId: string;
  size: Size;
  position: Position;
  windowState: WindowState;
  [key: string]: any;
};

export type CreateWindowListProps = {
  desktopRef: React.RefObject<HTMLDivElement | null>;
  language: string;
};
