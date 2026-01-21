import { configureStore, Middleware } from '@reduxjs/toolkit';
import {
  windowReducer,
  contextMenuReducer,
  filesReducer,
  settingsReducer,
  userReducer,
} from './slices';

const logger: Middleware = (store) => (next) => (action) => {
  console.log('%c[Middleware] Dispatching:', 'color: cyan', action);
  const result = next(action);
  console.log('%c[Middleware] New State:', 'color: lime', store.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    window: windowReducer,
    contextMenu: contextMenuReducer,
    file: filesReducer,
    settings: settingsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
