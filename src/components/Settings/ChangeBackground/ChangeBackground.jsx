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
      <h3>Pick a color to change the desktop background color</h3>
      <CustomColorPicker
        backgroundColor={desktopBackgroundColor}
        handleChangeBackground={handleChangeBackground}
        defaultDesktopColor={defaultDesktopColor.current}
      />
      <Button onClick={handleClick} type="submit">
        Default Color
      </Button>
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
