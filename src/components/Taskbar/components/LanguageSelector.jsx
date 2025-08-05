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

  useClickOutside({
    mainRef: languageSelectorRef,
    onClickOutside: () =>
      setLanguageSelectorVisibility(
        (prev) => (prev = !languageSelectorVisibility)
      ),
    isActive: languageSelectorVisibility,
    extraRef: languageButtonRef,
  });

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
        aria-label={language !== 'por' ? 'Select language' : 'Mudar idioma'}
        title={language !== 'por' ? 'Select language' : 'Mudar idioma'}
      >
        {language === 'por' ? 'POR' : 'ENG'}
      </button>
      <div className="language-list-container">
        <ul ref={languageSelectorRef} className="language-list">
          <li
            onClick={(e) => onChangeLanguage(e.target.dataset.lang)}
            data-lang={'eng'}
            className={language === 'eng' ? 'enabled' : ''}
            aria-label={language !== 'por' ? 'English-US' : 'Inglês-US'}
          >
            {language !== 'por' ? 'English-US' : 'Inglês-US'}
          </li>
          <li
            onClick={(e) => onChangeLanguage(e.target.dataset.lang)}
            data-lang={'por'}
            className={language === 'por' ? 'enabled' : ''}
            aria-label={language !== 'por' ? 'Portuguese-BR' : 'Português-BR'}
          >
            {language !== 'por' ? 'Portuguese-BR' : 'Português-BR'}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LanguageSelector;
