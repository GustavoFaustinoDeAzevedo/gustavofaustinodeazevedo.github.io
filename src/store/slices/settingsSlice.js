import { createSlice } from '@reduxjs/toolkit';
import { ChangeBackground } from '../../components/Settings/ChangeBackground/ChangeBackground';

const navigatorLanguage = navigator.language || navigator.userLanguage || 'en-US';
const defaultLanguage = navigatorLanguage.startsWith('pt') ? 'por' : 'eng';



const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    language: defaultLanguage,
    desktopBackgroundColor: '#040014',
    desktopIconColor: '255, 255, 255',
    desktopBackgroundImage: 'none',
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },

    changeBackground: (state, action) => {
      const { backgroundColor, iconColor, backgroundImage } = action.payload;
      state.desktopBackgroundColor = backgroundColor || state.desktopBackgroundColor;
      state.desktopIconColor = iconColor || state.desktopIconColor;
      state.desktopBackgroundImage = backgroundImage || state.desktopBackgroundImage;
    }
  },
});

export const { changeLanguage, changeBackground } = settingsSlice.actions;
export default settingsSlice.reducer;
