import useFilesActions from '@/store/actions/useFilesActions';
import useSettingsActions from '@/store/actions/useSettingsActions';
import useWindowActions, {
  WindowDataBase,
} from '@/store/actions/useWindowActions';
import { WindowState } from '@/store/slices/window';

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
  isMobile: boolean;
  desktopRef: React.RefObject<HTMLDivElement | null>;
  windowList: WindowParams[];
  focusedWindow: string | null;
  language: string;
  windowActions: ReturnType<typeof useWindowActions>;
  settingsActions: ReturnType<typeof useSettingsActions>;
  filesActions: ReturnType<typeof useFilesActions>;
};
