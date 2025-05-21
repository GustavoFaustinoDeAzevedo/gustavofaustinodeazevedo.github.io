import { createSlice } from '@reduxjs/toolkit';

/**
 * Calculates the next z-index value for a window or retrieves the maximum z-index value.
 *
 * @param {Object} state - The current state containing the list of opened windows.
 * @param {boolean} [getMaxZIndex=false] - If true, returns the maximum z-index value instead of the next one.
 * @returns {number} The next z-index value or the maximum z-index value if `getMaxZIndex` is true.
 */
const getNextZIndex = (state, getMaxZIndex = false) => {
  try {
    const zIndexes = state.openedWindowList.map((win) => win.zIndex || 0);
    let maxZ = Math.max(0, ...zIndexes);
    if (getMaxZIndex) return maxZ;
    return maxZ + 1;
  } catch (error) {
    console.error('Error calculating next zIndex:', error);
    return 1;
  }
};

/**
 * Updates the history array by moving the specified `id` to the front of the array,
 * ensuring it appears only once, and limits the array to a maximum of 10 items.
 *
 * @param {Array<string|number>} history - The current history array.
 * @param {string|number} id - The identifier to move to the front of the history.
 * @returns {Array<string|number>} The updated history array with the `id` at the front.
 */
const updateHistory = (history, id) => {
  try {
    const filteredHistory = history.filter((item) => item !== id);
    return [id, ...filteredHistory].slice(0, 10);
  } catch (error) {
    console.error('Error updating history:', error);
    return history;
  }
};

/**
 * Locates the index of a window in the openedWindowList array by its ID.
 *
 * @param {string} id - The unique identifier of the window to locate.
 * @param {Object} state - The state object containing the openedWindowList array.
 * @param {Array} state.openedWindowList - The list of opened windows.
 * @returns {number} The index of the window with the specified ID, or -1 if not found or an error occurs.
 */
const indexLocator = (id, state) => {
  try {
    return state.openedWindowList.findIndex(win => win.id === id);
  } catch (error) {
    console.error('Error locating index:', error);
    return -1;
  }
};

const windowSlice = createSlice({
  name: 'window',
  initialState: {
    openedWindowList: [],
    focusedWindow: null,
    history: []
  },
  reducers: {
    focusWindow: (state, action) => {
      const id = action.payload;
      state.focusedWindow = id;
      const window = state.openedWindowList.find((win) => win.id === id);
      if (window) {
        window.zIndex = getNextZIndex(state);
        window.windowState.minimized = false;
      }
    },
    openWindow: (state, action) => {

      const { id, title, icon } = action.payload;
      state.history = updateHistory(state.history, id);
      const finalId = `window#${id}#${new Date() * Math.random()}`
      state.openedWindowList = [...state.openedWindowList, {
        id: finalId,
        title,
        icon,
        zIndex: getNextZIndex(state),
        content: '',
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
      }];
      state.focusedWindow = finalId;
    },

    closeWindow: (state, action) => {
      state.openedWindowList = state.openedWindowList.filter(win => win.id !== action.payload);
    },

    resetFocus: (state) => {
      state.focusedWindow = null;
    },

    updateWindow: (state, action) => {
      const { id, title, icon, startX, startY, x, y, startWidth, startHeight, width, height, minimized, maximized, content, requestingOpen, requestingRestore, requestingClose, requestingMinimize, requestingMaximize } = action.payload;
      const windowIndex = indexLocator(id, state);
      const window = state.openedWindowList[windowIndex];
      if (!window) return;

      if (title) window.title = title;
      if (icon) window.icon = icon;

      if (startX !== undefined) {
        window.position.startX = startX;
      }
      if (startY !== undefined) {
        window.position.startY = startY;
      }

      if (x !== undefined) {
        window.position.x = x;
      }
      if (y !== undefined) {
        window.position.y = y;
      }

      if (startWidth !== undefined) {
        window.size.startWidth = startWidth;
      }
      if (startHeight !== undefined) {
        window.size.startHeight = startHeight;
      }

      if (width !== undefined) {
        window.size.width = width;
      }
      if (height !== undefined) {
        window.size.height = height;
      }

      if (minimized !== undefined) window.windowState.minimized = minimized;
      if (maximized !== undefined) window.windowState.maximized = maximized;
      if (requestingOpen !== undefined) window.windowState.requestingOpen = requestingOpen;
      if (requestingRestore !== undefined) window.windowState.requestingRestore = requestingRestore;
      if (requestingClose !== undefined) window.windowState.requestingClose = requestingClose;
      if (requestingMinimize !== undefined) window.wwindowState.requestingMinimize = requestingMinimize;
      if (requestingMaximize !== undefined) window.windowState.requestingMaximize = requestingMaximize;

      if (content !== undefined) window.content = content;
    }

  },
});

export const {
  focusWindow,
  openWindow,
  closeWindow,
  resetFocus,
  updateWindow
} = windowSlice.actions;

export default windowSlice.reducer;
