import React, { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../../../../../shared/hooks/useClickOutside';
import gsap from 'gsap';
import { Language } from '@/store/slices/settings';

const LanguageSelector = ({
  language,
  onChangeLanguage,
  isMobile,
}: {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  isMobile: boolean;
}) => {
  const languageSelectorRef = useRef(null);
  const languageButtonRef = useRef<HTMLElement>(null);
  const [languageSelectorVisibility, setLanguageSelectorVisibility] =
    useState(false);

  useEffect(() => {
    if (!languageSelectorRef.current) return;
    if (languageSelectorVisibility) {
      gsap.to(languageSelectorRef.current, {
        display: 'flex',
        duration: '0',
        onComplete: () => {
          gsap.to(languageSelectorRef.current, {
            y: '0px',
            ease: 'power2.out',
            duration: '0.2',
          });
        },
      });
    } else {
      gsap.to(languageSelectorRef.current, {
        y: isMobile ? '-100%' : '100%',
        ease: 'power2.in',
        duration: '0.2',
        onComplete: () => {
          gsap.to(languageSelectorRef.current, {
            display: 'none',
            duration: '0',
          });
        },
      });
    }
  }, [languageSelectorVisibility, isMobile]);

  useClickOutside({
    mainRef: languageSelectorRef,
    onClickOutside: () =>
      setLanguageSelectorVisibility(
        (prev) => (prev = !languageSelectorVisibility),
      ),
    isActive: languageSelectorVisibility,
    extraRef: languageButtonRef as React.RefObject<HTMLElement>,
  });

  const handleOpenClick = () => {
    setLanguageSelectorVisibility(
      (prev) => (prev = !languageSelectorVisibility),
    );
  };

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChangeLanguage((e.target as HTMLInputElement).dataset.lang as Language);

  const languageList = {
    eng: {
      enabled: { eng: 'enabled' },
      title: 'Select language',
      item: {
        eng: 'English-US',
        por: 'Portuguese-BR',
      },
    },
    por: {
      enabled: { por: 'enabled' },
      title: 'Mudar idioma',
      item: {
        eng: 'Inglês-US',
        por: 'Português-BR',
      },
    },
  };

  return (
    <section className="language-selector__container">
      <button
        ref={languageButtonRef as React.RefObject<HTMLButtonElement>}
        className={`language-selector__toggler ${
          languageSelectorVisibility ? 'visible' : ''
        }`}
        onClick={handleOpenClick}
        aria-label={languageList[language].title}
        title={languageList[language].title}
      >
        {language.toUpperCase()}
      </button>
      <div className="language-selector__wrapper">
        <ul ref={languageSelectorRef} className="language-selector__list">
          <li
            onClick={handleChangeLanguage as any}
            data-lang={'eng'}
            className={`${
              (languageList?.eng?.enabled as { [key in Language]: string })[
                language
              ] || ''
            } language-selector__item`}
            aria-label={languageList[language].item.eng}
          >
            {languageList[language].item.eng}
          </li>
          <li
            onClick={handleChangeLanguage as any}
            data-lang={'por'}
            className={`${
              (languageList?.por?.enabled as { [key in Language]: string })[
                language
              ] || ''
            } language-selector__item`}
            aria-label={languageList[language].item.por}
          >
            {languageList[language].item.por}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LanguageSelector;
