import { Size } from '../window';

type SortType = 'asc' | 'desc'; // provisório

// Título de um arquivo/nó pode ser string simples ou um objeto com traduções
export type Title = { eng: string; por: string };

// Permissões de acesso de um arquivo/nó
export type Permission = {
  read: boolean;
  write: boolean;
  execute: boolean;
};

// Atributos de um arquivo/nó
export type Attributes = {
  hidden: boolean;
  system: boolean;
  readOnly: boolean;
};

// Máscara de uma janela associada a um arquivo/nó
export type WindowMask = {
  src: string;
  title: Title;
  icon: string;
};

// Tipos de dados iniciais para dimensões de janela
export type InitialDimensions = {
  width: string;
  height: string;
};

// Tipos de dados iniciais para estados de janela
export type InitialStates = {
  maximized?: boolean;
  minimized?: boolean;
};

// Estrutura básica de um arquivo/nó na árvore
export interface FileNode {
  windowId?: string;
  contentKey?: string;
  fileId: string;
  title?: Title;
  permission?: Permission;
  nodeDepth?: number;
  type?: 'folder' | 'app' | 'text' | 'file';
  extension?: string;
  size?: Size;
  hidden?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
  accessedAt?: Date;
  owner?: string;
  icon?: string;
  isUnique?: boolean;
  windowMask?: WindowMask;
  attributes?: Attributes;
  initialDimensions?: InitialDimensions;
  initialStates?: InitialStates;
  content?: FileNode[];
}

export interface Shortcut {
  title: Title; // Nome visível do atalho
  targetPath: string; // Caminho do destino
  workingDirectory?: string; // Caminho de arquivos relativos
  arguments?: string; // Parâmetros adicionais ao executar
  icon?: string;
  runAsAdmin: boolean;
  createdAt: Date; // Data de criação
  modifiedAt: Date; // Última modificação
  location: string; // Onde o atalho está salvo
}

// Estado do slice de arquivos
export interface FileSliceState {
  instaledApps: FileNode[];
  shortcuts?: Shortcut;
  filesList: FileNode;
  userFolders: FileNode[];
}
