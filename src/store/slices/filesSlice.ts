// store/slices/fileSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootFolder } from '../../data/filesData';

// 1. Type definitions

// Sort order type
type SortType = 'asc' | 'desc';

// Basic structure of a file/node in the tree
export interface FileNode {
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

// State of this slice
export interface FileState {
  filesList: FileNode;
  rootPath: string;
  defaultPath: string;
  sort: SortType;
}

// 2. Utility functions converted to TS

/**
 * Adds a new file into node.children, ensuring that the most recently
 * added file is placed second to last when there are two or more children.
 */
const newFile = (
  node: FileNode,
  fileToBeAdded: FileNode,
  nodeDepth: number
): FileNode[] => {
  const children = [...(node.children ?? []), { ...fileToBeAdded, nodeDepth }];

  if (children.length >= 2) {
    const lastIndex = children.length - 1;
    const secondLastIndex = children.length - 2;
    [children[secondLastIndex], children[lastIndex]] = [
      children[lastIndex],
      children[secondLastIndex],
    ];
  }

  return children;
};

/**
 * Recursively searches for a node matching the targetId and correct parent depth,
 * and adds a new file to its children.
 */
const updateChildrenById = (
  node: FileNode,
  targetId: string,
  fileToBeAdded: FileNode,
  nodeDepth: number
): boolean => {
  // If we found the target node, add the new file
  if (node.fileId === targetId && node.nodeDepth === nodeDepth - 1) {
    node.children = newFile(node, fileToBeAdded, nodeDepth);
    return true;
  }

  // Otherwise, traverse into children
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      if (updateChildrenById(child, targetId, fileToBeAdded, nodeDepth)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Sorts the files alphabetically by fileId but keeps the last element always at the end.
 */
const toggleSort = (files: FileNode[], sortType: SortType): FileNode[] => {
  if (files.length === 0) return [];

  const sorted = [...files];
  const last = sorted.pop()!;

  sorted.sort((a, b) =>
    sortType === 'asc'
      ? a.fileId.localeCompare(b.fileId)
      : b.fileId.localeCompare(a.fileId)
  );

  sorted.push(last);
  return sorted;
};

/**
 * Recursively assigns nodeDepth to each node based on its depth in the tree.
 */
const handleNestedEntities = (obj: FileNode, nodeDepth = 0): FileNode => {
  const children = obj.children?.map((file) => {
    const current = { ...file, nodeDepth: nodeDepth + 1 };
    return file.children
      ? handleNestedEntities(current, nodeDepth + 1)
      : current;
  });

  return { ...obj, nodeDepth, children };
};

// 3. Slice definition

const initialState: FileState = {
  filesList: handleNestedEntities(rootFolder),
  rootPath: 'root/',
  defaultPath: 'root/users/guests/desktop',
  sort: 'asc',
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addFile: (
      state,
      action: PayloadAction<{
        newFileData: FileNode;
        currentNode: string;
        nodeDepth: number;
      }>
    ) => {
      const { newFileData, currentNode, nodeDepth } = action.payload;
      updateChildrenById(state.filesList, currentNode, newFileData, nodeDepth);
    },

    removeFile: (state, action: PayloadAction<{ fileId: string }>) => {
      const removeById = (node: FileNode, fileId: string) => {
        node.children = node.children?.filter(
          (child) => child.fileId !== fileId
        );
        node.children?.forEach((child) => removeById(child, fileId));
      };
      removeById(state.filesList, action.payload.fileId);
    },

    sortFiles: (state) => {
      const children = state.filesList.children ?? [];
      state.filesList.children = toggleSort(children, state.sort);
      state.sort = state.sort === 'asc' ? 'desc' : 'asc';
    },
  },
});

export const { addFile, removeFile, sortFiles } = fileSlice.actions;
export default fileSlice.reducer;
