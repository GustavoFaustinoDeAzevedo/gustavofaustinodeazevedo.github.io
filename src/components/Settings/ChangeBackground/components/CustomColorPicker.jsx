import { HexColorPicker } from 'react-colorful';
import useMouseEvents from '../../../../hooks/useMouseEvents';
import { useRef } from 'react';

export const CustomColorPicker = ({
  backgroundColor,
  handleChangeBackground,
  defaultDesktopColor,
}) => {
  const colorRef = useRef(backgroundColor);
  useMouseEvents({
    onMouseUp: () => handleChangeBackground(colorRef.current),
  });
  return (
    <HexColorPicker
      color={backgroundColor || defaultDesktopColor}
      onChange={(color) => (colorRef.current = color)}
    />
  );
};
