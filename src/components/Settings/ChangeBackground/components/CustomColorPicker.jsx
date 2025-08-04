import { HexColorPicker } from 'react-colorful';
import useMouseEvents from '../../../../hooks/useMouseEvents';
import { useRef } from 'react';
import Button from '../../../ui/Button';

const CustomColorPicker = ({
  backgroundColor,
  handleChangeBackground,
  defaultDesktopColor,
  displayChoicesContent,
}) => {
  const colorRef = useRef(backgroundColor);

  const getContrastYIQ = (color) => {
    const hexcolor = color.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  };

  const handleButtonClick = () => {
    colorRef.current = defaultDesktopColor;
    handleChangeBackground({
      backgroundColor: colorRef.current,
      backgroundColorContrast: getContrastYIQ(colorRef.current),
    });
  };

  useMouseEvents({
    onMouseUp: () =>
      handleChangeBackground({
        backgroundColor: colorRef.current,
        backgroundColorContrast: getContrastYIQ(colorRef.current),
      }),
  });
  return (
    <>
      <HexColorPicker
        color={backgroundColor || defaultDesktopColor}
        onChange={(color) => (colorRef.current = color)}
      />
      <Button onClick={handleButtonClick} type="submit">
        {displayChoicesContent?.button}
      </Button>
    </>
  );
};

export default CustomColorPicker;
