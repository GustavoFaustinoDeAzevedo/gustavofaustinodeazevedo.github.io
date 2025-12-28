import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootFolder } from '@/data/filesData';
import { FileNode, FileSliceState } from './filesSlice.types';
import instaledAppsData from '@/data/instaledAppsData';

/**
 * Adiciona um novo arquivo em node.content, garantindo que o mais recente
 * o arquivo adicionado é colocado em penúltimo lugar quando há dois ou mais filhos.
 */
const newFile = (
  node: FileNode,
  fileToBeAdded: FileNode,
  nodeDepth: number
): FileNode[] => {
  const content = [...(node.content ?? []), { ...fileToBeAdded, nodeDepth }];

  if (content.length >= 2) {
    const lastIndex = content.length - 1;
    const secondLastIndex = content.length - 2;
    [content[secondLastIndex], content[lastIndex]] = [
      content[lastIndex],
      content[secondLastIndex],
    ];
  }

  return content;
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
    if (!current || !current.content) return null;
    current = current.content.find((child) => child.fileId === part);
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
  const content = obj.content?.map((file) => {
    const current = { ...file, nodeDepth: nodeDepth + 1 };
    return file.content
      ? handleNestedEntities(current, nodeDepth + 1)
      : current;
  });

  return { ...obj, nodeDepth, content };
};



const filesList = handleNestedEntities(rootFolder);

// Slice

const initialState: FileSliceState = {
  instaledApps: instaledAppsData,
  filesList: filesList,
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
    },

    removeFile: (state, action: PayloadAction<{ fileId: string }>) => {
      const removeById = (node: FileNode, fileId: string) => {
        node.content = node.content?.filter(
          (child) => child.fileId !== fileId
        );
        node.content?.forEach((child) => removeById(child, fileId));
      };
      removeById(state.filesList, action.payload.fileId);
    },

    sortFiles: (state) => {
      const content = state.filesList.content ?? [];
      state.filesList.content = toggleSort(content, state.sort);
      state.sort = state.sort === 'asc' ? 'desc' : 'asc';
    },
  },
});

export const { addFile, removeFile, sortFiles } = fileSlice.actions;
export default fileSlice.reducer;
