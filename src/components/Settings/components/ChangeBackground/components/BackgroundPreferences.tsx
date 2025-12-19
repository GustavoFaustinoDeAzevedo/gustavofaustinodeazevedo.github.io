import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeBackgroundTextContent } from '../data/changeBackground.data';
import { presetList } from '../data/imageFilters.data';
import actions from '@/store/actions';
import BackgroundControlPicker from './BackgroundControlPicker';

import { BackgroundPreviewDisplay } from '../types/changeBackground.types';
import { Radio, Button } from '@components/ui';
import { EffectValues, FilterValues, Language } from '@/store/slices/settings';
import DesktopBackgroundPreview from './BackgroundPreview';
import BackgroundControlFilter from './BackgroundControlFilter';
import BackgroundControlEffect from './BackgroundControlEffect';

export interface BackgroundPreviewConfig {
  isBackgroundPreviewImage: boolean;
  display: BackgroundPreviewDisplay;
  color: string;
  image: string;
  effect: EffectValues;
  filters: FilterValues;
}

const BackgroundPreferences = ({ language }: { language: Language }) => {
  // Valores armazenados no redux ==========================================

  const storedDesktopBackgroundColor = useSelector(
    (state: RootState) => state.settings.desktopBackgroundColor
  );
  const storedDesktopBackgroundDefaultColor = useSelector(
    (state: RootState) => state.settings.desktopBackgroundDefaultColor
  );
  const storedDesktopBackgroundImage = useSelector(
    (state: RootState) => state.settings.desktopBackgroundImage
  );
  const storedIsBackgroundImage = useSelector(
    (state: RootState) => state.settings.isBackgroundImage
  );

  const storedDesktopBackgroundEffect = useSelector(
    (state: RootState) => state.settings.desktopBackgroundEffect
  );

  const storedDesktopBackgroundFilters = useSelector(
    (state: RootState) => state.settings.desktopBackgroundFilter
  );

  // useState ==============================================================

  const [backgroundPreviewConfig, setBackgroundPreviewConfig] =
    useState<BackgroundPreviewConfig>({
      isBackgroundPreviewImage: storedIsBackgroundImage,
      display: storedIsBackgroundImage ? 'image' : 'color',
      color: storedDesktopBackgroundColor,
      image: storedDesktopBackgroundImage,
      effect: storedDesktopBackgroundEffect,
      filters: storedDesktopBackgroundFilters,
    });

  // constantes =============================================================

  const displayChoicesRoot = useMemo(
    () => changeBackgroundTextContent[language as Language],
    [language]
  );
  const displayChoicesContent =
    displayChoicesRoot.choices[backgroundPreviewConfig?.display];

  // handlers ================================================================

  const { handleChangeBackground } = actions.useSettingsActions();

  const handleChangeBackgroundState = useCallback(
    (key: string, value: any) => {
      setBackgroundPreviewConfig((prev) => {
        if (prev[key as keyof BackgroundPreviewConfig] === value) return prev;
        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [setBackgroundPreviewConfig, backgroundPreviewConfig]
  );

  const handleRadioState = (option: BackgroundPreviewDisplay) => {
    handleChangeBackgroundState('display', option);
    handleChangeBackgroundState('isBackgroundPreviewImage', option === 'image');
  };

  const handleApplyChanges = () => {
    handleChangeBackground({
      desktopBackgroundColor: backgroundPreviewConfig.color,
      desktopBackgroundImage: backgroundPreviewConfig.image,
      isBackgroundImage: backgroundPreviewConfig.display === 'image',
      desktopBackgroundEffect: backgroundPreviewConfig.effect,
      desktopBackgroundFilter: backgroundPreviewConfig.filters,
    });
  };

  // Props ==================================================================

  const backgroundControlProps = {
    handleChangeBackgroundState,
    language,
    defaultDesktopColor: storedDesktopBackgroundDefaultColor,
    displayChoicesContent,
    backgroundPreviewColor: backgroundPreviewConfig.color,
    backgroundPreviewDisplay: backgroundPreviewConfig.display,
    backgroundPreviewImage: backgroundPreviewConfig.image,
  };

  const radioDisplayProps = {
    fieldsetClassName: 'change-background__options-field border-muted ',
    legendClassName: 'change-background__display-legend ',
    radioLabelClassName: 'change-background__display-label ',
    radioClassName: 'change-background__display-option  cursor-pointer',
    options: displayChoicesRoot?.choices,
    onChange: handleRadioState as any,
    name: 'backgroundDisplay',
    fieldsetLegend: displayChoicesRoot?.legend,
    selectedValue: backgroundPreviewConfig.display,
  };

  // JSX ====================================================================

  const BackgroundControl = useMemo(() => {
    return (
      <>
        <BackgroundControlPicker {...backgroundControlProps} />
        {backgroundPreviewConfig.display === 'image' ? (
          <BackgroundControlFilter
            language={language}
            backgroundPreviewConfig={backgroundPreviewConfig}
            displayChoicesContent={displayChoicesContent}
            presetList={presetList}
            handleChangeBackgroundState={handleChangeBackgroundState}
            setBackgroundPreviewConfig={setBackgroundPreviewConfig}
          />
        ) : (
          <BackgroundControlEffect
            language={language}
            backgroundPreviewConfig={backgroundPreviewConfig}
            displayChoicesContent={displayChoicesContent}
            setBackgroundPreviewConfig={setBackgroundPreviewConfig}
            displayChoicesRoot={displayChoicesRoot}
          />
        )}
      </>
    );
  }, [
    language,
    backgroundPreviewConfig,
    displayChoicesContent,
    handleChangeBackgroundState,
    setBackgroundPreviewConfig,
    displayChoicesRoot,
  ]);

  return (
    <div className="change-background__container ">
      <div className="change-background__wrapper">
        <main className="change-background__main">
          <h3 className="change-background__title">
            {displayChoicesContent?.title}
          </h3>

          <DesktopBackgroundPreview
            backgroundPreviewConfig={backgroundPreviewConfig}
            className={'change-background__preview'}
          />
        </main>
        <aside className="change-background__aside border-muted">
          <header className="change-background__aside-header">
            <h3>{displayChoicesContent?.settings?.title}</h3>
            <Radio {...radioDisplayProps} />
          </header>
          <main className="change-background__aside-main ">
            {BackgroundControl}
          </main>
          <footer className="change-background__aside-footer border-muted">
            <Button
              onClick={handleApplyChanges}
              className={'change-background__save-button'}
              variant="primary"
            >
              {language === 'eng' ? 'Save' : 'Salvar'}
            </Button>
          </footer>
        </aside>
      </div>
    </div>
  );
};

export default React.memo(BackgroundPreferences);
