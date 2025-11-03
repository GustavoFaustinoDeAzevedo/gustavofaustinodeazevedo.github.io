import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useClickOutside from '@/shared/hooks/useClickOutside';
import { Language } from '@/store/slices/settings';
import { Title } from '@/store/slices/window';
const StartMenu = ({
  history,
  language,
}: {
  history: Title[];
  language: string;
}) => {
  const startMenuRef = useRef(null);
  const startButtonRef = useRef<HTMLElement | null>(null);
  const [menuVisibility, setMenuVisibility] = useState(false);

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
        className="start-button"
        onClick={handleClick}
        aria-label={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
        type="button"
      >
        <i className="icon window-icon"></i>
      </button>

      <section className="start-menu-container">
        <div ref={startMenuRef} className="start-menu-content">
          <div className="input-container">
            <img className="icon search" alt="🔍"></img>
            <input
              className="start-menu-search-file-input"
              tabIndex={-1}
              type="text"
              aria-label="Start menu search file input"
            />
          </div>
          <section className="search-content">{/* Search Content */}</section>
          <fieldset className="history-container">
            <legend>History:</legend>
            <ul className="start-menu-history">
              {history?.map((value: Title, index: number) => {
                const key =
                  value[language as keyof typeof value] || String(index);
                return (
                  <li key={key as string}>
                    {value[language as keyof typeof value] as string}
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
