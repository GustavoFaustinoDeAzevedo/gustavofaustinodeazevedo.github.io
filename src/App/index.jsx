import React, { useCallback } from 'react';
import { RefsProvider } from '../contexts/RefsContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDesktop } from '../hooks/useDesktop';
import { changeLanguage, hideContextMenu } from '../actions/windowActions';

import { useDisableRightClick } from './useDisableRightClick';
import { useTaskbarProps } from './useTaskbarProps';
import { useWindowsList } from './useWindowsList';
import { useDesktopIconsList } from './useDesktopIconsList';
import { useItemsHandler } from './useItemsHandler';
import { useHandleContextMenu } from './useHandleContextMenu';

import Background from '../components/Background';
import Taskbar from '../components/Taskbar';
import ContextMenu from '../components/ContextMenu';

gsap.registerPlugin(useGSAP);

const App = () => {
  const { state, dispatch, desktopRef } = useDesktop();
  const desktopIconsData = state.desktopIcons.desktopIconsData;

  useDisableRightClick();

  const handleChangeLanguage = useCallback(() => {
    changeLanguage(dispatch, state.language.includes('POR') ? 'ENG' : 'POR');
  }, [dispatch, state.language]);

  const taskbarProps = useTaskbarProps({
    state,
    dispatch,
    handleChangeLanguage,
  });
  const windowsStack = useWindowsList({
    state,
    dispatch,
    desktopIconsData,
    desktopRef,
  });
  const desktopIconsStack = useDesktopIconsList({
    desktopIconsData,
    state,
    dispatch,
  });
  const itemsHandler = useItemsHandler(state);
  const handleContextMenu = useHandleContextMenu(dispatch);

  return (
    <div className="desktop" ref={desktopRef}>
      <Background
        state={state}
        dispatch={dispatch}
        onContextMenu={handleContextMenu}
      />
      <RefsProvider>
        <div className="desktop-icons-wrapper related-background">
          {desktopIconsStack}
        </div>
        {windowsStack}
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
      </RefsProvider>
    </div>
  );
};

export default React.memo(App);
