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
  [key: string]: (color: string) => string;
};

const CustomColorPicker = ({
  language,
  backgroundColor,
  handleChangeBackground,
  defaultDesktopColor,
  displayChoicesContent,
}: CustomColorPickerProps) => {
  const [colorCodeType, setColorCodeType] = useState('rgb');
  const [colorHex, setColorHex] = useState(backgroundColor);
  const inputRef = useRef(backgroundColor);
  const colorCodeTypeList = ['rgb', 'hex', 'hsl'];

  const cleanColorCode = (colorArray: string[]) => {
    return colorArray.map((value) => {
      const num = Number(value);
      return Number.isInteger(num) && num >= 0 ? num : 0;
    });
  };

  const colorCodeTypeOutput: ColorCodeTypes = {
    rgb: (color: string) => {
      const rgb = colord(color).toRgb();
      return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    },
    hsl: (color: string) => {
      const hsl = colord(color).toHsl();
      colord(color as string).toHsl();
      return `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
    },
    hex: (color: string) => {
      return color as string;
    },
  };

  const colorCodeTypeInput: ColorCodeTypes = {
    rgb: (color: string) => {
      const rgb = color.split(', ');
      const cleanRgb = cleanColorCode(rgb);
      return `rgb(${cleanRgb[0]}, ${cleanRgb[1]}, ${cleanRgb[2]})`;
    },
    hsl: (color: string) => {
      const hsl = color.split(', ');
      const cleanHsl = cleanColorCode(hsl);
      return `hsl(${cleanHsl[0]}, ${cleanHsl[1]}%, ${cleanHsl[2]}%)`;
    },
    hex: (color: string) => {
      return color as string;
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
    if (colorCodeType === 'hex') {
      setColorHex(e.target.value);
      handleChangeBackground('color', e.target.value);
      return;
    }
    const inputColor = colorCodeTypeInput[colorCodeType](e.target.value);
    const inputColorHex = colord(inputColor).toHex();
    setColorHex(inputColor);
    handleChangeBackground('color', inputColorHex);
  };

  // useMouseEvents({
  //   onMouseUp: () => {
  //     handleChangeBackground('color', colorHex);
  //   },
  // });
  return (
    <>
      <HexColorPicker
        color={backgroundColor || defaultDesktopColor}
        onChange={handleChangeColor}
        onMouseUp={() => {
          handleChangeBackground('color', colorHex);
        }}
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
            {colorCodeTypeList.map((colorCodeType) => (
              <option key={colorCodeType} value={colorCodeType}>
                {colorCodeType.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <input
          autoComplete="off"
          type="text"
          name="inputColor"
          id="inputColor"
          placeholder={language === 'eng' ? 'Color Code' : 'Código de Cor'}
          value={colorCodeTypeOutput[colorCodeType](colorHex as string)}
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
