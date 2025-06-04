import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const CustomColorPicker = () => {
  const [color, setColor] = useState('#0d0d0dFF');

  function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  }

  const changeColor = (newColor) => {
    const contrastColor = getContrastYIQ(newColor);
    document.documentElement.style.setProperty(
      '--c-background1-contrast',
      contrastColor
    );
    document.documentElement.style.setProperty('--c-background1', newColor);
    setColor(newColor);
  };
  return <HexColorPicker color={color} onChange={changeColor} />;
};
export default CustomColorPicker;
