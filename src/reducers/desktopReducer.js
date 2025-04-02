import { sortIcons } from "../actions/windowActions";
import { desktopIconsData } from "../data/desktopIconsData";

const browserLanguage = navigator.language || navigator.userLanguage;
const supportedLanguages = ['en-US', 'pt-BR'];
const defaultLanguage = supportedLanguages.includes(browserLanguage) ? browserLanguage : 'ENG';

const getLanguage = (lang) => {
  return lang.startsWith('pt') ? 'POR' : 'ENG';
};

export const initialState = {
  focus: null,
  opened: [],
  minimized: [],
  hidden: [],
  maximized: [],
  zIndex: {},
  history: [],
  language: getLanguage(defaultLanguage),
  contextMenu: { show: false, x: 0, y: 0, target: null, element: null },
  desktopIcons: { desktopIconsData, sort: 'default' }
};


const getNextZIndex = (zIndex, id) => {
  const maxZ = Math.max(0, ...Object.values(zIndex));
  return { ...zIndex, [id]: maxZ + 1 };
};

const updateHistory = (history, id) => {
  const filteredHistory = history.filter(item => item !== id);
  return [id, ...filteredHistory].slice(0, 10);
};

const addIcon = (desktopIcons, iconToBeAdded) => {
  const iconsData = [...desktopIcons.desktopIconsData, iconToBeAdded];
  const lastObject = iconsData.pop();
  const secondLastObject = iconsData.pop();
  iconsData.push(lastObject, secondLastObject);
  return iconsData;
};

const removeIcon = (desktopIconsData, iconToBeRemoved) => {
  return desktopIconsData.filter(icon => icon != iconToBeRemoved);
};

const toggleSort = (desktopIcons) => {
  const sortedIcons = [...desktopIcons.desktopIconsData];
  const lastElement = sortedIcons.pop();

  sortedIcons.sort((a, b) =>
    desktopIcons.sort === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
  );
  sortedIcons.push(lastElement);
  return sortedIcons;
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
        minimized: state.minimized.includes(action.payload)
          ? state.minimized.filter(id => id !== action.payload)
          : [...state.minimized],
        zIndex: getNextZIndex(state.zIndex, action.payload)
      };

    case "RESET_FOCUS":
      return {
        ...state,
        focus: null,
        contextMenu: { show: false, x: 0, y: 0, target: null, element: null }
      };

    case "OPEN_WINDOW":
      return {
        ...state,
        opened: state.opened.includes(action.payload)
          ? [...state.opened]
          : [...state.opened, action.payload],
        minimized: state.minimized.filter(id => id !== action.payload),
        focus: action.payload,
        history: updateHistory(state.history, action.payload)
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
      return {
        ...state,
        contextMenu: { ...action.payload, show: true }
      };
    case "HIDE_CONTEXT_MENU":
      return {
        ...state,
        contextMenu: { show: false, x: 0, y: 0, target: null, element: null }
      };
    case "CLICK_OUTSIDE":
      return {
        ...state,
        contextMenu: { show: false, x: 0, y: 0, target: null, element: null }
      };

    case "ADD_ICON":
      return {
        ...state,
        desktopIcons: {
          desktopIconsData: addIcon(state.desktopIcons, action.payload),
          sort: state.desktopIcons.sort
        }
      };

    case "REMOVE_ICON":
      return {
        ...state,
        desktopIcons: {
          desktopIconsData: removeIcon(state.desktopIcons.desktopIconsData, action.payload),
          sort: state.desktopIcons.sort
        }
      };

    case "SORT_ICONS":
      return {
        ...state,
        desktopIcons: {
          ...state.desktopIcons,
          desktopIconsData: toggleSort(state.desktopIcons),
          sort: state.desktopIcons.sort === "asc" ? "desc" : "asc"
        }
      };

    default:
      return state;
  }
}
