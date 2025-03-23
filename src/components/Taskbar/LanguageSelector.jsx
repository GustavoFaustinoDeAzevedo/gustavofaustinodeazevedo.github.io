import React, { useRef } from 'react';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';
import useClickOutside from '../../hooks/useClickOutside';

const LanguageSelector = ({ language, onChangeLanguage }) => {
  // Local refs for Language Menu and Button
  const languageMenuRef = useRef(null);
  const languageButtonRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  // Toggles the language menu visibility
  const handleLanguageToggle = () => {
    toggleOpenMenuAnimation(languageMenuRef, isVisible);
    setIsVisible(!isVisible);
  };

  // Detects clicks outside to close the Language Menu
  useClickOutside(
    languageButtonRef,
    handleLanguageToggle,
    isVisible,
    languageMenuRef
  );

  return (
    <section className="language">
      <button
        ref={languageButtonRef}
        className="language-button"
        onClick={handleLanguageToggle}
        aria-label="Select language"
      >
        {language}
      </button>
      <div className="language-list-container">
        <ul ref={languageMenuRef} className="language-list">
          <li
            onClick={onChangeLanguage}
            className={language.includes('ENG') ? 'active' : ''}
          >
            English-US
          </li>
          <li
            onClick={onChangeLanguage}
            className={language.includes('POR') ? 'active' : ''}
          >
            Portuguese-BR
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LanguageSelector;
