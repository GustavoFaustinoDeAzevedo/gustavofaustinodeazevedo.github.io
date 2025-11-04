import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useClickOutside from '@/shared/hooks/useClickOutside';
import { Language } from '@/store/slices/settings';
import { Title } from '@/store/slices/window';
import Icon from '@/components/ui/GlobalStyles/components/Icon';
import actions from '@/store/actions';

const StartMenu = ({
  history,
  language,
}: {
  history: Title[];
  language: Language;
}) => {
  const startMenuRef = useRef(null);
  const startButtonRef = useRef<HTMLElement | null>(null);
  const [menuVisibility, setMenuVisibility] = useState(false);

  const { handleOpenWindow } = actions.useWindowActions();

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
    onClickOutside: () => setMenuVisibility((prev) => (prev = !menuVisibility)),
    isActive: menuVisibility,
    extraRef: startButtonRef as React.RefObject<HTMLElement>,
  });

  const handleClick = () => {
    setMenuVisibility((prev) => (prev = !menuVisibility));
  };

  return (
    <div className="start-menu">
      <button
        ref={startButtonRef as React.RefObject<HTMLButtonElement>}
        title={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
        className={`start-menu__toggler ${menuVisibility ? 'visible' : ''}`}
        onClick={handleClick}
        aria-label={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
        type="button"
      >
        <Icon className="start-menu__toggler-icon" variant="menu-hamburguer" />
      </button>

      <section className="start-menu__container">
        <div ref={startMenuRef} className="start-menu__content">
          {/* <div className="start-menu__search-file-input-container">
            <Icon className="start-menu__search-file-icon" variant="search" />
            <input
              className="start-menu__search-file-input"
              tabIndex={-1}
              type="text"
              aria-label="Start menu search file input"
            />
          </div> */}
          <section className="start-menu__search-content">
            {/* Search Content */}
          </section>
          <fieldset className="start-menu__history-container">
            <legend>{language !== 'por' ? 'History' : 'Histórico'}</legend>
            <ul className="start-menu__history">
              {history?.map((value: Title, index: number) => {
                const key =
                  value[language as keyof typeof value] || String(index);
                return (
                  <li
                    className="start-menu__history-item"
                    key={key as string}
                    onClick={() => handleOpenWindow(value.reopenProps || value)}
                  >
                    <Icon
                      className="start-menu__history-item-icon"
                      variant={value.icon}
                    />
                    <p>{value[language as keyof typeof value] as string}</p>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </div>
      </section>
    </div>
  );
};

export default StartMenu;
