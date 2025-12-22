import { Size } from '../window';

type SortType = 'asc' | 'desc'; // provisório

// Estrutura básica de um arquivo/nó na árvore
export interface FileNode {
  windowId?: string;
  fileId: string;
  title: {
    eng: string;
    por: string;
  };
  nodeDepth?: number;
  type?: 'folder' | 'app' | 'text' | 'file';
  icon?: string;
  isUnique?: boolean;
  windowMask?: {
    src: string;
    title: { eng: string; por: string };
    icon: string;
  };
  children?: FileNode[];
  initialDimensions?: { width: string | '1000px'; height: string | '600px' };
  initialStates?: { maximized?: boolean; minimized?: boolean };
  content?: string;
}

// Estado do slice de arquivos
export interface FileSliceState {
  instaledApps: FileNode[];
  filesList: FileNode;
  rootPath: string;
  desktopPath: string;
  sort: SortType;
}
