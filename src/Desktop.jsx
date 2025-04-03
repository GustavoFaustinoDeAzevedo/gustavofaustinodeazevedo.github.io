import React, { useCallback, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { RefsProvider } from './contexts/RefsContext';
import { useGSAP } from '@gsap/react';
import { useDesktop } from './hooks/useDesktop';
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

// Registra o plugin GSAP (necessário para alguns hooks ou animações customizadas)
gsap.registerPlugin(useGSAP);

const Desktop = () => {
  const { state, dispatch, desktopRef } = useDesktop();
  const desktopIconsData = state.desktopIcons.desktopIconsData;

  // 1. useEffect para desabilitar o clique direito
  useEffect(() => {
    const disableRightClick = (e) => {
      // Aqui adicionamos o ponto para buscar pela classe, garantindo que a verificação seja correta
      if (!e.target.closest('.enable-context')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', disableRightClick);
    return () => document.removeEventListener('contextmenu', disableRightClick);
  }, []); // vazio: roda apenas uma vez

  // 2. Animação GSAP – useGSAP executa a animação apenas uma vez, se o array de dependência for vazio
  useGSAP(() => {
    gsap.from('.desktop-icon', {
      duration: 0.5,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, []);

  // 3. Função para alternar idioma, memorizada para estabilidade de referência
  const languageHandler = useCallback((currentLanguage) => {
    return currentLanguage.includes('POR') ? 'ENG' : 'POR';
  }, []);

  // 4. Handler para mudança de idioma, memorizado com dependências relevantes
  const handleChangeLanguage = useCallback(() => {
    changeLanguage(dispatch, languageHandler(state.language));
  }, [dispatch, state.language, languageHandler]);

  // 5. Criação de props para o Taskbar, memorizados para evitar nova criação a cada render
  const taskbarProps = useMemo(
    () => ({
      className: 'enable-context',
      desktopIconsData,
      focusedWindow: state.focus,
      openedWindows: state.opened,
      minimizedWindows: state.minimized,
      history: state.history,
      language: state.language,
      onChangeLanguage: handleChangeLanguage,
      onWindowMinimize: (id) => minimizeWindow(dispatch, id),
      onWindowRestore: (id) => minimizeWindow(dispatch, id),
    }),
    [
      desktopIconsData,
      state.focus,
      state.opened,
      state.minimized,
      state.history,
      state.language,
      dispatch,
      handleChangeLanguage,
    ]
  );

  // 6. Handler para as ações do Context Menu com dependência de state.contextMenu
  const itemsHandler = useCallback(() => {
    const { target } = state.contextMenu;
    const finalTarget = target?.closest?.('.parent');
    const dataInfo = finalTarget?.dataset?.info
      ? JSON.parse(finalTarget.dataset.info)
      : {};
    const targetContextId = dataInfo?.targetContextId || 'default';

    const firstScope = contextMenuData.find(
      (data) => data.targetContextId === targetContextId
    );
    return firstScope
      ? firstScope.actions || []
      : contextMenuData[0]?.actions || [];
  }, [state.contextMenu]);

  // 7. Memoriza a função de contexto para o clique direito no desktop
  const handleContextMenu = useCallback(
    (e) => {
      if (e.target) {
        showContextMenu(
          dispatch,
          e.clientX,
          e.clientY,
          e.target.closest('.parent') || 'default',
          e
        );
      }
    },
    [dispatch]
  );

  // 8. Memoriza o mapeamento dos ícones do desktop
  const desktopIconsList = useMemo(
    () =>
      desktopIconsData.map(({ id, title, icon }, index) => (
        <DesktopIcon
          key={`desktop-icon-${id}-${index}`}
          {...getDesktopIconProps(state, dispatch, id, title, icon)}
        />
      )),
    [desktopIconsData, state, dispatch]
  );

  // 9. Memoriza a renderização das janelas (Windows) – evitando recriação em cada render se os dados não mudarem
  const windowsList = useMemo(
    () =>
      desktopIconsData.map(({ id, title }, index) => {
        // Ignorando itens específicos indicados por "id"
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
    [
      desktopIconsData,
      state.language,
      state.focus,
      state.minimized,
      state.maximized,
      state.opened,
      state.zIndex,
      desktopRef,
      dispatch,
    ]
  );

  return (
    <RefsProvider>
      <div
        className="desktop"
        ref={desktopRef}
        onContextMenu={handleContextMenu}
      >
        <div className="desktop-icons">{desktopIconsList}</div>

        {windowsList}

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
