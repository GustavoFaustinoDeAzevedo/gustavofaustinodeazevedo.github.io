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
}

// Estado do slice de arquivos
export interface FileState {
  filesList: FileNode;
  rootPath: string;
  defaultPath: string;
  sort: SortType;
}
