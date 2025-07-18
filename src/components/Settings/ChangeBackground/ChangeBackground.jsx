import CustomColorPicker from './components';
import Button from '../../ui/Button';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ChangeBackground = ({ handleChangeBackground }) => {
  const getCSSVariable = (variableName) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();

  // useSelector
  const desktopBackgroundColor = useSelector(
    (state) => state.settings.desktopBackgroundColor
  );

  // useRef
  const defaultDesktopColor = useRef(getCSSVariable('--c-desktop-default-bg'));

  const handleClick = () => {
    handleChangeBackground(defaultDesktopColor.current);
  };

  return (
    <div className="settings-change-background">
      <div className="background-color-container">
        <div className="color-picker-container">
          <h3>Pick a color to change the desktop background color</h3>
          <CustomColorPicker
            backgroundColor={desktopBackgroundColor}
            handleChangeBackground={handleChangeBackground}
            defaultDesktopColor={defaultDesktopColor.current}
          />
          <Button onClick={handleClick} type="submit">
            Default Color
          </Button>
        </div>
        <div className="background-options-container">
          <fieldset className="effect-picker-container">
            <legend>Type</legend>
            <div className="radio-container">
              <label htmlFor="1">Image</label>
              <input type="radio" id="1" name="btype" value="" />
            </div>

            <div className="radio-container">
              <label htmlFor="2">Color</label>
              <input type="radio" id="2" name="btype" value="" />
            </div>
          </fieldset>
          <fieldset className="effect-picker-container">
            <legend>Effects</legend>
            <div className="radio-container">
              <label htmlFor="1">1</label>
              <input type="radio" id="1" name="a" value="" />
            </div>
            <div className="radio-container">
              <label htmlFor="2">2</label>
              <input type="radio" id="2" name="a" value="" />
            </div>
            <div className="radio-container">
              <label htmlFor="3">3</label>
              <input type="radio" id="3" name="a" value="" />
            </div>
          </fieldset>
        </div>
      </div>
      {/* </Panel> 

      <Panel>
        <h3></h3>
      </Panel>
       </Accordion>  */}
      {/* Image option */}
      {/* Color Effects */}
    </div>
  );
};
