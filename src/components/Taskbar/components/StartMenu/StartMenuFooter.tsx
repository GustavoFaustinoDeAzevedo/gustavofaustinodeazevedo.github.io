import { Toggle } from '@/components/ui';
import { RootState } from '@/store';
import Icon from '@components/ui/GlobalStyles/components/Icon';
import { useSelector } from 'react-redux';
import actions from '@/store/actions';

const StartMenuFooter = () => {
  const userName = useSelector(
    (state: RootState) => state.user.currentUser.name,
  );

  const isDataPersistent = useSelector(
    (state: RootState) => state.settings.isDataPersistent,
  );

  const { language } = useSelector((state: RootState) => state.settings);
  const { handleChangePersistentData } = actions.useSettingsActions();

  const persistentDataLabel: { [key: string]: string } = {
    por: 'Dados persistentes',
    eng: 'Persistent data',
  };

  const handleToggle = () => {
    handleChangePersistentData(!isDataPersistent);
  };
  return (
    <footer className="start-menu__footer">
      {/* <button
        title="Placeholder"
        aria-label="Placeholder"
        type="button"
        className="start-menu__footer-button"
      >
        <Icon
          className="start-menu__footer-button-icon"
          customPicture="/icons/about-me-icon.png"
        ></Icon>
        <p className="text-color-light text-xs">{userName}</p>
      </button> */}
      <Toggle
        handleToggle={handleToggle}
        label={persistentDataLabel[language]}
        isChecked={!isDataPersistent}
        classContainer="start-menu__footer-toggle-container"
      />
    </footer>
  );
};

export default StartMenuFooter;
