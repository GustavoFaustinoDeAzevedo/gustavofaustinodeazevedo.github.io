import {
  focusWindow,
  minimizeWindow,
  closeWindow,
  maximizeWindow,
  resetFocus,
} from '../actions/windowActions';

// Generate props for a Window component
export const getWindowProps = ({ state, dispatch, id, title, desktopRef }) => {
  ({
    id,
    desktopRef,
    title: state.language.includes('POR') ? title.por : title.eng,
    isFocused: state.focus === id,
    isMinimized: state.minimized.includes(id),
    isMaximized: state.maximized.includes(id),
    isOpen: state.opened.includes(id),
    zIndex: state.zIndex[id] || 0,
    onFocus: () => focusWindow(dispatch, id),
    onUnfocus: () => resetFocus(dispatch),
    onMinimize: () => minimizeWindow(dispatch, id),
    onMaximize: () => maximizeWindow(dispatch, id),
    onClose: () => closeWindow(dispatch, id),
  });
};
