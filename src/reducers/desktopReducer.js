const browserLanguage = navigator.language || navigator.userLanguage;
const supportedLanguages = ['en-US', 'pt-BR'];
const defaultLanguage = supportedLanguages.includes(browserLanguage.split('-')[0]) ? browserLanguage : 'ENG';


export const initialState = {
  focus: null,
  opened: [],
  minimized: [],
  hidden: [],
  maximized: [],
  zIndex: {},
  history: [],
  language: defaultLanguage.includes('pt' || 'POR') ? 'POR' : 'ENG',
  contextMenu: { show: false, x: 0, y: 0, target: null },

};

export function desktopReducer(state, action) {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload
      };
    case "FOCUS_WINDOW":
      return {
        ...state,
        focus: action.payload,
        minimized: !state.minimized.includes(action.payload)
          ? state.minimized.filter(id => id !== action.payload)
          : [...state.minimized, action.payload],
        zIndex: { ...state.zIndex, [action.payload]: Math.max(...Object.values(state.zIndex), 0) + 1 }
      };

    case "RESET_FOCUS":
      return {
        ...state,
        focus: null,
        contextMenu: { show: false, x: 0, y: 0, type: null, target: null }
      };
    case "OPEN_WINDOW":
      return {
        ...state,
        opened: state.opened.includes(action.payload)
          ? [...state.opened]
          : [...state.opened, action.payload],
        minimized: state.minimized.includes(action.payload)
          ? state.minimized.filter(id => id !== action.payload)
          : [...state.minimized],
        focus: action.payload.id,
        history: (() => {
          const filteredHistory = state.history.filter(item => item !== action.payload);
          const newHistory = [action.payload, ...filteredHistory];
          return newHistory.slice(0, 8);
        })()
      };
    case "CLOSE_WINDOW":
      return {
        ...state,
        opened: state.opened.filter(id => id !== action.payload),
        hidden: [...state.hidden, action.payload],
        focus: state.focus === action.payload ? null : state.focus
      };
    case "MINIMIZE_WINDOW":
      return {
        ...state,
        minimized: state.minimized.includes(action.payload)
          ? state.minimized.filter(id => id !== action.payload)
          : [...state.minimized, action.payload],
        focus: state.minimized.includes(action.payload) ? action.payload : null
      };
    case "MAXIMIZE_WINDOW":
      return {
        ...state,
        maximized: state.maximized.includes(action.payload)
          ? state.maximized.filter(id => id !== action.payload)
          : [...state.maximized, action.payload]
      };
    case "SHOW_CONTEXT_MENU":
      return {
        ...state,
        contextMenu: { ...action.payload, show: true }
      };
    case "HIDE_CONTEXT_MENU":
      return {
        ...state,
        contextMenu: { show: false, x: 0, y: 0, type: null, target: null }
      };
    case "CLICK_OUTSIDE":
      return {
        ...state,
        contextMenu: { show: false, x: 0, y: 0, type: null, target: null }
      };
    default:
      return state;
  }
}