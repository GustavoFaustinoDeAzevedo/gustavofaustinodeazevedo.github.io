// Slice

import User from '@/store/utils/db.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notepad, Calculator } from '@components/apps';
import { FileNode } from '../file';
import { remove } from 'dexie';
import { Title } from '../window/windowSlice.types';

const usersInitialState: User[] = [
  {
    id: 1,
    name: 'Admin',
    config: {
      apps: [],
      permission: 'admin',
      store: {
        window: {
          openedWindows: {},
          focusedWindow: null,
          history: [''],
        },
        settings: {
          language: 'por',
          isDoubleClick: true,
          isMobile: false,
          isDataPersistent: true,
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
        userFolders: [
          {
            fileId: 'desktop',
            contentKey: 'desktop',
            title: { eng: 'Desktop', por: 'Área de Trabalho' },
            icon: 'folder',
            type: 'folder',
            content: [
              {
                fileId: 'about',
                contentKey: 'about',
                title: { eng: 'About Me', por: 'Sobre Mim' },
                icon: 'about',
                type: 'app',
              },
              {
                fileId: 'skills',
                contentKey: 'skills',
                title: { eng: 'My Skills', por: 'Minhas Habilidades' },
                icon: 'skills',
                type: 'app',
              },
              {
                fileId: 'contact',
                contentKey: 'contact',
                title: { eng: 'Contact', por: 'Contato' },
                icon: 'business-card-icon',
                type: 'app',
              },
              {
                fileId: 'sendMessage',
                contentKey: 'sendMessage',
                title: { eng: 'Send Message', por: 'Enviar Mensagem' },
                icon: 'contact',
                type: 'app',
                initialDimensions: { width: '490px', height: '620px' },
              },
              {
                fileId: 'backgroundPreferences',
                contentKey: 'backgroundPreferences',
                title: {
                  eng: 'Background Preferences',
                  por: 'Preferências de Fundo',
                },
                icon: 'image-outline-icon',
                type: 'app',
              },
              {
                fileId: 'devMenu',
                contentKey: 'devMenu',
                title: { eng: 'Dev Menu', por: 'Menu de Desenvolvedor' },
                icon: '',
                type: 'app',
                hidden: true,
              },
              {
                fileId: 'tests',
                contentKey: 'tests',
                title: { eng: 'Tests', por: 'Testes' },
                icon: '',
                type: 'app',
              },
            ],
          },
          {
            fileId: 'documents',
            title: { eng: 'Documents', por: 'Documentos' },
            icon: 'folder',
            type: 'folder',
            content: [],
          },
          {
            fileId: 'downloads',
            title: { eng: 'Downloads', por: 'Downloads' },
            icon: 'folder',
            type: 'folder',
            content: [],
          },
          {
            fileId: 'music',
            title: { eng: 'Music', por: 'Música' },
            icon: 'folder',
            type: 'folder',
            content: [],
          },
          {
            fileId: 'pictures',
            title: { eng: 'Pictures', por: 'Imagens' },
            icon: 'folder',
            type: 'folder',
            content: [],
          },
          {
            fileId: 'videos',
            title: { eng: 'Videos', por: 'Vídeos' },
            icon: 'folder',
            type: 'folder',
            content: [],
          },
        ],

        appsConfig: {},
      },
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

const initialState = {
  users: usersInitialState,
  currentUser: usersInitialState[0],
};

export const userSlice = createSlice({
  name: 'user',
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
        (user) => user.id === action.payload.id,
      );
      state.users[userIndex] = action.payload;
    },

    removeUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload,
      );
      state.users.splice(userIndex, 1);
    },
  },
});

export const { addUser, loadUsers, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
