import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rootFolder } from '@/data/filesData';
import { FileNode, FileSliceState } from './filesSlice.types';
import instaledAppsData from '@/data/instaledAppsData';

const addNodeWithConflictResolution = (parent: FileNode, newNode: FileNode) => {
  if (!parent.content) parent.content = [];

  // pega todos os títulos já existentes
  const existingTitles = parent.content.map((child) => child.title);

  // verifica se houve conflito
  let counter = 1;
  let conflict = existingTitles.some((childTitle) => {
    if (typeof childTitle === 'string' && typeof newNode.title === 'string') {
      return childTitle === newNode.title;
    }
    if (typeof childTitle === 'object' && typeof newNode.title === 'object') {
      // compara todos os idiomas
      return Object.keys(newNode.title).some(
        (lang) =>
          childTitle[lang as keyof typeof childTitle] ===
          newNode.title?.[lang as keyof typeof newNode.title],
      );
    }
    return false;
  });

  // enquanto houver conflito, limpa o sufixo anterior (caso tenha)
  // e adiciona sufixo em todos os idiomas

  while (conflict) {
    for (const lang in newNode.title) {
      newNode.title[lang as keyof typeof newNode.title] = newNode.title[
        lang as keyof typeof newNode.title
      ].replace(/\s\(\d+\)$/g, '');
      newNode.title[lang as keyof typeof newNode.title] = `${
        newNode.title[lang as keyof typeof newNode.title]
      } (${counter})`;
    }
    counter++;

    conflict = existingTitles.some((childTitle) => {
      if (typeof childTitle !== 'object' && typeof newNode.title !== 'object')
        return null;
      return (
        newNode.title &&
        Object.keys(newNode.title).some(
          (lang) =>
            childTitle?.[lang as keyof typeof childTitle] ===
            newNode.title?.[lang as keyof typeof newNode.title],
        )
      );
    });
  }

  parent.content.push(newNode);
};

/**
 * Procura recursivamente um nó que corresponda à ao caminho fornecido em relação ao nó raiz fornecido
 * (não o nó raiz do sistema, mas o nó passado à função)
 * @returns O nó encontrado ou null se não for encontrado
 */

export const findByPath = (
  root: FileNode,
  path: string,
  newNode?: FileNode,
): FileNode | null => {
  let parts = path.split('/');

  // se o primeiro elemento do caminho for o próprio root, remove
  if (parts[0] === root.fileId) {
    parts = parts.slice(1);
  }

  let current: FileNode | undefined = root;

  for (const part of parts) {
    if (!current?.content) return null;
    current = current.content.find((child) => child.fileId === part);
  }

  // se newNode for fornecido, adiciona-o ao nó encontrado
  if (newNode && current) {
    if (!current.content) current.content = [];
    addNodeWithConflictResolution(current, newNode);
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
      : b.fileId.localeCompare(a.fileId),
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
//TODO Fazer com que o initialState pegue a pasta do usuário logado que será guardado no localStorage.
// Por enquanto, está pegando a pasta 'desktop' do rootFolder, tenho que fazer com que pegue a pasta 
// 'desktop' do usuário logado. Depois, quando eu fizer o sistema de login, aí eu ajusto isso.

const initialState: FileSliceState = {
  instaledApps: instaledAppsData,
  filesList: filesList,
  userFolders: [],
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    newFile: (
      state,
      action: PayloadAction<{
        path: string;
        data: FileNode;
      }>,
    ) => {
      const { data, path } = action.payload;
      findByPath(state.filesList, path, data);
    },

    updateFile: (
      state,
      action: PayloadAction<{
        path: string;
        updates: Partial<FileNode>;
      }>,
    ) => {
      const { path, updates } = action.payload;
    },

    removeFile: (state, action: PayloadAction<{ fileId: string }>) => {
      const removeById = (node: FileNode, fileId: string) => {
        node.content = node.content?.filter((child) => child.fileId !== fileId);
        node.content?.forEach((child) => removeById(child, fileId));
      };
      removeById(state.filesList, action.payload.fileId);
    },
  },
});

export const { newFile, removeFile, updateFile } = fileSlice.actions;
export default fileSlice.reducer;
