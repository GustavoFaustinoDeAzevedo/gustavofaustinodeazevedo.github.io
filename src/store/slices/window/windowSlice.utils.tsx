import { Title, WindowNode, WindowSliceState } from './windowSlice.types';
import { FileNode } from '../file';
import { WindowData } from '@/store/actions/useWindowActions';

/**
 * Retorna o próximo zIndex para uma janela com base no estado atual.
 * Se getMaxZIndex for true, retorna o maior zIndex atual entre todas as
 * janelas, caso contrário, retorna o maior zIndex atual + 1.
 * @param {WindowSliceState} state - O estado atual do slice de janelas.
 * @param {boolean} getMaxZIndex - Se deve retornar o maior zIndex atual.
 * @returns {number} - O próximo zIndex.
 */
export const getNextZIndex = (
  state: WindowSliceState,
  getMaxZIndex = false,
): number => {
  const windows = Object.values(state.openedWindows);

  if (windows.length === 0) return 1;

  const maxZ = windows.reduce((max, win) => Math.max(max, win.zIndex || 0), 0);

  return getMaxZIndex ? maxZ : maxZ + 1;
};

/**
 * Atualiza o histórico adicionando o windowId dado ao início da lista
 * e removendo qualquer entrada duplicada.
 * Mantém no máximo 10 itens.
 */
export const updateHistory = (history: Title[], windowId: Title): Title[] => {
  try {
    const seen = new Set<string>();
    const newHistory = [windowId, ...history].filter((item) => {
      const key = `${item.por}-${item.eng}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return newHistory.slice(0, 10);
  } catch (error) {
    console.error('Error updating history:', error);
    return history;
  }
};

/**
 * Verifica se o windowId existe no dicionário de janelas abertas.
 * Retorna a janela correspondente ou undefined se não existir.
 */
export const windowLocator = (
  windowId: string,
  state: WindowSliceState,
): WindowNode | undefined => {
  try {
    return state.openedWindows[windowId];
  } catch (error) {
    console.error('Error locating window:', error);
    return undefined;
  }
};

export const focusWindow = (state: WindowSliceState, windowId: string) => {
  state.focusedWindow = windowId;

  const foundWindow: WindowNode | undefined = state.openedWindows[windowId];
  if (!foundWindow || !foundWindow.windowState) return;

  foundWindow.zIndex = getNextZIndex(state);
  foundWindow.windowState.status.focused = true;
  foundWindow.windowState.status.minimized = false;
  foundWindow.windowState.requests.focus = false;
};
