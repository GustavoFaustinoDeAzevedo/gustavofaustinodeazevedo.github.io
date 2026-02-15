import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Title,
  WindowNode,
  WindowSliceState,
  WindowState,
} from './windowSlice.types';
import { WindowData } from '@/store/actions/useWindowActions';
import {
  getNextZIndex,
  updateHistory,
  windowLocator,
  focusWindow,
  findPath,
  findNode,
  newFile,
} from './windowSlice.utils';
import updateStateIfDefined from '@/store/utils/updateStateIfDefined';

const windowSlice = createSlice({
  name: 'window',
  initialState: {
    openedWindows: {},
    openedWindowList: [],
    activeWindowParams: {},
    focusedWindow: null,
    history: [],
  } as WindowSliceState,
  reducers: {
    generalFocus: (state, action) => {
      const windowId = action.payload;
      state.focusedWindow = windowId;

      const foundWindow = state.openedWindows[windowId];
      state.activeWindowParams = foundWindow || {};

      if (foundWindow && foundWindow.windowState) {
        foundWindow.zIndex = getNextZIndex(state);
        foundWindow.windowState.requests.focus = true;
        foundWindow.windowState.status.focused = false;
        foundWindow.windowState.status.minimized = false;
      }
    },

    openWindow: (
      state: WindowSliceState,
      action: { payload: WindowData },
    ): void => {
      const {
        windowId,
        title,
        icon,
        src,
        content = [],
        type,
        nodeDepth,
        isUnique,
        contentKey,
        isRequestingMaximize = false,
        windowType = 'window',
        initialDimensions,
        helpContent = null,
      }: WindowData = action.payload;

      if (isUnique && windowId) {
        const currentWindow = state.openedWindows[windowId];
        if (
          currentWindow &&
          currentWindow.position &&
          currentWindow.size &&
          currentWindow.windowState
        ) {
          state.focusedWindow = currentWindow.windowId || null;
          currentWindow.windowState.requests.restore = true;
          return;
        }
      }

      if (!windowId) return;

      state.history = updateHistory(state.history, {
        icon,
        reopenProps: action.payload,
        ...(title as Title),
      });

      const newId = `window#${windowId}#${Date.now()}#${Math.random()}`;

      const baseState: WindowState = {
        status: {
          opened: false,
          focused: false,
          maximized: false,
          minimized: false,
        },
        requests: {
          open: true,
          restore: false,
          focus: true,
          close: false,
          maximize:
            typeof isRequestingMaximize === 'boolean'
              ? isRequestingMaximize
              : false,
          minimize: false,
        },
      };

      const newWindow: WindowNode = {
        windowId: newId,
        currentNode: windowId,
        helpContent,
        nodeDepth,
        title,
        icon,
        zIndex: getNextZIndex(state),
        type,
        src,
        content,
        contentKey,
        initialDimensions,
        windowType,
        position: { lastX: 0, lastY: 0, x: 0, y: 0 },
        size: { lastWidth: 0, lastHeight: 0, width: 0, height: 0 },
        windowState: { ...baseState },
      };

      state.openedWindows[newId] = newWindow;

      focusWindow(state, newId);
    },

    resetFocus: (state, action) => {
      const windowId = action.payload;
      const currentWindow: WindowNode | undefined =
        state.openedWindows[windowId];
      if (!currentWindow) return;

      if (currentWindow.windowState) {
        currentWindow.windowState.status.focused = false;
      }

      state.focusedWindow = null;
    },

    closeWindow: (state, action) => {
      const windowId = action.payload;
      if (!windowId) return;

      delete state.openedWindows[windowId];

      // Se a janela fechada estava focada, limpa o foco
      if (state.focusedWindow === windowId) {
        state.focusedWindow = null;
      }
    },

    updateWindow: (state, action: PayloadAction<WindowData>) => {
      const {
        windowId,
        title,
        icon,
        currentNode,
        nodeDepth,
        content,
        contentKey,
        lastX,
        lastY,
        x,
        y,
        lastWidth,
        lastHeight,
        width,
        height,
        opened = action.payload.isOpened,
        minimized = action.payload.isMinimized,
        maximized = action.payload.isMaximized,
        focused = action.payload.isFocused,
        open = action.payload.isRequestingOpen,
        restore = action.payload.isRequestingRestore,
        close = action.payload.isRequestingClose,
        minimize = action.payload.isRequestingMinimize,
        maximize = action.payload.isRequestingMaximize,
        focus = action.payload.isRequestingFocus,
      } = action.payload;

      if (!windowId) return;

      if (opened === false) {
        delete state.openedWindows[windowId];
        return;
      }

      const currentWindow = windowLocator(windowId, state);
      if (!currentWindow || !currentWindow.windowState) return;

      // Atualiza campos principais
      updateStateIfDefined(currentWindow, {
        title,
        icon,
        currentNode,
        nodeDepth,
        contentKey,
        content,
      });

      // Atualiza posição
      updateStateIfDefined(currentWindow.position as object, {
        lastX,
        lastY,
        x,
        y,
      });

      // Atualiza tamanho
      updateStateIfDefined(currentWindow.size as object, {
        lastWidth,
        lastHeight,
        width,
        height,
      });

      // Atualiza status
      updateStateIfDefined(currentWindow.windowState.status, {
        minimized,
        maximized,
        opened,
        focused,
      });

      // Atualiza requests
      updateStateIfDefined(currentWindow.windowState.requests, {
        open,
        restore,
        close,
        minimize,
        maximize,
        focus,
      });

      if (focused) {
        focusWindow(state, windowId);
      }
    },
  },
});

export const {
  generalFocus,
  openWindow,
  resetFocus,
  closeWindow,
  updateWindow,
} = windowSlice.actions;
export default windowSlice.reducer;
