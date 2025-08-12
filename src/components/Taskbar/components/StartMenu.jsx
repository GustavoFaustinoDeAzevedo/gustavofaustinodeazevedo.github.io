import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useClickOutside from '../../../hooks/useClickOutside';
const StartMenu = ({
  toggleMenuVisibility,
  isVisible,
  history,
  language,
  onClick,
}) => {
  const startMenuRef = useRef(null);
  const startButtonRef = useRef(null);
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
    extraRef: startButtonRef,
  });

  const handleClick = () => {
    setMenuVisibility((prev) => (prev = !menuVisibility));
  };

  return (
    <div className="start-menu">
      <button
        ref={startButtonRef}
        title={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
        className="start-button"
        onClick={handleClick}
        aria-label={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
      >
        <i className="icon window-icon"></i>
      </button>

      <section className="start-menu-container">
        <div ref={startMenuRef} className="start-menu-content">
          <div className="input-container">
            <img className="icon search"></img>
            <input
              className="start-menu-search-file-input"
              tabIndex="-1"
              type="text"
              aria-label="Start menu search file input"
            />
          </div>
          <section className="search-content">{/* Search Content */}</section>
          <fieldset className="history-container">
            <legend>History:</legend>
            <ul className="start-menu-history">
              {history.map((id, index) => {
                return (
                  <li key={`history-${id[language] + '-' + index}`}>
                    {id[language]}
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
