import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeBackgroundTextContent } from './data/changeBackground.data';

import useDisplayChoicesContent from './hooks/useDisplayChoicesContent';
import BackgroundControl from './components/BackgroundControl';
import DesktopBackground from '../../Desktop/components';

export const ChangeBackground = ({
  handleChangeBackground,
  handleUpdateWindowContent,
  language,
  content,
}) => {
  const getCSSVariable = (variableName) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();

  // useSelector
  const desktopBackgroundColor = useSelector(
    (state) => state.settings.desktopBackgroundColor
  );
  const backgroundImage = useSelector(
    (state) => state.settings.desktopBackgroundImage
  );
  const isBackgroundImage = useSelector(
    (state) => state.settings.isBackgroundImage
  );

  // useState
  const [backgroundDisplay, setBackgroundDisplay] = useState(
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

  const { displayChoicesContent, displayChoicesRoot } =
    useDisplayChoicesContent({
      backgroundDisplay,
      language,
    });

  const RadioMapper = ({ radioObjectData }) => {
    if (typeof radioObjectData !== 'object')
      return console.error('You must input an object to map the radio options');
    return Object.values(radioObjectData).map((object) => (
      <div className="change-background__display-option">
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

  const SliderMapper = ({ sliderObjectData }) => {
    if (typeof sliderObjectData !== 'object')
      return console.error('You must input an object to map the radio options');

    return Object.values(sliderObjectData).map((object) => {
      const [sliderValue, setSliderValue] = useState(object.default);
      return (
        <div className="change-background__filter-slider-container">
          <label
            htmlFor="slider"
            className="change-background__filter-slider-label"
          >
            {object.label}
          </label>
          {/* <div className="change-background__filter-slider-wrapper"> */}
          <input
            type="range"
            id={object.id}
            key={'slider-' + object.id}
            min={object.min}
            max={object.max}
            step={object.step}
            defaultValue={object.default}
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
          />

          <input
            className="change-background__filter-input-number"
            type="number"
            value={
              Number(object.step) < 1
                ? Number(sliderValue).toFixed(2)
                : sliderValue
            }
            id={object.id}
            key={'number-' + object.id}
            min={object.min}
            max={object.max}
            step={object.step}
            defaultValue={object.default}
            onChange={(e) => setSliderValue(e.target.value)}
          ></input>
        </div>
      );
    });
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
          <DesktopBackground className={'change-background__preview'} />
        </main>
        <aside className="change-background__aside">
          <div className="change-background__options-wrapper">
            <fieldset className="change-background__options-list">
              <legend>{displayChoicesRoot?.legend}</legend>
              <RadioMapper radioObjectData={displayChoicesRoot?.choices} />
            </fieldset>
            <fieldset className="change-background__filters-list">
              <legend>{displayChoicesContent?.settings?.filter?.legend}</legend>
              <SliderMapper
                sliderObjectData={
                  displayChoicesRoot?.choices[backgroundDisplay].settings.filter
                    .options
                }
              />

              {/* <InputChoices
                choicesObject={displayChoicesContent?.settings?.choices}
              /> */}
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
