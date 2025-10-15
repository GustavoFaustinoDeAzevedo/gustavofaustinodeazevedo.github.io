import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeBackgroundTextContent } from '../data/changeBackground.data';
import actions from '@/store/actions';
import BackgroundControl from './BackgroundControl';

import {
  BackgroundPreviewDisplay,
  ChangeBackgroundProps,
} from '../types/changeBackground.types';
import { Slider, Radio, Button } from '@/components/ui';
import { FilterValues, Language } from '@/store/slices/settings';
import DesktopBackgroundPreview from './BackgroundPreview';

export interface BackgroundPreviewConfig {
  isBackgroundPreviewImage: boolean;
  display: BackgroundPreviewDisplay;
  color: string;
  image: string;
  effect: string;
  filters: FilterValues;
  gradient?: string;
}

const ChangeBackground = ({
  handleUpdateWindowContent,
  language,
  content,
}: ChangeBackgroundProps) => {
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

  // funções ===============================================================

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

  const filtersValuesHandler = useCallback(
    (key: keyof FilterValues, value: number | string) =>
      setBackgroundPreviewConfig((prev) => {
        if (prev.filters[key as keyof FilterValues] === value) return prev;
        return {
          ...prev,
          filters: {
            ...prev.filters,
            [key]: value,
          },
        };
      }),
    [setBackgroundPreviewConfig, backgroundPreviewConfig.filters]
  );

  // handlers ================================================================

  const { handleChangeBackground } = actions.useSettingsActions();

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
    handleUpdateWindowContent,
    language,
    content,
    defaultDesktopColor: storedDesktopBackgroundDefaultColor,
    displayChoicesContent,
    backgroundPreviewColor: backgroundPreviewConfig.color,
    backgroundPreviewDisplay: backgroundPreviewConfig.display,
    backgroundPreviewImage: backgroundPreviewConfig.image,
  };

  const sliderProps = {
    sliderContainerClass: 'change-background__filter-slider-container',
    sliderValuesHandler: filtersValuesHandler,
    sliderLabelClass: 'change-background__filter-slider-label',
    fieldsetClass: 'change-background__filter-field',
    fieldsetLegend: displayChoicesContent?.settings?.filter?.legend,
    inputNumberClass: 'change-background__filter-input-number',
    sliderObjectData: displayChoicesContent?.settings?.filter?.options || {},
    sliderInitialValues: backgroundPreviewConfig.filters,
  };

  const radioProps = {
    fieldsetClassName: 'change-background__options-field',
    legendClassName: 'change-background__display-legend',
    radioClassName: 'change-background__display-option',
    options: displayChoicesRoot?.choices,
    onChange: handleRadioState as any,
    name: 'backgroundDisplay',
    fieldsetLegend: displayChoicesContent?.label,
    selectedValue: backgroundPreviewConfig.display,
  };

  // JSX ====================================================================

  return (
    <div className="change-background__container">
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
        <aside className="change-background__aside">
          <header className="change-background__aside-header">
            <h3>{displayChoicesContent?.settings?.title}</h3>
          </header>
          <main className="change-background__aside-main">
            <Radio {...radioProps} />
            <Slider {...sliderProps} />
            <fieldset className="change-background__picker-field">
              <legend>{displayChoicesContent?.settings?.picker?.legend}</legend>
              <BackgroundControl {...backgroundControlProps} />
            </fieldset>
          </main>
          <footer className="change-background__aside-footer">
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

export default React.memo(ChangeBackground);
