import { FileNode } from '@/store/slices/file';

export interface HandleOpenFileProps {
  fileId: string;
  initialDimensions?: { width: string | '1000px'; height: string | '600px' };
  currentNode: string;
  windowTitle: { eng: string; por: string };
  windowIcon?: string;
  src?: string;
  initialStates?: {
    maximized?: boolean;
    minimized?: boolean;
  };
  openMode?: string;
  type?: string;
  nodeType: string;
  nodeDepth?: number;
  content?: FileNode[];
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
  content,
  type,
  nodeType,
  nodeDepth,
  handleUpdateWindow,
  handleOpenWindow,
}: HandleOpenFileProps) => {
  try {
    if (fileId === undefined || fileId === null) {
      throw new Error(`Invalid file ID: ${fileId}`);
    }

    if (openMode === 'window' || type === 'app') {
      handleOpenWindow({
        windowId: fileId,
        title: windowTitle,
        icon: windowIcon,
        src,
        content,
        isUnique,
        isRequestingMaximize: initialStates?.maximized,
        type,
        initialDimensions,
        nodeDepth,
      });
    } else if (openMode === 'tab') {
      // TODO: implementar opção de abertura de tabs
    } else {
      handleUpdateWindow({
        currentNode: fileId,
        title: windowTitle,
        icon: windowIcon,
        src,
        content,
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
