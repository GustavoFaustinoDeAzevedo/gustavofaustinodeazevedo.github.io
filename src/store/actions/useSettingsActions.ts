import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  changeBackground,
  changeLanguage,
  changeDoubleCkick,
} from '../slices/settings/settingsSlice';
import { Language } from '../slices/settings';
import { HandleChangeBackground } from '@/components/Settings/ChangeBackground/types/changeBackground.data.types';

const useSettingsActions = (): {
  handleChangeLanguage: (newLang: Language) => void;
  handleChangeBackground: (payload: HandleChangeBackground) => void;
  handleChangeDoubleCkick: (payload: boolean) => void;
} => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeLanguage = (newLang: Language) => {
    dispatch(changeLanguage(newLang));
  };

  const handleChangeBackground = (payload: HandleChangeBackground) => {
    dispatch(changeBackground(payload));
  };

  const handleChangeDoubleCkick = (payload: boolean) => {
    dispatch(changeDoubleCkick(payload));
  };

  return {
    handleChangeLanguage,
    handleChangeBackground,
    handleChangeDoubleCkick,
  };
};

export default useSettingsActions;
