import { placeholder } from '@/data/filesData';
import { Language } from '@/store/slices/settings';

interface FileProps {
  fileId: string;
  initialDimensions?: { width: string; height: string };
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
  language: Language;
  children?: string[];
  isUnique?: boolean;
}

export const handleOpenFile = ({
  fileId,
  initialDimensions,
  currentNode,
  windowTitle,
  language,
  windowIcon,
  src,
  isUnique,
  initialStates,
  openMode,
  children,
  handleNewFile,
  windowActions,
  fileType,
  nodeType,
  handleWindowUpdate,
  nodeDepth,
}: FileProps) => {
  if (
    windowTitle?.[language as keyof typeof windowTitle] ===
      'Adicionar Arquivo' ||
    windowTitle?.[language as keyof typeof windowTitle] === 'New File'
  ) {
    handleNewFile(placeholder, currentNode, nodeDepth);
    nodeType === 'folder'
      ? handleWindowUpdate({ children: placeholder })
      : null;
  } else {
    try {
      if (fileId === undefined || fileId === null) {
        throw new Error(`Invalid file ID: ${fileId}`);
      }

      if (openMode === 'window' || fileType === 'app') {
        //Abrir uma nova janela
        windowActions.handleOpenWindow(
          JSON.stringify({
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
          })
        );
      } else if (openMode === 'tab') {
        //file will open on a new tab
      } else {
        windowActions.handleUpdateWindow({
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
  }
};

export default handleOpenFile;
