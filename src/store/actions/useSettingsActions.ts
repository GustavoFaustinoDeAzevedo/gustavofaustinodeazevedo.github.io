import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  changeBackground,
  changeLanguage,
  changeDoubleCkick,
} from '../slices/settings/settingsSlice';
import { BackgroundPayload, Language } from '../slices/settings';

const useSettingsActions = (): {
  handleChangeLanguage: (payload: Language) => void;
  handleChangeBackground: (payload: BackgroundPayload) => void;
  handleChangeDoubleCkick: (payload: boolean) => void;
} => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeLanguage = (payload: Language) => {
    dispatch(changeLanguage(payload));
  };

  const handleChangeBackground = (payload: BackgroundPayload) => {
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
