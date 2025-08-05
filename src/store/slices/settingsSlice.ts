import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type definitions

// Supported languages
export type Language = 'eng' | 'por';

// Shape of theme settings payload for background change
export interface BackgroundPayload {
  backgroundColor?: string;
  backgroundColorContrast?: string;
  backgroundEffect?: string;
  backgroundImage?: string;
  isBackgroundImage?: boolean;
}

// State interface for the settings slice
export interface SettingsState {
  language: Language;
  desktopBackgroundColor: string;
  desktopBackgroundColorContrast: string;
  desktopBackgroundEffect: string;
  desktopBackgroundImage: string;
  isBackgroundImage?: boolean;
}

// Determine default language based on browser navigator
const navigatorLanguage =
  (typeof navigator !== 'undefined' && navigator.language) || 'en-US';

// If the browser locale starts with 'pt', use Portuguese; otherwise English
const defaultLanguage: Language = navigatorLanguage.startsWith('pt')
  ? 'por'
  : 'eng';

// Determine default background color based on default color
const defaultBackgroundColor = '#131021';

const defaultBackgroundColorContrast = '#ffffff';

// Initial state
const initialState: SettingsState = {
  language: defaultLanguage,
  desktopBackgroundColor: defaultBackgroundColor,
  desktopBackgroundColorContrast: defaultBackgroundColorContrast,
  desktopBackgroundEffect: 'diagonal',
  desktopBackgroundImage: 'none',
  isBackgroundImage: false,
};

// 4. Slice creation
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    /**
     * Change the UI language code.
     * Payload must be 'eng' or 'por'.
     */
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },

    /**
     * Update desktop background colors and/or image.
     * Only provided values will override current settings.
     */
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
  },
});

export const { changeLanguage, changeBackground } = settingsSlice.actions;
export default settingsSlice.reducer;
