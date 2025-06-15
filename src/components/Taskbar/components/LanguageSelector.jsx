import React, { useEffect, useRef, useState } from 'react';
import toggleOpenMenuAnimation from '../../../animations/elementTransitions';
import useClickOutside from '../../../hooks/useClickOutside';
import gsap from 'gsap';

const LanguageSelector = ({ language, onChangeLanguage }) => {
  const languageSelectorRef = useRef(null);
  const languageButtonRef = useRef(null);
  const [languageSelectorVisibility, setLanguageSelectorVisibility] =
    useState(false);

  useEffect(() => {
    if (!languageSelectorRef.current) return;
    if (languageSelectorVisibility) {
      gsap.to(languageSelectorRef.current, {
        y: '0',
        ease: 'power2.out',
        duration: '0.2',
      });
    } else {
      gsap.to(languageSelectorRef.current, {
        y: '100%',
        ease: 'power2.in',
        duration: '0.2',
      });
    }
  }, [languageSelectorVisibility]);

  useClickOutside(
    languageSelectorRef,
    () =>
      setLanguageSelectorVisibility(
        (prev) => (prev = !languageSelectorVisibility)
      ),
    languageSelectorVisibility,
    languageButtonRef
  );

  const handleOpenClick = () => {
    setLanguageSelectorVisibility(
      (prev) => (prev = !languageSelectorVisibility)
    );
  };

  return (
    <section className="language">
      <button
        ref={languageButtonRef}
        className="language-button"
        onClick={handleOpenClick}
        aria-label={language !== 'POR' ? 'Select language' : 'Mudar idioma'}
        title={language !== 'POR' ? 'Select language' : 'Mudar idioma'}
      >
        {language === 'ENG' ? 'ENG' : 'POR'}
      </button>
      <div className="language-list-container">
        <ul ref={languageSelectorRef} className="language-list">
          <li
            onClick={(e) => onChangeLanguage(e.target.dataset.lang)}
            data-lang={'ENG'}
            className={language === 'ENG' ? 'enabled' : ''}
            aria-label={language !== 'POR' ? 'English-US' : 'Inglês-US'}
          >
            {language !== 'POR' ? 'English-US' : 'Inglês-US'}
          </li>
          <li
            onClick={(e) => onChangeLanguage(e.target.dataset.lang)}
            data-lang={'POR'}
            className={language === 'POR' ? 'enabled' : ''}
            aria-label={language !== 'POR' ? 'Portuguese-BR' : 'Português-BR'}
          >
            {language !== 'POR' ? 'Portuguese-BR' : 'Português-BR'}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LanguageSelector;
