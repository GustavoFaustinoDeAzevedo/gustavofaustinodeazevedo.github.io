import Icon from '@/components/DesktopEnvironment/UIControls/GlobalStyles/components/Icon';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const StartMenuToggler = ({
  menuVisibility,
  handleToggleVisibility,
  startButtonRef,
}: {
  menuVisibility: boolean;
  handleToggleVisibility: () => void;
  startButtonRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  const { language } = useSelector((state: RootState) => state.settings);
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
