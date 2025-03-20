import React, { useEffect } from 'react';
import gsap from 'gsap';
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
} from './actions/windowActions';

import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import Taskbar from './components/Taskbar';
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

  const handleLanguage = (language) => {
    if (language.includes('POR')) return 'ENG';
    return 'POR';
  };

  return (
    <div
      className="desktop enable-context"
      ref={desktopRef}
      onContextMenu={(e) => {
        showContextMenu(dispatch, e.clientX, e.clientY, 'desktop');
      }}
    >
      <div className="desktop-icons">
        {windows.map(({ id, title, icon }) => (
          <DesktopIcon
            key={id}
            id={id}
            title={state.language.includes('POR') ? title.por : title.eng}
            icon={icon}
            language={state.language}
            onClick={() => {
              if (title.por === 'Novo' || title.por === 'new') {
                console.log('new');
              } else if (!state.opened.includes(id)) {
                openWindow(dispatch, id);
                focusWindow(dispatch, id);
              }
            }}
          />
        ))}
      </div>

      {windows.map(({ id, title }) => (
        <Window
          key={id}
          id={id}
          title={state.language.includes('POR') ? title.por : title.eng}
          isFocused={state.focus === id}
          isMinimized={state.minimized.includes(id)}
          isMaximized={state.maximized.includes(id)}
          isOpen={state.opened.includes(id)}
          zIndex={state.zIndex[id] || 0}
          onFocus={() => focusWindow(dispatch, id)}
          onUnfocus={() => focusWindow(dispatch, null)}
          onMinimize={() => minimizeWindow(dispatch, id)}
          onMaximize={() => maximizeWindow(dispatch, id)}
          onClose={() => closeWindow(dispatch, id)}
          desktopRef={desktopRef}
        />
      ))}

      <Taskbar
        className={'enable-context'}
        windows={windows}
        focusedWindow={state.focus}
        openedWindows={state.opened}
        minimizedWindows={state.minimized}
        language={state.language}
        onChangeLanguage={() =>
          changeLanguage(dispatch, handleLanguage(state.language))
        }
        onWindowClick={(id) => minimizeWindow(dispatch, id)}
      />

      {state.contextMenu.show && (
        <ContextMenu
          language={state.language}
          x={state.contextMenu.x}
          y={state.contextMenu.y}
          items={contextMenuData.find(
            (contextMenuData) => contextMenuData.id === state.contextMenu.target
          )}
          onClose={() => hideContextMenu(dispatch)}
        />
      )}
    </div>
  );
};

export default Desktop;
