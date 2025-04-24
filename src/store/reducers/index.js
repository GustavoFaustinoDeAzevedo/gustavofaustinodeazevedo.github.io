import { combineReducers } from 'redux';
import { desktopReducer } from './desktopReducer';

const rootReducer = combineReducers({
  desktop: desktopReducer,
});

export default rootReducer;
