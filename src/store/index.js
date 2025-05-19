import { configureStore } from '@reduxjs/toolkit';
import windowReducer from './slices/windowSlice';
import contextMenuReducer from './slices/contextMenuSlice';
import languageReducer from './slices/settingsSlice';
import iconReducer from './slices/desktopIconSlice';
import settingsReducer from './slices/settingsSlice'

const logger = (store) => (next) => (action) => {
  console.log('%c[Middleware] Dispatching:', 'color: cyan', action);
  const result = next(action);
  console.log('%c[Middleware] New State:', 'color: lime', store.getState());
  return result;
};

const store = configureStore({
  reducer: {
    window: windowReducer,
    contextMenu: contextMenuReducer,
    language: languageReducer,
    icon: iconReducer,
    settings: settingsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
