import React, { useRef } from 'react';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';
import useClickOutside from '../../hooks/useClickOutside';

const LanguageSelector = ({
  language,
  onChangeLanguage,
  toggleWindowVisibility,
  languageButtonRef,
  isVisible,
  windowRef,
  onClick,
}) => {
  // Local refs for Language Menu and Button
  const languageMenuRef = useRef(null);

  // Toggles the language menu visibility{
  // const handleOpenMenuButtonClick = () => {
  //   toggleOpenMenuAnimation(languageMenuRef, isVisible);
  //   toggleWindowVisibility('languageMenu');
  // };

  // Detects clicks outside to close the Language Menu
  // useClickOutside(
  //   languageButtonRef,
  //   toggleWindowVisibility,
  //   isVisible,
  //   windowRef
  // );
  return (
    <section className="language">
      <button
        ref={languageButtonRef}
        className="language-button"
        onClick={onClick}
        aria-label={language !== 'POR' ? 'Select language' : 'Mudar idioma'}
        title={language !== 'POR' ? 'Select language' : 'Mudar idioma'}
      >
        {language === 'ENG' ? 'ENG' : 'POR'}
      </button>
      <div className="language-list-container">
        <ul
          ref={windowRef}
          className={`language-list ${isVisible ? 'active' : ''}`}
        >
          <li
            onClick={onChangeLanguage}
            className={language === 'ENG' ? 'active' : ''}
            aria-label={language !== 'POR' ? 'English-US' : 'Inglês-US'}
          >
            {language !== 'POR' ? 'English-US' : 'Inglês-US'}
          </li>
          <li
            onClick={onChangeLanguage}
            className={language === 'POR' ? 'active' : ''}
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
