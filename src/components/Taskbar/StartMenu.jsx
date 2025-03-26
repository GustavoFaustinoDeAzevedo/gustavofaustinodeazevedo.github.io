import React, { useRef } from 'react';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';
import useClickOutside from '../../hooks/useClickOutside';
import { windows } from '../../data/windowsData';

const StartMenu = ({ toggleWindowVisibility, visible, history }) => {
  // Local refs for Start Menu and Button
  const startMenuRef = useRef(null);
  const startButtonRef = useRef(null);

  // Handles the toggle animation and visibility of the Start Menu
  const handleStartButtonClick = () => {
    toggleOpenMenuAnimation(startMenuRef, visible);
    toggleWindowVisibility('startMenu');
  };

  // Detects clicks outside to close the Start Menu
  useClickOutside(
    startButtonRef,
    handleStartButtonClick,
    visible,
    startMenuRef
  );

  return (
    <div className="start-menu">
      {/* Start Button */}
      <button
        ref={startButtonRef}
        className="start-button"
        onClick={handleStartButtonClick}
        aria-label="Start Menu"
      >
        <i className="icon window-icon"></i>
      </button>

      {/* Start Menu Window */}
      <section className="start-window-container">
        <div ref={startMenuRef} className="start-window-content">
          {/* Search Input */}
          <input type="text" aria-label="Start Menu Search Input" />

          {/* Search Results Section */}
          <section>{/* Search Content */}</section>

          {/* Recent Items Section */}
          <fieldset>
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
