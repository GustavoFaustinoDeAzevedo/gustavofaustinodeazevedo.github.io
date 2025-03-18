const browserLanguage = navigator.language || navigator.userLanguage;
const supportedLanguages = ['en-US', 'pt-BR'];
const defaultLanguage = supportedLanguages.includes(browserLanguage.split('-')[0]) ? browserLanguage : 'ENG';

export const initialState = {
  active: null,
  opened: [],
  minimized: [],
  hidden: [],
  maximized: [],
  zIndex: {},
  language: defaultLanguage.includes('pt' || 'POR') ? 'POR' : 'ENG',
  contextMenu: { show: false, x: 0, y: 0, type: null, target: null }
};

export function windowReducer(state, action) {
  switch (action.type) {
    case "LANGUAGE":
      return {
        ...state,
        language: action.payload
      }
    case "FOCUS_WINDOW":
      return {
        ...state,
        active: action.payload,
        zIndex: { ...state.zIndex, [action.payload]: Math.max(...Object.values(state.zIndex), 0) + 1 }
      };

    case "OPEN_WINDOW":
      return { ...state, opened: [...state.opened, action.payload], active: action.payload };

    case "CLOSE_WINDOW":
      return {
        ...state,
        opened: state.opened.filter(id => id !== action.payload),
        hidden: [...state.hidden, action.payload],
        active: state.active === action.payload ? null : state.active
      };

    case "MINIMIZE_WINDOW":
      return {
        ...state,
        minimized: state.minimized.includes(action.payload)
          ? state.minimized.filter(id => id !== action.payload)
          : [...state.minimized, action.payload]
      };

    case "MAXIMIZE_WINDOW":
      return {
        ...state,
        maximized: state.maximized.includes(action.payload)
          ? state.maximized.filter(id => id !== action.payload)
          : [...state.maximized, action.payload]
      };

    case "SHOW_CONTEXT_MENU":
      return { ...state, contextMenu: { ...action.payload, show: true } };

    case "HIDE_CONTEXT_MENU":
      return { ...state, contextMenu: { show: false, x: 0, y: 0, type: null, target: null } };

    default:
      return state;
  }
}