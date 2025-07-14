import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Type definitions

// Supported languages
export type Language = 'eng' | 'por';

// Shape of theme settings payload for background change
export interface BackgroundPayload {
  backgroundColor?: string;
  iconColor?: string;
  backgroundImage?: string;
}

// State interface for the settings slice
export interface SettingsState {
  language: Language;
  desktopBackgroundColor: string;
  desktopIconColor: string;
  desktopBackgroundImage: string;
}

// 2. Determine default language based on browser navigator
const navigatorLanguage =
  (typeof navigator !== 'undefined' && navigator.language) || 'en-US';

// If the browser locale starts with 'pt', use Portuguese; otherwise English
const defaultLanguage: Language = navigatorLanguage.startsWith('pt')
  ? 'por'
  : 'eng';

// Determine default background color based on default color
const defaultBackgroundColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--c-desktop-default-bg')
  .trim();

// 3. Initial state
const initialState: SettingsState = {
  language: defaultLanguage,
  desktopBackgroundColor: defaultBackgroundColor,
  desktopIconColor: '255, 255, 255',
  desktopBackgroundImage: 'none',
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
      const { backgroundColor, iconColor, backgroundImage } = action.payload;

      if (backgroundColor !== undefined) {
        state.desktopBackgroundColor = backgroundColor;
      }
      if (iconColor !== undefined) {
        state.desktopIconColor = iconColor;
      }
      if (backgroundImage !== undefined) {
        state.desktopBackgroundImage = backgroundImage;
      }
    },
  },
});

// 5. Exports
export const { changeLanguage, changeBackground } = settingsSlice.actions;
export default settingsSlice.reducer;
