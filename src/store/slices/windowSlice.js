import { createSlice } from '@reduxjs/toolkit';

// Utility functions

const getNextZIndex = (state, getMaxZIndex = false) => {
  try {
    const zIndexes = state.openedWindowList.map(win => win.zIndex || 0);
    const maxZ = Math.max(0, ...zIndexes);
    return getMaxZIndex ? maxZ : maxZ + 1;
  } catch (error) {
    console.error('Error calculating next zIndex:', error);
    return 1;
  }
};

const updateHistory = (history, windowId) => {
  try {
    const filteredHistory = history.filter(item => Object.entries(item)
      .some(([key, val]) => ["por", "eng"].includes(key) && val !== windowId[key]));
    return [windowId, ...filteredHistory].slice(0, 10);
  } catch (error) {
    console.error('Error updating history:', error);
    return history;
  }
};

const indexLocator = (windowId, state) => {
  try {
    return state.openedWindowList.findIndex(win => win.windowId === windowId);
  } catch (error) {
    console.error('Error locating node depth:', error);
    return -1;
  }
};

const newFile = (node, fileToBeAdded) => {
  const children = [...(node.children || []), fileToBeAdded];

  if (children.length >= 2) {
    const lastIndex = children.length - 1;
    const secondLastIndex = children.length - 2;

    [children[secondLastIndex], children[lastIndex]] = [children[lastIndex], children[secondLastIndex]];
  }
  return children;
};

function findNode(obj, targetId) {
  if (obj.windowId === targetId) return obj;

  if (obj.children) {
    for (let child of obj.children) {
      const result = findNode(child, targetId);
      if (result) return result;
    }
  }

  return null;
}

function findPath(obj, targetId, path = []) {
  if (obj.windowId === targetId) return [...path];

  if (obj.children) {
    for (let child of obj.children) {
      const result = findPath(child, targetId, [...path, obj.windowId]);
      if (result) return result;
    }
  }

  return null;
};

const windowSlice = createSlice({
  name: 'window',
  initialState: {
    openedWindowList: [],
    focusedWindow: null,
    history: [],
  },
  reducers: {
    focusWindow: (state, action) => {
      const windowId = action.payload;
      state.focusedWindow = windowId;
      const foundWindow = state.openedWindowList.find(win => win.windowId === windowId);
      if (foundWindow) {
        foundWindow.zIndex = getNextZIndex(state);
        foundWindow.windowState.minimized = false;
      }
    },

    openWindow: (state, action) => {
      const { windowId, title, icon, src, children = [], type, nodeDepth, isUnique } = action.payload;

      if (isUnique) {
        const { eng, por } = title;
        const foundSameWindow = state.openedWindowList.find(win => win.title.por === por && win.title.eng === eng);
        if (foundSameWindow) {
          state.focusedWindow = foundSameWindow.windowId;
          return;
        }
      }

      state.history = updateHistory(state.history, title);

      const newId = `window#${windowId}#${Date.now()}#${Math.random()}`;

      const baseState = {
        open: true,
        maximized: false,
        minimized: false,
        requestingOpen: false,
        requestingRestore: false,
        requestingClose: false,
        requestingMaximize: false,
        requestingMinimize: false,
      };

      const newWindow = {
        windowId: newId,
        currentNode: windowId,
        nodeDepth,
        title,
        icon,
        zIndex: getNextZIndex(state),
        type,
        content: '',
        src,
        children,
        position: { startX: 0, startY: 0, x: 0, y: 0 },
        size: { startWidth: 0, startHeight: 0, width: 0, height: 0 },
        windowState: { ...baseState },
      };

      state.openedWindowList = [...state.openedWindowList, newWindow];
      state.focusedWindow = newId;
    },

    resetFocus: (state) => {
      state.focusedWindow = null;
    },

    closeWindow: (state, action) => {
      state.openedWindowList = state.openedWindowList.filter(win => win.windowId !== action.payload);
    },

    updateWindow: (state, action) => {
      if (!action.payload?.windowId || action.payload.windowId === undefined) return;

      const {
        windowId,
        currentNode,
        title,
        icon,
        nodeDepth,
        startX,
        startY,
        x,
        y,
        startWidth,
        startHeight,
        width,
        height,
        minimized,
        maximized,
        children,
        requestingOpen,
        requestingRestore,
        requestingClose,
        requestingMinimize,
        requestingMaximize,
      } = action.payload;

      const winIndex = indexLocator(windowId, state);
      if (winIndex === -1) return;

      const currentWindow = state.openedWindowList[winIndex];

      Object.assign(currentWindow, {
        ...(title !== undefined && { title }),
        ...(icon !== undefined && { icon }),
        ...(children !== undefined && { children: currentWindow.currentNode !== currentNode ? newFile(currentWindow, children) : children }),
        ...(currentNode !== undefined && { currentNode }),
        ...(nodeDepth !== undefined && { nodeDepth }),
      })

      Object.assign(currentWindow.position, {
        ...(startX !== undefined && { startX }),
        ...(startY !== undefined && { startY }),
        ...(x !== undefined && { x }),
        ...(y !== undefined && { y }),
      })

      Object.assign(currentWindow.size, {
        ...(startWidth !== undefined && { startWidth }),
        ...(startHeight !== undefined && { startHeight }),
        ...(width !== undefined && { width }),
        ...(height !== undefined && { height }),
      })

      Object.assign(currentWindow.windowState, {
        ...(minimized !== undefined && { minimized }),
        ...(maximized !== undefined && { maximized }),
        ...(requestingOpen !== undefined && { requestingOpen }),
        ...(requestingRestore !== undefined && { requestingRestore }),
        ...(requestingClose !== undefined && { requestingClose }),
        ...(requestingMinimize !== undefined && { requestingMinimize }),
        ...(requestingMaximize !== undefined && { requestingMaximize }),
      })

    }
  },
});

export const { focusWindow, openWindow, resetFocus, closeWindow, updateWindow } = windowSlice.actions;
export default windowSlice.reducer;
