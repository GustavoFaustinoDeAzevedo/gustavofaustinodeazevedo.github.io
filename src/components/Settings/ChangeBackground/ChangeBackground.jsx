import CustomColorPicker from './utils';
import Button from '../../ui/Button';
import { useRef, useState, useEffect } from 'react';

export const ChangeBackground = () => {
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

  const [backgroundColor, setBackgroundColor] = useState(
    defaultDesktopColor.current
  );
  const [iconColor, setIconColor] = useState(defaultIconColor.current);

  const handleClick = () => {
    setBackgroundColor(defaultDesktopColor.current);
    setIconColor(defaultIconColor.current);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--c-desktop-bg',
      backgroundColor
    );
    document.documentElement.style.setProperty(
      '--c-rgb-desktop-bg-contrast',
      iconColor
    );
  }, [backgroundColor]);

  return (
    <div className="settings-change-background">
      <h3>Pick a color to change the desktop background</h3>
      <CustomColorPicker
        backgroundColor={backgroundColor}
        iconColor={iconColor}
        setBackgroundColor={setBackgroundColor}
        setIconColor={setIconColor}
      />
      <Button onClick={handleClick} type="submit">
        Default
      </Button>
    </div>
  );
};
