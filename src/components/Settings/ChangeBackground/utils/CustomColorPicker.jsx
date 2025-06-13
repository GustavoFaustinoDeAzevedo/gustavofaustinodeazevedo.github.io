import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export const CustomColorPicker = ({
  backgroundColor,
  handleChangeBackground,
}) => {
  function getContrastYIQ(color) {
    const hexcolor = color.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '0,0,0' : '255,255,255';
  }

  const changeColor = (newColor) => {
    const contrastColor = getContrastYIQ(newColor);
    handleChangeBackground(newColor, contrastColor);
  };

  return <HexColorPicker color={backgroundColor} onChange={changeColor} />;
};
