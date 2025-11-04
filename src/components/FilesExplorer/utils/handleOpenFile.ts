import actions from '@/store/actions';
import { FileNode } from '@/store/slices/file';
import { Size } from '@/store/slices/window';

interface FileProps {
  fileId: string;
  initialDimensions?: Size;
  currentNode: string;
  windowTitle: { eng: string; por: string };
  windowIcon?: string;
  src: string;
  initialStates?: any;
  openMode?: string;
  fileType: string;
  nodeType: string;
  handleNewFile: any;
  windowActions: any;
  handleWindowUpdate: any;
  nodeDepth: number;
  children?: FileNode[];
  isUnique?: boolean;
  handleOpenWindow: any;
  handleUpdateWindow: any;
  handleFocusWindow: any;
}

export const handleOpenFile = ({
  fileId,
  initialDimensions,
  currentNode,
  windowTitle,
  windowIcon,
  src,
  isUnique,
  initialStates,
  openMode,
  children,
  fileType,
  nodeType,
  nodeDepth,
  handleUpdateWindow,
  handleOpenWindow,
}: FileProps) => {

  try {
    if (fileId === undefined || fileId === null) {
      throw new Error(`Invalid file ID: ${fileId}`);
    }

    if (openMode === 'window' || fileType === 'app') {
      //Abrir uma nova janela
      handleOpenWindow({
        windowId: fileId,
        title: windowTitle,
        icon: windowIcon,
        src,
        children,
        isUnique,
        isRequestingMaximize: initialStates?.maximized,
        type: fileType,
        initialDimensions,
        nodeDepth,
      });
    } else if (openMode === 'tab') {
      //file will open on a new tab
    } else {
      handleUpdateWindow({
        currentNode: fileId,
        title: windowTitle,
        icon: windowIcon,
        src,
        children,
        isUnique,
        type: fileType,
        nodeDepth,
      });
    }
  } catch (error) {
    console.error('Error opening window:', error);
  }
};

export default handleOpenFile;
