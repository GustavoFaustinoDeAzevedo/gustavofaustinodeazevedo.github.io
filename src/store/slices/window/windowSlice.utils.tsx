import { Title, WindowSliceState } from './windowSlice.types';
import { FileNode } from '../file';

/**
 * Retorna o próximo zIndex para uma janela com base no estado atual.
 * Se getMaxZIndex for true, retorna o maior zIndex atual entre todas as
 * janelas, caso contrário, retorna o maior zIndex atual + 1.
 * @param {WindowSliceState} state - O estado atual do slice de janelas.
 * @param {boolean} getMaxZIndex - Se deve retornar o maior zIndex atual.
 * @returns {number} - O próximo zIndex.
 */
export const getNextZIndex = (state: WindowSliceState, getMaxZIndex = false) =>
  getMaxZIndex
    ? Math.max(0, ...state.openedWindowList.map((win) => win.zIndex || 0))
    : state.openedWindowList.reduce(
        (max, win) => Math.max(max, win.zIndex || 0),
        0
      ) + 1;

/**
 * Atualiza o histórico adicionando o windowId dado ao incio da lista e removendo
 * qualquer entrada duplicada.
 * @param {Title[]} history - O histórico atual.
 * @param {Title} windowId - O windowId a ser adicionado ao histórico.
 * @returns {Title[]} - O histórico atualizado.
 */
export const updateHistory = (history: Title[], windowId: Title): Title[] => {
  try {
    const filteredHistory = history.filter((item) =>
      Object.entries(item).some(
        ([key, val]) => ['por', 'eng'].includes(key) && val !== windowId[key]
      )
    );
    return [windowId, ...filteredHistory].slice(0, 10);
  } catch (error) {
    console.error('Error updating history:', error);
    return history;
  }
};

/**
 * Retorna a posição do windowId na lista de janelas abertas.
 * Caso a janela não seja encontrada, retorna -1.
 * @param {string} windowId - O windowId a ser localizado.
 * @param {WindowSliceState} state - O estado atual do slice de janelas.
 * @returns {number} - A posição do windowId.
 */
export const indexLocator = (
  windowId: string,
  state: WindowSliceState
): number => {
  try {
    return state.openedWindowList.findIndex((win) => win.windowId === windowId);
  } catch (error) {
    console.error('Error locating node depth:', error);
    return -1;
  }
};

/**
 * Adiciona um novo arquivo na lista de filhos do nó pai, garantindo que o arquivo
 * mais recentemente adicionado seja colocado na segunda posição da lista
 * quando houver dois ou mais filhos.
 * @param {FileNode} node  - O nó pai.
 * @param {FileNode} fileToBeAdded - O novo arquivo a ser adicionado.
 * @returns {FileNode[]} - A lista de filhos atualizada.
 */
export const newFile = (
  node: FileNode,
  fileToBeAdded: FileNode
): FileNode[] => {
  const children = node.children ?? [];
  if (children.length < 2) return [...children, fileToBeAdded];

  return [children[0], fileToBeAdded, ...children.slice(1)];
};

/**
 * Encontra um nó na estrutura de árvore de janelas com windowId igual ao targetId.
 * @param {FileNode} obj - O nó pai.
 * @param {string} targetId - O windowId do nó a ser encontrado.
 * @returns {FileNode | null} - O nó encontrado ou nulo caso não seja encontrado.
 */
export const findNode = (obj: FileNode, targetId: string): FileNode | null => {
  if (obj.windowId === targetId) return obj;

  if (obj.children) {
    for (let child of obj.children) {
      const result = findNode(child, targetId);
      if (result) return result;
    }
  }

  return null;
};

export const findPath = (
  obj: FileNode,
  targetId: string,
  path: string[] = []
): string[] | undefined => {
  if (obj.windowId === targetId) return path;

  if (obj.children) {
    for (let child of obj.children) {
      const result = findPath(child, targetId, [
        ...(path as any),
        obj.windowId as any,
      ]);
      if (result) return result;
    }
  }

  return undefined;
};

export const focusWindow = (state: WindowSliceState, windowId: string) => {
  state.focusedWindow = windowId;
  const foundWindow = state.openedWindowList.find(
    (win) => win.windowId === windowId
  );
  if (foundWindow && foundWindow.windowState) {
    state.focusedWindow = windowId;
    foundWindow.zIndex = getNextZIndex(state);
    foundWindow.windowState.status.focused = true;
    foundWindow.windowState.status.minimized = false;
    foundWindow.windowState.requests.focus = false;
  }
};

// export const returnWindowContent = ({
//   windowId,
//   language,
//   src,
//   type,
//   windowActions,
//   children,
// }: {
//   windowId?: string;
//   language: Language;
//   src?: string;
//   type?: string;
//   windowActions?: any;
//   children?: any;
// }) => {

//   return map[contentId]?.()
// };
