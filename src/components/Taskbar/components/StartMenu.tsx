import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import useClickOutside from '@/shared/hooks/useClickOutside';
import { Title } from '@/store/slices/window';
import Icon from '@/components/ui/GlobalStyles/components/Icon';
import actions from '@/store/actions';
import { ListFiles } from '@/components/FilesExplorer';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { StylesConfig } from '@/components/FilesExplorer/components/SystemFile/StyledFileWrapper/fileWrapperStyle';
import { WindowData } from '@/store/actions/useWindowActions';

const StartMenu = () => {
  const startMenuRef = useRef(null);
  const startButtonRef = useRef<HTMLElement | null>(null);
  const [menuVisibility, setMenuVisibility] = useState(false);

  const { handleOpenWindow } = actions.useWindowActions();

  const { history } = useSelector((state: RootState) => state.window);
  const { language } = useSelector((state: RootState) => state.settings);
  const { instaledApps } = useSelector((state: RootState) => state.file);

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
        y: '100%',
        ease: 'power2.in',
        duration: '0.2',
      });
    }
  }, [menuVisibility]);

  useClickOutside({
    mainRef: startMenuRef,
    onClickOutside: () => {
      setMenuVisibility((prev: boolean) => (prev = !menuVisibility));
    },
    isActive: menuVisibility,
    extraRef: startButtonRef as React.RefObject<HTMLElement>,
  });

  const handleToggleVisibility = () => {
    setMenuVisibility((prev: boolean) => (prev = !menuVisibility));
  };

  const handleOpenHistoryApp = (appProps: WindowData) => {
    handleOpenWindow(appProps);
    setMenuVisibility((prev: boolean) => (prev = !menuVisibility));
  };

  return useMemo(
    () => (
      <div className="start-menu">
        <button
          ref={startButtonRef as React.RefObject<HTMLButtonElement>}
          title={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
          className={`start-menu__toggler ${menuVisibility ? 'visible' : ''}`}
          onClick={handleToggleVisibility}
          aria-label={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
          type="button"
        >
          <Icon
            className="start-menu__toggler-icon"
            variant="menu-hamburguer"
          />
        </button>

        <aside className="start-menu__container">
          <div ref={startMenuRef} className="start-menu__wrapper">
            <header className="start-menu__header">
              <Icon className="start-menu__search-file-icon" variant="search" />
              <input
                className="start-menu__search-file-input"
                tabIndex={-1}
                type="text"
                aria-label={
                  language !== 'por'
                    ? 'Start menu search apps input'
                    : 'Busca na menu de aplicativos'
                }
                placeholder={
                  language !== 'por'
                    ? 'Search for apps and documents'
                    : 'Pesquisar por aplicativos e documentos'
                }
              />
            </header>
            <main className="flex flex-column gap-2">
              <fieldset className="start-menu__fieldset">
                <legend>{language !== 'por' ? 'Apps' : 'Aplicativos'}</legend>
                <ListFiles
                  handleGlobalClick={handleToggleVisibility}
                  currentNode={''}
                  className={'start-menu__list'}
                  openMode={'window'}
                  language={language}
                  children={instaledApps}
                  doubleClickToOpen={false}
                  stylesConfig={stylesConfig}
                />
              </fieldset>

              <fieldset className="start-menu__fieldset">
                <legend>{language !== 'por' ? 'History' : 'Histórico'}</legend>
                <ul className="start-menu__list">
                  {history?.map((value: Title, index: number) => {
                    const key =
                      value[language as keyof typeof value] || String(index);
                    return (
                      <li
                        className="start-menu__list-item"
                        key={key as string}
                        onClick={() =>
                          handleOpenHistoryApp(value.reopenProps as WindowData)
                        }
                      >
                        <Icon
                          className="start-menu__list-item-icon"
                          variant={value.icon}
                        />
                        <p>{value[language as keyof typeof value] as string}</p>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            </main>
            <footer></footer>
          </div>
        </aside>
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
