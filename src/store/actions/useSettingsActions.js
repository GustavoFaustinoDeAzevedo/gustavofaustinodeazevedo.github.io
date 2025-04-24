import { useDispatch } from 'react-redux';
import { changeLanguage } from '../slices/settingsSlice';


const useSettingsActions = () => {
  const dispatch = useDispatch();

  const handleChangeLanguage = (newLang) => {
    dispatch(changeLanguage(newLang));
  };
  return { handleChangeLanguage }
}
export default useSettingsActions;