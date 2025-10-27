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
  indexLocator,
  focusWindow,
  findPath,
  findNode,
  newFile,
} from './windowSlice.utils';
import updateStateIfDefined from '@/store/utils/updateStateIfDefined';
import { Language } from '../settings/settingsSlice.types';

const windowSlice = createSlice({
  name: 'window',
  initialState: {
    openedWindowList: [],
    focusedWindow: null,
    history: [],
  } as WindowSliceState,
  reducers: {
    focusWindow: (state, action) => {
      const windowId = action.payload;
      state.focusedWindow = windowId;
      const foundWindow = state.openedWindowList.find(
        (win) => win.windowId === windowId
      );
      if (foundWindow && foundWindow.windowState) {
        foundWindow.zIndex = getNextZIndex(state);
        foundWindow.windowState.requests.focus = true;
        foundWindow.windowState.status.focused = false;
        foundWindow.windowState.status.minimized = false;
      }
    },

    openWindow: (
      state: WindowSliceState,
      action: { payload: WindowData }
    ): void => {
      const {
        windowId,
        title,
        icon,
        src,
        children = [],
        type,
        nodeDepth,
        isUnique,
        isRequestingMaximize = false,
        content,
        initialDimensions,
      }: WindowData = action.payload;

      if (isUnique && title) {
        const { eng, por } = title;
        const foundSameWindow = state.openedWindowList.find(
          (win) => win.title?.por === por && win.title?.eng === eng
        );
        if (
          foundSameWindow &&
          foundSameWindow.position &&
          foundSameWindow.size &&
          foundSameWindow.windowId !== undefined &&
          foundSameWindow.windowState
        ) {
          state.focusedWindow = foundSameWindow.windowId;
          foundSameWindow.windowState.requests.restore = true;
          return;
        }
      }

      if (!title) return; //temporario para evitar erros
      state.history = updateHistory(state.history, title);

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
        nodeDepth,
        title,
        icon,
        zIndex: getNextZIndex(state),
        type,
        src,
        children,
        content,
        initialDimensions,
        position: { lastX: 0, lastY: 0, x: 0, y: 0 },
        size: { lastWidth: 0, lastHeight: 0, width: 0, height: 0 },
        windowState: { ...baseState },
      };

      state.openedWindowList = [...state.openedWindowList, newWindow];

      focusWindow(state, newId);
    },

    resetFocus: (state, action) => {
      const windowId = action.payload;
      const winIndex = indexLocator(windowId, state);
      if (winIndex === -1) return;
      const currentWindow: any = state.openedWindowList[winIndex];
      currentWindow.windowState.status.focused = false;
      state.focusedWindow = null;
    },

    closeWindow: (state, action) => {
      state.openedWindowList = state.openedWindowList.filter(
        (win: WindowNode) => win.windowId !== action.payload
      );
    },

    updateWindow: (state, action) => {
      if (!action.payload?.windowId || action.payload.windowId === undefined)
        return;

      const {
        opened,
        windowId,
        currentNode,
        title,
        icon,
        nodeDepth,
        lastX,
        lastY,
        x,
        y,
        lastWidth,
        lastHeight,
        width,
        height,
        minimized,
        maximized,
        focused,
        children,
        content,
        isRequestingOpen,
        isRequestingRestore,
        isRequestingClose,
        isRequestingMinimize,
        isRequestingMaximize,
        isRequestingFocus,
        safe = true,
      } = action.payload;

      if (opened === false) {
        state.openedWindowList = state.openedWindowList.filter(
          (win: WindowNode) => win.windowId !== windowId
        );
        return;
      }

      const winIndex = indexLocator(windowId, state);
      if (winIndex === -1) return;

      const currentWindow: any = state.openedWindowList[winIndex];

      const currentWindowState = currentWindow.windowState;

      if (focused) focusWindow(state, windowId);

      state.openedWindowList[winIndex] = updateStateIfDefined(currentWindow, {
        title,
        icon,
        currentNode,
        nodeDepth,
        children:
          currentWindow.currentNode !== currentNode
            ? newFile(currentWindow, children)
            : children,
        content,
      });

      state.openedWindowList[winIndex].position = updateStateIfDefined(
        currentWindow.position,
        {
          lastX,
          lastY,
          x,
          y,
        }
      );

      state.openedWindowList[winIndex].size = updateStateIfDefined(
        currentWindow.size,
        {
          lastWidth,
          lastHeight,
          width,
          height,
        }
      );

      currentWindowState.status = updateStateIfDefined(
        currentWindowState.status,
        {
          minimized,
          maximized,
          opened,
        }
      );

      currentWindowState.requests = updateStateIfDefined(
        currentWindowState.requests,
        {
          open: isRequestingOpen,
          restore: isRequestingRestore,
          close: isRequestingClose,
          minimize: isRequestingMinimize,
          maximize: isRequestingMaximize,
          focus: isRequestingFocus,
        }
      );
    },
  },
});

export const {
  // focusWindow,
  openWindow,
  resetFocus,
  closeWindow,
  updateWindow,
} = windowSlice.actions;
export default windowSlice.reducer;
