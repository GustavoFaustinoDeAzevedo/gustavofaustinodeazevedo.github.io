import CustomColorPicker from './components';
import Button from '../../ui/Button';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { changeBackgroundTextContent } from './data/changeBackgroundTextContent';

export const ChangeBackground = ({ handleChangeBackground, language }) => {
  const getCSSVariable = (variableName) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();

  // useState
  const [backgroundType, setBackgroundType] = useState('image');

  // useSelector
  const desktopBackgroundColor = useSelector(
    (state) => state.settings.desktopBackgroundColor
  );

  // useRef
  const defaultDesktopColor = useRef(getCSSVariable('--c-desktop-default-bg'));

  const handleClick = () => {
    handleChangeBackground(defaultDesktopColor.current);
  };

  //handlers
  const handleChangeBackgroundType = () => {
    setBackgroundType((prev) => (prev === 'image' ? 'color' : 'image'));
  };
  const choiceContent =
    changeBackgroundTextContent[language].choices[backgroundType];

  //jsx
  const BackgroundControl = () => (
    <main className="change-background__control-wrapper">
      <CustomColorPicker
        backgroundColor={desktopBackgroundColor}
        handleChangeBackground={handleChangeBackground}
        defaultDesktopColor={defaultDesktopColor.current}
      />
      <Button onClick={handleClick} type="submit">
        {choiceContent.button}
      </Button>
    </main>
  );
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
          checked={backgroundType === choice.id}
          onChange={handleChangeBackgroundType}
        />
      </div>
    ));
  };

  return (
    <div
      className="change-background__container"
      data-initial-dimension='{"width": "550px", "height": "500px"}'
    >
      <header>
        <h3 className="change-background__title">{choiceContent.title}</h3>
      </header>
      <div className="change-background__wrapper">
        <BackgroundControl />
        <aside className="change-background__options-wrapper">
          <fieldset className="change-background__options-list">
            <legend>{changeBackgroundTextContent[language].legend}</legend>
            <InputChoices
              choicesObject={changeBackgroundTextContent[language].choices}
            />
          </fieldset>
          <fieldset className="change-background__options-list">
            <legend>{choiceContent.settings.legend}</legend>
            <InputChoices choicesObject={choiceContent.settings.choices} />
          </fieldset>
        </aside>
      </div>
    </div>
  );
};
