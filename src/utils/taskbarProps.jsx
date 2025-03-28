import { changeLanguage, minimizeWindow } from '../actions/windowActions';

// Toggle language between Portuguese and English
const toggleLanguage = (language) => (language.includes('POR') ? 'ENG' : 'POR');

// Generate props for Taskbar component
export const getTaskbarProps = ({ ...props }) => ({
  className: 'enable-context',
  desktopIconsData: props.desktopIconsData,
  focusedWindow: props.focus,
  openedWindows: props.opened,
  minimizedWindows: props.minimized,
  language: props.language,
  history: props.history,
  onChangeLanguage: () =>
    changeLanguage(props.dispatch, toggleLanguage(state.language)),
  onWindowMinimize: (id) => minimizeWindow(dispatch, id),
  onWindowRestore: (id) => minimizeWindow(dispatch, id),
});
