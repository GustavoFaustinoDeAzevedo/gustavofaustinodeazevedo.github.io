import { createSlice } from '@reduxjs/toolkit';
import { useRef } from 'react';

/**
 * Calculates the next z-index value for a window or retrieves the maximum z-index value.
 *
 * @param {Object} state - The current state containing the list of opened windows.
 * @param {boolean} [getMaxZIndex=false] - If true, returns the maximum z-index value instead of the next one.
 * @returns {number} The next z-index value or the maximum z-index value if `getMaxZIndex` is true.
 */
const getNextZIndex = (state, getMaxZIndex = false) => {
  try {
    const zIndexes = Object.values(state.openedWindowList).map((win) => win.zIndex || 0);
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
        window.isMinimized = false;
      }
    },
    openWindow: (state, action) => {
      const { id, title, icon } = action.payload;
      updateHistory(state.history, id);
      const finalId = `window#${id}#${new Date() * Math.random()}`
      state.openedWindowList = [...state.openedWindowList, {
        id: finalId,
        title: title,
        icon: icon,
        open: true,
        isMaximized: false,
        isMinimized: false,
        zIndex: getNextZIndex(state),
      }];
      state.focusedWindow = finalId;
    },
    closeWindow: (state, action) => {
      state.openedWindowList = state.openedWindowList.filter(win => win.id !== action.payload);
    },

    maximizeWindow: (state, action) => {
      const windowIndex = indexLocator(action.payload, state);
      if (windowIndex !== -1) {
        state.openedWindowList[windowIndex].isMaximized = !state.openedWindowList[windowIndex].isMaximized;
        state.focusedWindow = action.payload;
      }
    },
    minimizeWindow: (state, action) => {
      const windowIndex = indexLocator(action.payload, state);

      if (state.openedWindowList[windowIndex]) {
        state.openedWindowList[windowIndex].isMinimized = true;
      }
    },
    restoreWindow: (state, action) => {
      const windowIndex = indexLocator(action.payload, state);
      if (state.openedWindowList[windowIndex]) {
        state.openedWindowList[windowIndex].isMinimized = false;
        state.focusedWindow = action.payload;
        state.openedWindowList[windowIndex].zIndex = getNextZIndex(state);
      }
    },

    resetFocus: (state) => {
      state.focusedWindow = null;
    },
  },
});

export const {
  focusWindow,
  openWindow,
  closeWindow,
  maximizeWindow,
  minimizeWindow,
  restoreWindow,
  resetFocus,
} = windowSlice.actions;

export default windowSlice.reducer;
