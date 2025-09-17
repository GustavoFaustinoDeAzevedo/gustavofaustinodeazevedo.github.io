import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SettingsState,
  Language,
  BackgroundPayload,
} from './settingsSlice.types';

const navigatorLanguage =
  (typeof navigator !== 'undefined' && navigator.language) || 'en-US';

const defaultLanguage: Language = navigatorLanguage.startsWith('pt')
  ? 'por'
  : 'eng';

const defaultBackgroundColor = '#131021';

const defaultBackgroundColorContrast = '#ffffff';

const initialState: SettingsState = {
  language: defaultLanguage,
  desktopBackgroundColor: defaultBackgroundColor,
  desktopBackgroundColorContrast: defaultBackgroundColorContrast,
  desktopBackgroundEffect: 'diagonal',
  desktopBackgroundImage: '/images/netti_Nu_Nu-cat-6342145_640.jpg',
  isBackgroundImage: true,
  isDoubleClick: true,
};

// 4. Slice creation
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    changeBackground: (state, action: PayloadAction<BackgroundPayload>) => {
      const {
        backgroundColor,
        backgroundColorContrast,
        backgroundEffect,
        backgroundImage,
        isBackgroundImage,
      } = action.payload;

      Object.assign(state, {
        ...(backgroundColor !== undefined && {
          desktopBackgroundColor: backgroundColor,
        }),
        ...(backgroundColorContrast !== undefined && {
          desktopBackgroundColorContrast: backgroundColorContrast,
        }),
        ...(backgroundEffect !== undefined && {
          desktopBackgroundEffect: backgroundEffect,
        }),
        ...(backgroundImage !== undefined && {
          desktopBackgroundImage: backgroundImage,
        }),
        ...(isBackgroundImage !== undefined && {
          isBackgroundImage: isBackgroundImage,
        }),
      });
    },

    changeDoubleCkick: (state, action: PayloadAction<boolean>) => {
      state.isDoubleClick = action.payload;
    },
  },
});

export const { changeLanguage, changeBackground, changeDoubleCkick } =
  settingsSlice.actions;
export default settingsSlice.reducer;
