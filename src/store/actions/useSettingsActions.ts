import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { changeBackground, changeLanguage } from '../slices/settingsSlice';
import { Language } from '../slices/settingsSlice';

type BackgroundPayload = Parameters<typeof changeBackground>[0];

const useSettingsActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeLanguage = (newLang: Language) => {
    dispatch(changeLanguage(newLang));
  };

  const handleChangeBackground = ({
    backgroundColor,
    backgroundColorContrast,
    backgroundEffect,
    backgroundImage,
    isBackgroundImage,
  }: BackgroundPayload) => {
    dispatch(
      changeBackground({
        backgroundColor,
        backgroundColorContrast,
        backgroundEffect,
        backgroundImage,
        isBackgroundImage,
      })
    );
  };

  return {
    handleChangeLanguage,
    handleChangeBackground,
  };
};

export default useSettingsActions;
