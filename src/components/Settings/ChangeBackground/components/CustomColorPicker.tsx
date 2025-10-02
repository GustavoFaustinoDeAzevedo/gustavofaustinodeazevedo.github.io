import { HexColorPicker } from 'react-colorful';
import useMouseEvents from '@/hooks/useMouseEvents';
import { colord } from 'colord';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

type CustomColorPickerProps = {
  language: string;
  backgroundColor?: string;
  handleChangeBackground?: any;
  defaultDesktopColor?: string;
  displayChoicesContent?: any;
};

type ColorCodeTypes = {
  [key: string]: () => string;
};

const CustomColorPicker = ({
  language,
  backgroundColor,
  handleChangeBackground,
  defaultDesktopColor,
  displayChoicesContent,
}: CustomColorPickerProps) => {
  const [colorCodeType, setColorCodeType] = useState('rgb');
  const [outputColor, setOutputColor] = useState(backgroundColor);
  const [colorHex, setColorHex] = useState(backgroundColor);
  const inputRef = useRef(backgroundColor);

  const colorCodeTypes: ColorCodeTypes = {
    rgb: () => {
      const rgb = colord(colorHex as string).toRgb();
      return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    },
    hsl: () => {
      const hsl = colord(colorHex as string).toHsl();
      colord(colorHex as string).toHsl();
      return `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
    },
    hex: () => {
      return colorHex as string;
    },
  };

  const getContrastYIQ = (color) => {
    const hexcolor = color.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffffff';
  };

  const handleChangeColor = (color: string) => {
    setColorHex(color);
  };

  const handleColorCodeTypeChange = (e: any) => {
    setColorCodeType(e.target.value);
  };

  const handleInputChange = (e: any) => {
    const hexValue =
      e.target.name === 'hex' ? e.target.value : colord(e.target.value).toHex();
    setColorHex(e.target.value);
    handleChangeBackground('color', hexValue);
  };

  useMouseEvents({
    onMouseUp: () => {
      handleChangeBackground('color', colorHex);
    },
  });
  return (
    <>
      <HexColorPicker
        color={backgroundColor || defaultDesktopColor}
        onChange={handleChangeColor}
      />
      <div className="change-background__color-input-wrapper">
        <div className="change-background__color-code-selector-wrapper">
          <select
            name="colorCodeType"
            id="colorCodeType"
            title={
              language === 'eng' ? 'Color Code Type' : 'Tipo de Código de Cor'
            }
            value={colorCodeType}
            onChange={handleColorCodeTypeChange}
            className="change-background__color-code-selector"
          >
            {Object.keys(colorCodeTypes).map((colorCodeType) => (
              <option key={colorCodeType} value={colorCodeType}>
                {colorCodeType.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="inputColor"
          id="inputColor"
          placeholder={language === 'eng' ? 'Color Code' : 'Código de Cor'}
          value={colorCodeTypes[colorCodeType]()}
          ref={inputRef as any}
          onChange={handleInputChange}
          className="change-background__color-input"
        ></input>
      </div>
      <Button
        onClick={() => handleChangeColor(defaultDesktopColor as string)}
        type="submit"
      >
        {displayChoicesContent?.settings?.picker?.button}
      </Button>
    </>
  );
};

export default CustomColorPicker;
