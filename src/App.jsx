import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDesktop } from './hooks/useDesktop';
import { windows } from './data/windowsData';
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

function App() {
  // Disable right-click on elements without the class "enable-context"
  useEffect(() => {
    // changeLanguage(dispatch, navigator.language || navigator.userLanguage);

    const disableRightClick = (e) => {
      if (!e.target.closest('.enable-context')) {
        // e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    return () => document.removeEventListener('contextmenu', disableRightClick);
  }, []);
  const { state, dispatch, desktopRef } = useDesktop();

  useGSAP(() => {
    gsap.from('.desktop-icon', {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div
      className="desktop"
      ref={desktopRef}
      onContextMenu={(e) => {
        if (!e.target.closest('.window') && !e.target.closest('.taskbar')) {
          showContextMenu(dispatch, e.clientX, e.clientY, 'desktop');
        }
      }}
    >
      <div className="desktop-icons">
        {windows.map(({ id, title, icon }) => (
          <DesktopIcon
            key={id}
            id={id}
            title={title}
            icon={icon}
            onClick={() => {
              if (!state.opened.includes(id)) {
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
          title={title}
          isActive={state.active === id}
          isMinimized={state.minimized.includes(id)}
          isMaximized={state.maximized.includes(id)}
          isOpen={state.opened.includes(id)}
          zIndex={state.zIndex[id] || 0}
          onFocus={() => focusWindow(dispatch, id)}
          onMinimize={() => minimizeWindow(dispatch, id)}
          onMaximize={() => maximizeWindow(dispatch, id)}
          onClose={() => closeWindow(dispatch, id)}
          desktopRef={desktopRef}
        />
      ))}

      <Taskbar
        windows={windows}
        openedWindows={state.opened}
        minimizedWindows={state.minimized}
        language={state.language}
        onChangeLanguage={changeLanguage}
        onWindowClick={(id) => minimizeWindow(dispatch, id)}
      />

      {state.contextMenu.show && (
        <ContextMenu
          x={state.contextMenu.x}
          y={state.contextMenu.y}
          // items={}
          onClose={() => hideContextMenu(dispatch)}
        />
      )}
    </div>
  );
}

export default App;
