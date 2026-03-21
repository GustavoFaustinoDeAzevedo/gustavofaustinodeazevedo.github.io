import { RootState } from '@/store';
import { FileNode, Permission } from '@/store/slices/file';
import { WindowTitle } from '@/store/slices/window';
import User from '@/store/utils/db.types';
import { useSelector } from 'react-redux';

export interface HandleOpenFileProps {
  fileId: string;
  contentKey?: string;
  permission?: Permission;
  userRoles?: string[];
  owner?: string;
  initialDimensions?: { width: string | '1000px'; height: string | '600px' };
  currentNode: string;
  windowTitle?: WindowTitle | string;
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
  contentKey = fileId,
  initialDimensions,
  permission,
  owner,
  userRoles,
  currentNode,
  windowTitle = { eng: 'Untitled', por: 'Sem Título' },
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
    const hasRole = permission?.every((item) => userRoles?.includes(item));
    if (!hasRole && permission !== undefined) {
      alert(
        '------------------------------------------\n(Temporary alert for testing purposes)\n------------------------------------------\nUser does not have permission to open this file.',
      );
      throw new Error('User does not have permission to open this file.');
    }

    if (fileId === undefined || fileId === null) {
      throw new Error(`Invalid file ID: ${fileId}`);
    }

    if (openMode === 'window' || type === 'app') {
      handleOpenWindow({
        windowId: fileId,
        title: windowTitle,
        icon: windowIcon,
        permission,
        owner,
        src,
        content,
        contentKey,
        isUnique,
        isRequestingMaximize: initialStates?.maximized,
        type,
        initialDimensions,
        nodeDepth,
      });
    } else if (openMode === 'tab') {
      // TODO: implementar opção de abertura de tabs
    } else {
      // handleUpdateWindow({
      //   currentNode: fileId,
      //   title: windowTitle,
      //   icon: windowIcon,
      //   permission,
      //   owner,
      //   src,
      //   content,
      //   isUnique,
      //   type,
      //   nodeDepth,
      // });
    }
  } catch (error) {
    throw new Error(`Error opening window: ${error}`);
  }
};

export default handleOpenFile;
