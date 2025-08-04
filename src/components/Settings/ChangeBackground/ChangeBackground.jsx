import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeBackgroundTextContent } from './data/changeBackgroundTextContent';

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

  const InputChoices = ({ choicesObject }) => {
    if (typeof choicesObject !== 'object')
      return console.error('You must input an object to map the radio options');
    return Object.values(choicesObject).map((choice) => (
      <div className="change-background__option">
        <label htmlFor={choice.id}>{choice.label}</label>
        <input
          type="radio"
          id={choice.id}
          name="btype"
          value={choice.id}
          checked={backgroundDisplay === choice.id}
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
      data-initial-dimension='{"width": "550px", "height": "500px"}'
    >
      <header>
        <h3 className="change-background__title">
          {displayChoicesContent?.title}
        </h3>
      </header>
      <div className="change-background__wrapper">
        <DesktopBackground className={'change-background__preview'} />
        <aside className="change-background__aside">
          <div className="change-background__options-wrapper">
            <fieldset className="change-background__options-list">
              <legend>{displayChoicesRoot?.legend}</legend>
              <InputChoices choicesObject={displayChoicesRoot?.choices} />
            </fieldset>
            <fieldset className="change-background__options-list">
              <legend>{displayChoicesContent?.settings?.legend}</legend>
              <InputChoices
                choicesObject={displayChoicesContent?.settings?.choices}
              />
            </fieldset>
            <BackgroundControl {...backgroundControlProps} />
          </div>
        </aside>
      </div>
    </div>
  );
};
