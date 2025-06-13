import { useDispatch } from 'react-redux';
import { changeBackground, changeLanguage } from '../slices/settingsSlice';


const useSettingsActions = () => {
  const dispatch = useDispatch();

  const handleChangeLanguage = (newLang) => {
    dispatch(changeLanguage(newLang));
  };

  const handleChangeBackground = (backgroundColor, iconColor, backgroundImage) => {
    dispatch(changeBackground({ backgroundColor, iconColor, backgroundImage }));
  }
  return { handleChangeLanguage, handleChangeBackground }
}
export default useSettingsActions;