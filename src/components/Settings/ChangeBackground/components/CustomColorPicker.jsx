import React, { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export const CustomColorPicker = ({
  backgroundColor,
  handleChangeBackground,
  defaultDesktopColor,
}) => {
  return (
    <HexColorPicker
      color={backgroundColor || defaultDesktopColor}
      onChange={handleChangeBackground}
    />
  );
};
