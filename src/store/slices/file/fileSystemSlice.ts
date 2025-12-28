import { createSlice } from '@reduxjs/toolkit';
import nodeIndex from '@data/filesData';


type Node = {
  fileId: string;
  title: { eng: string; por: string };
  icon?: string;
  type: string;
  parentId?: string;
  content?: string[];
  initialDimensions?: { width: string; height: string };
  isUnique?: boolean;
};

interface FileSystemState {
  nodeIndex: Record<string, Node>;
  currentFolderId: string;
  selectedIds: string[];
}

const initialState: FileSystemState = {
  nodeIndex: nodeIndex,
  currentFolderId: 'desktop',
  selectedIds: [],
};

export const fileSystemSlice = createSlice({
  name: 'fileSystem',
  initialState,
  reducers: {
    // Navegação e seleção
    setCurrentFolder: (state, action /*folderId*/) => {},

    setSelectedIds: (state, action /*ids: string[]*/) => {},

    clearSelection: (state) => {},

    // Manipulação de arquivos/pastas

    createNode: (state, action /*node: Node*/) => {},

    deleteNode: (state, action /*nodeId: string*/) => {},

    moveNode: (
      state,
      action /*nodeId: string, targetFolderId: string*/
    ) => {},

    renameNode: (
      state,
      action /*nodeId: string, newTitle: string*/
    ) => {},

    duplicateNode: (
      state,
      action /*nodeId: string, targetFolderId: string*/
    ) => {},

    updateNode: (
      state,
      action /*nodeId: string, updates: Partial<Node>*/
    ) => {},

    // Buscas e indexação

    setNodeIndex: (
      state,
      action /*index: Record<string, Node>*/
    ) => {},

    mergeNodeIndex: (
      state,
      action /*index: Record<string, Node>*/
    ) => {},

    // Outros

    sortChildren: (
      state,
      action /*folderId: string, sortBy: 'name' | 'date' | 'type'*/
    ) => {},

    toggleFavorite: (state, action /*nodeId: string*/) => {},
  },
});

export const {
  setCurrentFolder,
  setSelectedIds,
  clearSelection,
  createNode,
  deleteNode,
  moveNode,
  renameNode,
  duplicateNode,
  updateNode,
  setNodeIndex,
  mergeNodeIndex,
  sortChildren,
  toggleFavorite,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
