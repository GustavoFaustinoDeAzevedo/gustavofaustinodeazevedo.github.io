import { createSlice } from '@reduxjs/toolkit';

const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState: {
    visible: false,
    position: { x: 0, y: 0 },
    target: null,
    element: null,
  },
  reducers: {
    showContextMenu: (state, action) => {
      state.visible = true;
      state.position = { x: action.payload.x, y: action.payload.y };
      state.target = action.payload.target;
      state.element = action.payload.element;
    },
    hideContextMenu: (state) => {
      state.visible = false;
      state.position = { x: 0, y: 0 };
      state.target = null;
      state.element = null;
    },
  },
});

export const { showContextMenu, hideContextMenu } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
