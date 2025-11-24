import React, { use, useMemo } from 'react';
import Clock from './Clock';
import LanguageSelector from './LanguageSelector';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import actions from '@/store/actions';

const TaskbarRightSection = () => {
  const settingsActions = actions.useSettingsActions();
  const { handleChangeLanguage, handleChangeDoubleCkick } = settingsActions;
  const { language, isDoubleClick, isMobile } = useSelector(
    (state: RootState) => state.settings
  );
  return useMemo(
    () => (
      <section className="taskbar__right-section">
        {!isMobile && (
          <label className="container">
            {language === 'eng'
              ? `Double Click To Open Files`
              : `Duplo Clique Para Abrir Arquivos`}
            <input
              type="checkbox"
              checked={isDoubleClick}
              onChange={() => handleChangeDoubleCkick(!isDoubleClick)}
            />
            <span className="checkmark"></span>
          </label>
        )}
        <LanguageSelector
          isMobile={isMobile}
          language={language}
          onChangeLanguage={handleChangeLanguage}
        />
        <Clock />
        {/* <BatteryStatus /> */}
      </section>
    ),
    [
      isMobile,
      language,
      isDoubleClick,
      handleChangeDoubleCkick,
      handleChangeLanguage,
    ]
  );
};

export default React.memo(TaskbarRightSection);
