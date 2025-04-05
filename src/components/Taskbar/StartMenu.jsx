import React, { useRef } from 'react';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';
import useClickOutside from '../../hooks/useClickOutside';
import { desktopIconsData } from '../../data/desktopIconsData';

const StartMenu = ({
  toggleWindowVisibility,
  isVisible,
  history,
  language,
  windowRef,
}) => {
  // Local refs for Start Menu and Button
  const startMenuRef = useRef(null);
  const startButtonRef = useRef(null);
  // Handles the toggle animation and visibility of the Start Menu
  // const handleOpenMenuButtonClick = () => {
  //   toggleOpenMenuAnimation(startMenuRef, isVisible);
  //   toggleWindowVisibility('startMenu');
  // };

  // Detects clicks outside to close the Start Menu
  // useClickOutside(startButtonRef, toggleWindowVisibility, isVisible, windowRef);

  return (
    <div className="start-menu">
      {/* Start Button */}
      <button
        ref={startButtonRef}
        title={language !== 'POR' ? 'Start Menu' : 'Menu Iniciar'}
        className="start-button"
        onClick={toggleWindowVisibility}
        aria-label={language !== 'POR' ? 'Start Menu' : 'Menu Iniciar'}
      >
        <i className="icon window-icon"></i>
      </button>

      {/* Start Menu Window */}
      <section className="start-menu-container">
        <div ref={windowRef} className="start-menu-content">
          <div className="input-container">
            <i className="icon search">&#128269;</i>
            {/* Search Input */}
            <input type="text" aria-label="Start menu search input" />
          </div>
          {/* Search Results Section */}
          <section className="search-content">{/* Search Content */}</section>

          {/* Recent Items Section */}
          <fieldset className="history-container">
            {/* Recent Content */}
            <legend>History:</legend>
            <ul className="start-menu-history">
              {history.map((id) => {
                return <li key={`history-${id}`}>{id}</li>;
              })}
            </ul>
          </fieldset>
        </div>
      </section>
    </div>
  );
};

export default StartMenu;
