import CustomColorPicker from './utils';
import Button from '../../ui/Button';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import actions from '../../../store/actions';

export const ChangeBackground = ({ handleChangeBackground }) => {
  const desktopBackgroundColor = useSelector(
    (state) => state.settings.desktopBackgroundColor
  );
  const desktopIconColor = useSelector(
    (state) => state.settings.desktopIconColor
  );

  const defaultDesktopColor = useRef(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--c-desktop-default-bg')
      .trim()
  );
  const defaultIconColor = useRef(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--c-rgb-desktop-default-bg-contrast')
      .trim()
  );

  const handleClick = () => {
    handleChangeBackground(
      defaultDesktopColor.current,
      defaultIconColor.current
    );
  };

  useEffect(() => {
    
    document.documentElement.style.setProperty(
      '--c-desktop-bg',
      desktopBackgroundColor
    );
    document.documentElement.style.setProperty(
      '--c-rgb-desktop-bg-contrast',
      desktopIconColor
    );
  }, [desktopBackgroundColor, desktopIconColor]);

  return (
    <div className="settings-change-background">
      <h3>Pick a color to change the desktop background</h3>
      <CustomColorPicker
        backgroundColor={desktopBackgroundColor}
        iconColor={desktopIconColor}
        handleChangeBackground={handleChangeBackground}
      />
      <Button onClick={handleClick} type="submit">
        Default
      </Button>
    </div>
  );
};
