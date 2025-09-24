import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeBackgroundTextContent } from '../data/changeBackground.data';
import actions from '@/store/actions';
import BackgroundControl from './BackgroundControl';
import DesktopBackground from '@/components/Desktop/components';
import {
  BackgroundPreviewDisplay,
  ChangeBackgroundProps,
} from '../types/changeBackground.types';
import { Slider } from '@/components/ui';
import { FilterValues, Language } from '@/store/slices/settings';
import DesktopBackgroundPreview from './BackgroundPreview';
import { boolean } from 'mathjs';
import {
  Filter,
  FilterData,
  FilterList,
} from '../types/changeBackground.data.types';

type RadioOption = {
  id: BackgroundPreviewDisplay;
  label: string;
};

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

  // useEffects - //TODO tirar useEffect pra usar em um botão de salvar
  // useEffect(() => {
  //   handleChangeBackground({
  //     isBackgroundImage: backgroundDisplay === 'image',
  //   });
  // }, [backgroundDisplay]);

  //handlers
  const handleChangeBackgroundState = (key: string, value: any) => {
    if (key === 'isBackgroundPreviewImage')
      value = !backgroundPreviewConfig.isBackgroundPreviewImage;
    setBackgroundPreviewConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // consts
  const displayChoicesRoot = changeBackgroundTextContent[language as Language];
  const displayChoicesContent =
    displayChoicesRoot.choices[backgroundPreviewConfig?.display];

  // functions

  const parentValuesHandler = ({
    key,
    value,
  }: {
    key: string;
    value: number;
  }) =>
    setBackgroundPreviewConfig((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }));

  // useEffect(() => {
  //   console.log(backgroundPreviewConfig);
  // }, [backgroundPreviewConfig]);

  const RadioMapper = ({ radioObjectData }: { [key: string]: any }) => {
    if (typeof radioObjectData !== 'object')
      return console.error('You must input an object to map the radio options');
    return Object.values(radioObjectData).map((object, index) => (
      <div key={`radio-${index}`} className="change-background__display-option">
        <label htmlFor={object.id}>{object.label}</label>
        <input
          type="radio"
          id={object.id}
          name="btype"
          value={object.id}
          checked={backgroundPreviewConfig.display === object.id}
          onChange={() => handleChangeBackgroundState('display', object.id)}
        />
      </div>
    ));
  };

  const backgroundControlProps = {
    handleChangeBackground,
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
    <div
      className="change-background__container"
      data-initial-dimension='{"width": "750px", "height": "600px"}'
    >
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
            <fieldset className="change-background__options-list">
              <legend>{displayChoicesRoot?.legend}</legend>
              <RadioMapper radioObjectData={displayChoicesRoot?.choices} />
            </fieldset>
            <fieldset className="change-background__filters-list">
              <legend>{displayChoicesContent?.settings?.filter?.legend}</legend>
              <Slider //TODO resolver a questão do handler do slider, preciso mudar o state dele e passar para esse componente
                sliderContainerClass={
                  'change-background__filter-slider-container'
                }
                handleParentValues={parentValuesHandler}
                sliderLabelClass={'change-background__filter-slider-label'}
                inputNumberClass={'change-background__filter-input-number'}
                sliderObjectData={
                  displayChoicesContent?.settings?.filter?.options || {}
                }
                sliderInitialValues={backgroundPreviewConfig.filters}
              />
            </fieldset>
            <fieldset className="change-background__options-list">
              <legend>{displayChoicesContent?.settings?.picker?.legend}</legend>
              <BackgroundControl {...backgroundControlProps} />
            </fieldset>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default React.memo(ChangeBackground);
