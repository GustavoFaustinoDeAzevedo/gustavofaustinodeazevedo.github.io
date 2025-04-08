import { useMemo } from 'react';
import Window from '../components/Window';
import {
  focusWindow,
  resetFocus,
  minimizeWindow,
  maximizeWindow,
  closeWindow,
} from '../actions/windowActions';

export const useWindowsList = ({ state, dispatch, desktopIconsData, desktopRef }) => {
  return useMemo(
    () =>
      desktopIconsData.map(({ id, title }, index) => {
        if (id === 'new' || id === 'placeholder') return null;
        return (
          <Window
            key={`window-${id}-${index}`}
            id={id}
            desktopRef={desktopRef}
            title={state.language.includes('POR') ? title.por : title.eng}
            isFocused={state.focus === id}
            isMinimized={state.minimized.includes(id)}
            isMaximized={state.maximized.includes(id)}
            isOpen={state.opened.includes(id)}
            zIndex={state.zIndex[id] || 0}
            language={state.language}
            onFocus={() => focusWindow(dispatch, id)}
            onUnfocus={() => resetFocus(dispatch)}
            onMinimize={() => minimizeWindow(dispatch, id)}
            onMaximize={() => maximizeWindow(dispatch, id)}
            onClose={() => closeWindow(dispatch, id)}
          />
        );
      }),
    [desktopIconsData, state, desktopRef, dispatch]
  );
};
