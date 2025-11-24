import Icon from '@/components/ui/GlobalStyles/components/Icon';
import { Language } from '@/store/slices/settings';
import { useRef } from 'react';

const StartMenuToggler = ({
  language,
  menuVisibility,
  handleToggleVisibility,
  startButtonRef,
}: {
  language: Language;
  menuVisibility: boolean;
  handleToggleVisibility: () => void;
  startButtonRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  return (
    <button
      ref={startButtonRef}
      title={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
      className={`start-menu__toggler ${menuVisibility ? 'visible' : ''}`}
      onClick={handleToggleVisibility}
      aria-label={language !== 'por' ? 'Start Menu' : 'Menu Iniciar'}
      type="button"
    >
      <Icon className="start-menu__toggler-icon" variant="menu-hamburguer" />
    </button>
  );
};

export default StartMenuToggler;
