import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';
import contextMenuReducer from './slices/contextMenuSlice';
import languageReducer from './slices/settingsSlice';
import iconReducer from './slices/desktopIconSlice';
import settingsReducer from './slices/settingsSlice'

const store = configureStore({
  reducer: {
    window: windowReducer,
    contextMenu: contextMenuReducer, 
    language: languageReducer,   
    icon: iconReducer,  
    settings: settingsReducer         
  },
});

export default store;
