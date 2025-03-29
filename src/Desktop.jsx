import React, { useEffect, useReducer } from 'react';
import gsap from 'gsap';
import { RefsProvider } from './contexts/RefsContext';
import { useGSAP } from '@gsap/react';
import { useDesktop } from './hooks/useDesktop';
import { desktopIconsData } from './data/desktopIconsData';
import { getDesktopIconProps } from './utils/desktopIconsProps';
import { contextMenuData } from './data/contextMenuData';
import {
  focusWindow,
  minimizeWindow,
  closeWindow,
  showContextMenu,
  hideContextMenu,
  maximizeWindow,
  changeLanguage,
  resetFocus,
} from './actions/windowActions';

import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import { Taskbar } from './components/Taskbar';
import ContextMenu from './components/ContextMenu';

gsap.registerPlugin(useGSAP);

const Desktop = () => {
  const { state, dispatch, desktopRef } = useDesktop();

  useEffect(() => {
    // Disable right-click on elements without the class "enable-context"

    const disableRightClick = (e) => {
      if (!e.target.closest('enable-context')) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    return () => document.removeEventListener('contextmenu', disableRightClick);
  }, []);

  useGSAP(() => {
    gsap.from('.desktop-icon', {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  const languageHandler = (language) => {
    if (language.includes('POR')) return 'ENG';
    return 'POR';
  };

  const minimizeHandler = (id) => {
    minimizeWindow(dispatch, id);
  };

  const taskbarProps = {
    className: 'enable-context',
    desktopIconsData,
    focusedWindow: state.focus,
    openedWindows: state.opened,
    minimizedWindows: state.minimized,
    history: state.history,
    language: state.language,
    onChangeLanguage: () =>
      changeLanguage(dispatch, languageHandler(state.language)),
    onWindowMinimize: (id) => minimizeWindow(dispatch, id),
    onWindowRestore: (id) => minimizeWindow(dispatch, id),
  };

  const itemsHandler = () => {
    const { target } = state.contextMenu;
    const finalTarget = target?.closest?.('.parent');
    const dataInfo = finalTarget?.dataset?.info
      ? JSON.parse(finalTarget.dataset.info)
      : {};
    const targetContextId = dataInfo?.targetContextId || 'default';

    const firstScope = contextMenuData.find(
      (data) => data.targetContextId === targetContextId
    );
    if (firstScope) return firstScope?.actions || [];
    return contextMenuData[0]?.actions || [];
  };

  return (
    <RefsProvider>
      <div
        className="desktop enable-context"
        ref={desktopRef}
        onContextMenu={(e) => {
          if (e.target) {
            showContextMenu(
              dispatch,
              e.clientX,
              e.clientY,
              e.target.closest('.parent') || 'default',
              e
            );
          }
        }}
      >
        <div className="desktop-icons">
          {desktopIconsData.map(({ id, title, icon }) => (
            <DesktopIcon
              key={id}
              {...getDesktopIconProps(state, dispatch, id, title, icon)}
            />
          ))}
        </div>

        {desktopIconsData.map(({ id, title }) => {
          const windowProps = {
            id,
            desktopRef,
            title: state.language.includes('POR') ? title.por : title.eng,
            isFocused: state.focus === id,
            isMinimized: state.minimized.includes(id),
            isMaximized: state.maximized.includes(id),
            isOpen: state.opened.includes(id),
            zIndex: state.zIndex[id] || 0,
            language: state.language,
            onFocus: () => focusWindow(dispatch, id),
            onUnfocus: () => resetFocus(dispatch),
            onMinimize: () => minimizeHandler(id),
            onMaximize: () => maximizeWindow(dispatch, id),
            onClose: () => closeWindow(dispatch, id),
          };

          return <Window key={id} {...windowProps} />;
        })}

        <Taskbar {...taskbarProps} />

        {state.contextMenu.show && (
          <ContextMenu
            {...state.contextMenu}
            state={state}
            dispatch={dispatch}
            language={state.language}
            items={itemsHandler()}
            onClose={() => hideContextMenu(dispatch)}
          />
        )}
      </div>
    </RefsProvider>
  );
};

export default Desktop;
