// Slice

import User from '@/store/utils/db.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileNode } from '../file';
import { loadUser } from '@store/actions';
import { remove } from 'dexie';

type UserSliceState = {
  users: User[];
};

const usersInitialState: User[] = [
  {
    id: 1,
    name: 'Admin',
    config: {
      apps: [''],
      window: {
        openedWindowList: [],
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
          preset: 'custom',
          custom: {
            brightness: 0.9,
            contrast: 1,
            saturation: 0.9,
            grayscale: 0,
            hue: 0,
            blur: 0.5,
            invert: 0,
            sepia: 0,
          },
          values: {
            brightness: 1,
            contrast: 1,
            saturation: 1,
            grayscale: 0,
            hue: 0,
            blur: 0,
            invert: 0,
            sepia: 0,
          },
        },
        desktopBackgroundImage: '',
        isBackgroundImage: false,
      },
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
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },

    loadUsers: (state, action) => {
      state.users = action.payload;
    },

    updateUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      state.users[userIndex] = action.payload;
    },

    removeUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload
      );
      state.users.splice(userIndex, 1);
    },
  },
});

export const { addUser, loadUsers, updateUser, removeUser } = fileSlice.actions;
export default fileSlice.reducer;
