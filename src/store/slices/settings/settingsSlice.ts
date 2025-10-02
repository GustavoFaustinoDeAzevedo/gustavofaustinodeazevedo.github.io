import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SettingsState,
  Language,
  BackgroundPayload,
} from './settingsSlice.types';
import updateStateIfDefined from '@/store/utils/updateStateIfDefined';

const navigatorLanguage =
  (typeof navigator !== 'undefined' && navigator.language) || 'en-US';

const defaultLanguage: Language = navigatorLanguage.startsWith('pt')
  ? 'por'
  : 'eng';

const defaultBackgroundColor = '#1d1d1d';

const defaultBackgroundColorContrast = '#ffffff';
const defaultFilterValues = {
  brightness: 1,
  contrast: 1,
  saturate: 1,
  grayscale: 0,
  hueRotate: 0,
  blur: 0,
  invert: 0,
  sepia: 0,
};

const initialState: SettingsState = {
  language: defaultLanguage,
  desktopBackgroundDefaultColor: defaultBackgroundColor,
  desktopBackgroundColor: defaultBackgroundColor,
  desktopBackgroundColorContrast: defaultBackgroundColorContrast,
  desktopBackgroundFilter: defaultFilterValues,
  desktopBackgroundEffect: 'diagonal',
  desktopBackgroundImage: '/images/netti_Nu_Nu-cat-6342145_640.jpg',
  isBackgroundImage: true,
  isDoubleClick: true,
};

// Criação do slice
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    changeBackground: (state, action: PayloadAction<BackgroundPayload>) => {
      const {
        desktopBackgroundColor,
        desktopBackgroundColorContrast,
        desktopBackgroundEffect,
        desktopBackgroundImage,
        desktopBackgroundFilter,
        isBackgroundImage,
      } = action.payload;

      Object.assign(state, {
        ...(desktopBackgroundColor !== undefined && {
          desktopBackgroundColor: desktopBackgroundColor,
        }),
        ...(desktopBackgroundColorContrast !== undefined && {
          desktopBackgroundColorContrast: desktopBackgroundColorContrast,
        }),
        ...(desktopBackgroundEffect !== undefined && {
          desktopBackgroundEffect: desktopBackgroundEffect,
        }),
        ...(desktopBackgroundImage !== undefined && {
          desktopBackgroundImage: desktopBackgroundImage,
        }),
        ...(isBackgroundImage !== undefined && {
          isBackgroundImage: isBackgroundImage,
        }),
        ...(desktopBackgroundFilter !== undefined && {
          desktopBackgroundFilter: desktopBackgroundFilter,
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
