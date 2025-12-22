// Slice

import User from '@/store/utils/db.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileNode } from '../file';

type UserSliceState = {
  users: User[];
};

const usersInitialState: User[] = [
  {
    id: 1,
    name: 'Admin',
    config: {
      window: {
        windowList: [],
        focusedWindow: null,
        history: [],
      },
      settings: {
        language: 'por',
        isDoubleClick: true,
        isMobile: false,
        desktopBackgroundDefaultColor: '#13538A',
        desktopBackgroundColor: '#13538A',
        desktopBackgroundColorContrast: '#ffffff',
        desktopBackgroundEffect: {
          active: 'none',
          angle: 0,
          mirrored: false,
          inverted: false,
        },
        desktopBackgroundFilter: {
          preset: 'Initial',
          values: {
            brightness: 0.9,
            contrast: 1,
            saturation: 0.9,
            grayscale: 0,
            hue: 0,
            blur: 0.5,
            invert: 0,
            sepia: 0,
          },
        },
      },
      apps: {},
      permission: 'admin',
    },
  },
  {
    id: 2,
    name: 'Guests',
    config: {
      window: {},
      settings: {},
      apps: {},
      permission: 'guest',
    },
  },
  {
    id: 3,
    name: 'Gustavo',
    config: {
      window: {},
      settings: {},
      apps: {},
      permission: 'standard',
    },
  },
];

const initialState: UserSliceState = {
  users: usersInitialState,
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{ newUser: User }>) => {
      const { newFileData, currentNode, nodeDepth } = action.payload;
      // updateChildrenById(state.filesList, currentNode, newFileData, nodeDepth);
    },

    removeFile: (state, action: PayloadAction<{ fileId: string }>) => {
      const removeById = (node: FileNode, fileId: string) => {
        node.children = node.children?.filter(
          (child) => child.fileId !== fileId
        );
        node.children?.forEach((child) => removeById(child, fileId));
      };
      removeById(state.filesList, action.payload.fileId);
    },

    sortFiles: (state) => {
      const children = state.filesList.children ?? [];
      state.filesList.children = toggleSort(children, state.sort);
      state.sort = state.sort === 'asc' ? 'desc' : 'asc';
    },
  },
});

export const { addFile, removeFile, sortFiles } = fileSlice.actions;
export default fileSlice.reducer;
