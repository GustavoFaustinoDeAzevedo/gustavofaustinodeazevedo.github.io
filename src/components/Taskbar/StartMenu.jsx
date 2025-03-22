import React, { useRef } from 'react';
import toggleOpenMenuAnimation from '../../animations/elementTransitions';
import useClickOutside from '../../hooks/useClickOutside';

const StartMenu = ({
  toggleWindowVisibility,
  visible,
  handleTransitionEnd,
}) => {
  const startWindowRef = useRef(null);
  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    toggleOpenMenuAnimation(startWindowRef, visible);
    toggleWindowVisibility('window2');
  };

  useClickOutside(buttonRef, handleButtonClick, visible, startWindowRef);

  return (
    <div className="start-menu">
      {/* Botão de Início */}
      <button
        ref={buttonRef}
        className="start-button"
        onClick={handleButtonClick}
        aria-label="Init Menu"
      >
        <i className="icon window-icon"></i>
      </button>

      {/* Janela do Menu Iniciar */}
      <section className="start-window-container">
        <div
          onTransitionEnd={() => handleTransitionEnd(startWindowRef, 'window2')}
          ref={startWindowRef}
          className="start-window-content"
        >
          <input type="text" aria-label="Menu Init Search Input" />
          <section>{/* Conteúdo de Pesquisa */}dsadsadasdasd</section>
          <section>{/* Conteúdo Recente */}asdasdasdasdasd</section>
        </div>
      </section>
    </div>
  );
};

export default StartMenu;
