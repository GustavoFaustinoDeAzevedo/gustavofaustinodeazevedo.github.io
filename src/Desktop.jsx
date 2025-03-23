import React, { useEffect } from 'react';
import gsap from 'gsap';
import { RefsProvider } from './contexts/RefsContext';
import { useGSAP } from '@gsap/react';
import { useDesktop } from './hooks/useDesktop';
import { windows } from './data/windowsData';

import { contextMenuData } from './data/contextMenuData';
import {
  focusWindow,
  openWindow,
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
    windows,
    focusedWindow: state.focus,
    openedWindows: state.opened,
    minimizedWindows: state.minimized,
    language: state.language,
    onChangeLanguage: () =>
      changeLanguage(dispatch, languageHandler(state.language)),
    onWindowMinimize: (id) => minimizeWindow(dispatch, id),
    onWindowRestore: (id) => minimizeWindow(dispatch, id),
  };

  return (
    <RefsProvider>
      <div
        className="desktop enable-context"
        ref={desktopRef}
        onContextMenu={(e) => {
          showContextMenu(dispatch, e.clientX, e.clientY, 'desktop');
        }}
      >
        <div className="desktop-icons">
          {windows.map(({ id, title, icon }) => {
            const isPortuguese = state.language.includes('POR');
            const desktopIconProps = {
              id,
              title: isPortuguese ? title.por : title.eng,
              icon,
              language: state.language,
              onClick: () => {
                if (title.por === 'Novo' || title.por === 'new') {
                  console.log('new');
                } else if (!state.opened.includes(id)) {
                  openWindow(dispatch, id);
                  focusWindow(dispatch, id);
                }
              },
            };

            return <DesktopIcon key={id} {...desktopIconProps} />;
          })}
        </div>

        {windows.map(({ id, title }) => {
          const windowProps = {
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
            language={state.language}
            items={contextMenuData.find(
              (contextMenu) => contextMenu.id === state.contextMenu.target
            )}
            onClose={() => hideContextMenu(dispatch)}
          />
        )}
      </div>
    </RefsProvider>
  );
};

export default Desktop;
