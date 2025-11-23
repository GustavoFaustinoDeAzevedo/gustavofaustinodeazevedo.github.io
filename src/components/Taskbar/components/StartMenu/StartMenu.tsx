import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import useClickOutside from '@/shared/hooks/useClickOutside';
import actions from '@/store/actions';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { StylesConfig } from '@/components/FilesExplorer/components/SystemFile/StyledFileWrapper/fileWrapperStyle';
import { WindowData } from '@/store/actions/useWindowActions';
import { useIsMobile } from '@/shared';
import StartMenuHeader from './StartMenuHeader';
import StartMenuMain from './StartMenuMain';
import StartMenuFooter from './StartMenuFooter';
import StartMenuToggler from './StartMenuToggler';

const StartMenu = () => {
  // Refs =========================================================

  const startMenuRef = useRef(null);
  const startButtonRef = useRef<HTMLElement | null>(null);

  // States =========================================================

  const [menuVisibility, setMenuVisibility] = useState(false);
  const [searchAppValue, setSearchAppValue] = useState('');

  // actions =========================================================

  const { handleOpenWindow } = actions.useWindowActions();

  // Redux =========================================================

  const { history } = useSelector((state: RootState) => state.window);
  const { language } = useSelector((state: RootState) => state.settings);
  const { instaledApps } = useSelector((state: RootState) => state.file);

  // Hooks =========================================================

  const isMobile = useIsMobile();

  // Estilos dos arquivos =========================================================

  const stylesConfig: StylesConfig = useMemo(
    () => ({
      $direction: 'horizontal',
      $size: '',
      $fontSize: '0.8rem',
      $fontWeight: 'normal',
      $iconSize: '2rem',
      $color: 'var(--color-text)',
      $backgroundColor: { default: 'transparent', hover: '#ffffff1a' },
      $borderRadius: '0rem',
      $togglers: {
        enableFilter: false,
        enableShadow: false,
        enableBorder: true,
        enableTextShadow: true,
        enableBorderRadius: true,
        enableTransform: false,
        enableSmoothTransition: true,
      },
    }),
    []
  );

  // Animações ==================================================================

  useEffect(() => {
    if (!startMenuRef.current) return;
    if (menuVisibility) {
      gsap.to(startMenuRef.current, {
        y: '0',
        ease: 'power2.out',
        duration: '0.2',
      });
    } else {
      gsap.to(startMenuRef.current, {
        y: isMobile ? '-100%' : '100%',
        ease: 'power2.in',
        duration: '0.2',
      });
    }
  }, [isMobile, menuVisibility]);

  // Tratamento do click fora do menu ============================================

  useClickOutside({
    mainRef: startMenuRef,
    onClickOutside: () => {
      setMenuVisibility((prev: boolean) => (prev = !menuVisibility));
    },
    isActive: menuVisibility,
    extraRef: startButtonRef as React.RefObject<HTMLElement>,
  });

  // Handlers ====================================================================

  const handleToggleVisibility = () => {
    setMenuVisibility((prev: boolean) => (prev = !menuVisibility));
  };

  const handleOpenHistoryApp = (appProps: WindowData) => {
    handleOpenWindow(appProps);
    setMenuVisibility((prev: boolean) => (prev = !menuVisibility));
  };

  const handleSearchAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAppValue(e.target.value);
  };

  const handleSearchAppBlur = () => {
    setSearchAppValue((prev) => prev.trimEnd());
  };

  const handleCleanInput = () => setSearchAppValue('');

  // Render =====================================================================

  return useMemo(
    () => (
      <div className={'start-menu'}>
        <StartMenuToggler
          language={language}
          menuVisibility={menuVisibility}
          handleToggleVisibility={handleToggleVisibility}
        />

        <div
          className={
            isMobile ? 'start-menu__container--mobile' : 'start-menu__container'
          }
        >
          <aside ref={startMenuRef} className="start-menu__wrapper">
            <StartMenuHeader
              searchAppValue={searchAppValue}
              handleCleanInput={handleCleanInput}
              handleSearchAppChange={handleSearchAppChange}
              handleSearchAppBlur={handleSearchAppBlur}
              language={language}
            />
            <StartMenuMain
              language={language}
              installedApps={instaledApps}
              history={history}
              handleToggleVisibility={handleToggleVisibility}
              handleOpenHistoryApp={handleOpenHistoryApp}
              searchAppValue={searchAppValue}
              fileWrapperStyle={stylesConfig}
            />

            <StartMenuFooter />
          </aside>
        </div>
      </div>
    ),
    [
      history,
      language,
      menuVisibility,
      startButtonRef,
      startMenuRef,
      stylesConfig,
      instaledApps,
      handleToggleVisibility,
      handleOpenHistoryApp,
    ]
  );
};

export default StartMenu;
