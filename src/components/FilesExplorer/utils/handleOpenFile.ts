import actions from '@/store/actions';
import { FileNode } from '@/store/slices/file';
import { Size } from '@/store/slices/window';

interface FileProps {
  fileId: string;
  initialDimensions?: Size;
  currentNode: string;
  windowTitle: { eng: string; por: string };
  windowIcon?: string;
  src?: string;
  initialStates?: {
    maximized?: boolean;
    minimized?: boolean;
  };
  openMode?: string;
  type: string;
  nodeType: string;
  nodeDepth: number;
  children?: FileNode[];
  isUnique?: boolean;
  handleOpenWindow: any;
  handleUpdateWindow: any;
}

export const handleOpenFile = ({
  fileId,
  initialDimensions,
  currentNode,
  windowTitle,
  windowIcon,
  src,
  isUnique = false,
  initialStates,
  openMode,
  children,
  type,
  nodeType,
  nodeDepth,
  handleUpdateWindow,
  handleOpenWindow,
}: FileProps) => {
  try {
    if (fileId === undefined || fileId === null) {
      throw new Error(`Invalid file ID: ${fileId}`);
    }

    if (openMode === 'window' || type === 'app') {
      //Abrir uma nova janela
      handleOpenWindow({
        windowId: fileId,
        title: windowTitle,
        icon: windowIcon,
        src,
        children,
        isUnique,
        isRequestingMaximize: initialStates?.maximized,
        type,
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
        type,
        nodeDepth,
      });
    }
  } catch (error) {
    console.error('Error opening window:', error);
  }
};

export default handleOpenFile;
