import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeBackgroundTextContent } from '../data/changeBackground.data';
import actions from '@/store/actions';
import BackgroundControl from './BackgroundControl';
import DesktopBackground from '@/components/Desktop/components';
import {
  BackgroundDisplay,
  ChangeBackgroundProps,
} from '../types/changeBackground.types';
import { Slider } from '@/components/ui';
import { Language } from '@/store/slices/settings';

type RadioOption = {
  id: BackgroundDisplay;
  label: string;
};

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
  const desktopBackgroundColor = useSelector(
    (state: RootState) => state.settings.desktopBackgroundColor
  );
  const backgroundImage = useSelector(
    (state: RootState) => state.settings.desktopBackgroundImage
  );
  const isBackgroundImage = useSelector(
    (state: RootState) => state.settings.isBackgroundImage
  );

  // useState
  const [backgroundDisplay, setBackgroundDisplay] = useState<BackgroundDisplay>(
    isBackgroundImage ? 'image' : 'color'
  );

  // useRef
  const defaultDesktopColorRef = useRef(
    getCSSVariable('--c-desktop-default-bg')
  );
  const defaultFilesColorRef = useRef(getCSSVariable('--c-desktop-default-bg'));

  // useEffects
  useEffect(() => {
    handleChangeBackground({
      isBackgroundImage: backgroundDisplay === 'image',
    });
  }, [backgroundDisplay]);

  //handlers
  const handleChangeBackgroundDisplay = () => {
    setBackgroundDisplay((prev) => (prev === 'image' ? 'color' : 'image'));
  };

  const displayChoicesRoot = changeBackgroundTextContent[language as Language];
  const displayChoicesContent = displayChoicesRoot.choices[backgroundDisplay];

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
          checked={backgroundDisplay === object.id}
          onChange={handleChangeBackgroundDisplay}
        />
      </div>
    ));
  };

  const backgroundControlProps = {
    handleChangeBackground,
    handleUpdateWindowContent,
    language,
    content,
    desktopBackgroundColor,
    defaultDesktopColor: defaultDesktopColorRef.current,
    displayChoicesContent,
    backgroundDisplay,
    backgroundImage,
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
          <DesktopBackground className={'change-background__preview'!} />
        </main>
        <aside className="change-background__aside">
          <div className="change-background__options-wrapper">
            <fieldset className="change-background__options-list">
              <legend>{displayChoicesRoot?.legend}</legend>
              <RadioMapper radioObjectData={displayChoicesRoot?.choices} />
            </fieldset>
            <fieldset className="change-background__filters-list">
              <legend>{displayChoicesContent?.settings?.filter?.legend}</legend>
              <Slider
                sliderContainerClass={
                  'change-background__filter-slider-container'
                }
                sliderLabelClass={'change-background__filter-slider-label'}
                inputNumberClass={'change-background__filter-input-number'}
                sliderObjectData={
                  displayChoicesRoot?.choices[backgroundDisplay]?.settings
                    ?.filter?.options || {}
                }
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
