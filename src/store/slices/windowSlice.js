import { createSlice } from '@reduxjs/toolkit';

// Utility functions

/**
 * Calculates the next z-index value for a window or returns the maximum z-index value.
 *
 * @param {Object} state - The current state containing the list of opened windows.
 * @param {boolean} [getMaxZIndex=false] - If true, returns the maximum z-index instead of the next one.
 * @returns {number} The next z-index value or the maximum z-index value if getMaxZIndex is true.
 */
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

/**
 * Updates the history array by moving the given id to the front,
 * removing any duplicates, and limiting the array to a maximum of 10 items.
 *
 * @param {Array<string|number>} history - The current history array.
 * @param {string|number} id - The identifier to move to the front of the history.
 * @returns {Array<string|number>} The updated history array.
 */
const updateHistory = (history, id) => {
  try {
    const filteredHistory = history.filter(item => item !== id);
    return [id, ...filteredHistory].slice(0, 10);
  } catch (error) {
    console.error('Error updating history:', error);
    return history;
  }
};

/**
 * Locates the index of a window in the openedWindowList array by its id.
 *
 * @param {string} id - The unique identifier of the window.
 * @param {Object} state - The state object containing the openedWindowList array.
 * @returns {number} The index of the window with the specified id, or -1 if not found.
 */
const indexLocator = (id, state) => {
  try {
    return state.openedWindowList.findIndex(win => win.id === id);
  } catch (error) {
    console.error('Error locating window index:', error);
    return -1;
  }
};

// Redux slice for managing windows

const windowSlice = createSlice({
  name: 'window',
  initialState: {
    openedWindowList: [],
    focusedWindow: null,
    history: [],
  },
  reducers: {
    focusWindow: (state, action) => {
      const id = action.payload;
      state.focusedWindow = id;
      const foundWindow = state.openedWindowList.find(win => win.id === id);
      if (foundWindow) {
        foundWindow.zIndex = getNextZIndex(state);
        foundWindow.windowState.minimized = false;
      }
    },

    openWindow: (state, action) => {
      const { id, title, icon, src, children, isUnique, type } = action.payload;
      // If isUnique is true, check if a window with the same base id is already open
      if (isUnique) {
        const existingWindow = state.openedWindowList.find(win => win.id.startsWith(`window#${id}#`));
        if (existingWindow) {
          // Focus the existing window instead of opening a new one
          state.focusedWindow = existingWindow.id;
          return;
        }
      }

      state.history = updateHistory(state.history, title);
      // Generate a unique id for the new window
      const finalId = `window#${id}#${new Date().getTime()}#${Math.random()}`;

      const newWindow = {
        id: finalId,
        nodeId: id,
        title,
        icon,
        zIndex: getNextZIndex(state),
        type,
        content: '',
        src: src,
        children: children ?? [],
        position: {
          startX: 0,
          startY: 0,
          x: 0,
          y: 0,
        },
        size: {
          startWidth: 0,
          startHeight: 0,
          width: 0,
          height: 0,
        },
        windowState: {
          open: true,
          maximized: false,
          minimized: false,
          requestingOpen: false,
          requestingRestore: false,
          requestingClose: false,
          requestingMaximize: false,
          requestingMinimize: false,
        },

      };

      state.openedWindowList.push(newWindow);
      state.focusedWindow = finalId;
    },

    resetFocus: (state) => {
      state.focusedWindow = null;
    },

    closeWindow: (state, action) => {
      state.openedWindowList = state.openedWindowList.filter(win => win.id !== action.payload);
    },

    updateWindow: (state, action) => {
      if (!action.payload?.id || action.payload.id === undefined) return;

      const {
        id,
        title,
        icon,
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
        newChildren,
        requestingOpen,
        requestingRestore,
        requestingClose,
        requestingMinimize,
        requestingMaximize,

      } = action.payload;

      const winIndex = indexLocator(id, state);
      if (winIndex === -1) return;

      const currentWindow = state.openedWindowList[winIndex];

      // Update basic properties
      if (title !== undefined) currentWindow.title = title;
      if (icon !== undefined) currentWindow.icon = icon;
      if (newChildren !== undefined) currentWindow.children = newChildren;

      // Update position
      if (startX !== undefined) currentWindow.position.startX = startX;
      if (startY !== undefined) currentWindow.position.startY = startY;
      if (x !== undefined) currentWindow.position.x = x;
      if (y !== undefined) currentWindow.position.y = y;

      // Update size
      if (startWidth !== undefined) currentWindow.size.startWidth = startWidth;
      if (startHeight !== undefined) currentWindow.size.startHeight = startHeight;
      if (width !== undefined) currentWindow.size.width = width;
      if (height !== undefined) currentWindow.size.height = height;

      // Update window state
      if (minimized !== undefined) currentWindow.windowState.minimized = minimized;
      if (maximized !== undefined) currentWindow.windowState.maximized = maximized;
      if (requestingOpen !== undefined) currentWindow.windowState.requestingOpen = requestingOpen;
      if (requestingRestore !== undefined) currentWindow.windowState.requestingRestore = requestingRestore;
      if (requestingClose !== undefined) currentWindow.windowState.requestingClose = requestingClose;
      if (requestingMinimize !== undefined) currentWindow.windowState.requestingMinimize = requestingMinimize;
      if (requestingMaximize !== undefined) currentWindow.windowState.requestingMaximize = requestingMaximize;
    }
  },
});

export const { focusWindow, openWindow, resetFocus, closeWindow, updateWindow } = windowSlice.actions;
export default windowSlice.reducer;
