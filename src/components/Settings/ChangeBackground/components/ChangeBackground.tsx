import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
}

const ChangeBackground = ({
  handleUpdateWindowContent,
  language,
  content,
}: ChangeBackgroundProps) => {
  const getCSSVariable = (variableName: string) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();

  const { handleChangeBackground, handleChangeLanguage } =
    actions.useSettingsActions();

  // useSelector
  const storedDesktopBackgroundColor = useSelector(
    (state: RootState) => state.settings.desktopBackgroundColor
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

  // useState
  const [backgroundPreviewConfig, setBackgroundPreviewConfig] =
    useState<BackgroundPreviewConfig>({
      isBackgroundPreviewImage: storedIsBackgroundImage,
      display: storedIsBackgroundImage ? 'image' : 'color',
      color: storedDesktopBackgroundColor,
      image: storedDesktopBackgroundImage,
      effect: storedDesktopBackgroundEffect,
      filters: storedDesktopBackgroundFilters,
    });

  // useRef
  const defaultDesktopColorRef = useRef(
    getCSSVariable('--c-desktop-default-bg')
  );

  // consts
  const displayChoicesRoot = useMemo(
    () => changeBackgroundTextContent[language as Language],
    [language]
  );
  const displayChoicesContent =
    displayChoicesRoot.choices[backgroundPreviewConfig?.display];

  // functions

  const handleChangeBackgroundState = useCallback(
    (key: string, value: any) => {
      console.log(key, value);
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

  // Props

  const backgroundControlProps = {
    handleChangeBackgroundState,
    handleUpdateWindowContent,
    language,
    content,
    defaultDesktopColor: defaultDesktopColorRef.current,
    displayChoicesContent,
    backgroundPreviewColor: backgroundPreviewConfig.color,
    backgroundPreviewDisplay: backgroundPreviewConfig.display,
    backgroundPreviewImage: backgroundPreviewConfig.image,
  };

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
          <div className="change-background__options-wrapper">
            <Radio
              fieldsetClassName={'change-background__options-field'}
              legendClassName={'change-background__display-legend'}
              radioClassName={'change-background__display-option'}
              options={displayChoicesRoot?.choices}
              onChange={handleRadioState as any}
              name="backgroundDisplay"
              fieldsetLegend={displayChoicesContent?.label}
              selectedValue={backgroundPreviewConfig.display}
            />
            <Slider
              sliderContainerClass={
                'change-background__filter-slider-container'
              }
              sliderValuesHandler={filtersValuesHandler} //parentValuesHandler}
              sliderLabelClass={'change-background__filter-slider-label'}
              fieldsetClass={'change-background__filters-field'}
              fieldsetLegend={displayChoicesContent?.settings?.filter?.legend}
              inputNumberClass={'change-background__filter-input-number'}
              sliderObjectData={
                displayChoicesContent?.settings?.filter?.options || {}
              }
              sliderInitialValues={backgroundPreviewConfig.filters}
            />
            <fieldset className="change-background__picker-field">
              <legend>{displayChoicesContent?.settings?.picker?.legend}</legend>
              <BackgroundControl {...backgroundControlProps} />
            </fieldset>
            <Button
              onClick={handleApplyChanges}
              className={'border-radius-0'}
              variant="success"
            >
              {language === 'eng' ? 'Save' : 'Salvar'}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default React.memo(ChangeBackground);
