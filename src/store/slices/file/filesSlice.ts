import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootFolder } from '@/data/filesData';
import { FileNode, FileState } from './filesSlice.type';
import instaledAppsData from '@/data/instaledAppsData';

/**
 * Adiciona um novo arquivo em node.children, garantindo que o mais recente
 * o arquivo adicionado é colocado em penúltimo lugar quando há dois ou mais filhos.
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
 *Procurar recursivamente um nó que corresponda à profundidade do pai e ao targetId,
 *e adiciona um novo arquivo a seus filhos.
 */

export const findByPath = (root: FileNode, path: string): FileNode | null => {
  let parts = path.split('/');

  if (parts[0] === root.fileId) {
    parts = parts.slice(1);
  }

  let current: FileNode | undefined = root;

  for (const part of parts) {
    if (!current || !current.children) return null;
    current = current.children.find((child) => child.fileId === part);
  }

  return current ?? null;
};

/**
 * Ordena os arquivos em ordem alfabética por FileId, mas mantém o último elemento sempre no final.
 */
const toggleSort = (files: FileNode[], sortType: string): FileNode[] => {
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
 * Atribui recursivamente nodeDepth para cada nó com base em sua profundidade na árvore.
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

// Slice

const initialState: FileState = {
  instaledApps: instaledAppsData,
  filesList: handleNestedEntities(rootFolder),
  rootPath: 'root/',
  desktopPath: 'root/users/guests/desktop',
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
      // updateChildrenById(state.filesList, currentNode, newFileData, nodeDepth);
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
