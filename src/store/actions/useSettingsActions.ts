import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { changeBackground, changeLanguage } from '../slices/settingsSlice';
import { Language } from '../slices/settingsSlice';

type BackgroundPayload = [string?, string?, string?];

const useSettingsActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeLanguage = (newLang: Language) => {
    dispatch(changeLanguage(newLang));
  };

  const handleChangeBackground = (
    ...[
      backgroundColor,
      backgroundColorContrast,
      backgroundImage,
    ]: BackgroundPayload
  ) => {
    dispatch(
      changeBackground({
        backgroundColor,
        backgroundColorContrast,
        backgroundImage,
      })
    );
  };

  return {
    handleChangeLanguage,
    handleChangeBackground,
  };
};

export default useSettingsActions;
