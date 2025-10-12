import { HexColorPicker } from 'react-colorful';
import { colord } from 'colord';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import InputRGB from './InputRGB';
import InputHEX from './InputHEX';
import { Language } from '@/store/slices/settings';

type ColorTypes = 'rgb' | 'hex' | 'hsl';

type CustomColorPickerProps = {
  language: Language;
  backgroundColor?: string;
  handleChangeBackground?: (type: string, value: string) => void;
  defaultDesktopColor?: string;
  displayChoicesContent?: any;
};

const CustomColorPicker = ({
  language,
  backgroundColor,
  handleChangeBackground,
  defaultDesktopColor,
  displayChoicesContent,
}: CustomColorPickerProps) => {
  const hexToRgb = (hex: string | null | undefined): string | null => {
    if (!hex) return null;

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    return result
      .slice(1)
      .map((c) => parseInt(c, 16))
      .join(', ');
  };
  const [colorCodeType, setColorCodeType] = useState<ColorTypes>('rgb');
  const [rawInput, setRawInput] = useState(backgroundColor || '');
  const [inputColor, setInputColor] = useState(backgroundColor || '');
  const [inputColorRGB, setInputColorRGB] = useState(
    hexToRgb(backgroundColor as string) || ''
  );
  const [error, setError] = useState('');
  const colorTypesLength = {
    rgb: 11,
    hex: 7,
    hsl: 13,
  };

  const placeholder =
    colorCodeType === 'hex'
      ? '#RRGGBB'
      : colorCodeType === 'rgb'
      ? '255, 255, 255'
      : '360, 100%, 100%';

  const converters = {
    hex: (color: ReturnType<typeof colord>) => color.toHex(),
    rgb: (color: ReturnType<typeof colord>) => {
      const { r, g, b } = color.toRgb();
      return `${String(r).padStart(3, '0')}, ${String(g).padStart(
        3,
        '0'
      )}, ${String(b).padStart(3, '0')}`;
      // return color.toRgbString();
    },
    hsl: (color: ReturnType<typeof colord>) => {
      // const { h, s, l } = color.toHsl();
      // return `${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%`;
      return color.toHslString();
    },
  };

  const colorFormater = (raw: string): string => {
    const cleaned = raw.replace(/(\d)\s+(\d)/g, '$1$2');
    const parts = cleaned.match(/\d+|, ?/g) ?? [];

    const formatted = parts
      .map((p, i) => {
        if (p === ',' && raw.endsWith(', ')) return '';
        if (p === ',') return ', ';
        if (raw === ',') return '000, 000, 000';
        if (p.length < 3 && i < parts.length - 1 && !p.includes(','))
          return p.padStart(3, '0');
        if (p.length > 3) return `${p.slice(0, 3)}, ${p.slice(3)}`;
        return p;
      })
      .join('');

    return formatted;
  };

  //hex picker ===================================================================

  const handleChangeColor = (color: string) => {
    setInputColor(color);
    if (colorCodeType === 'hex') {
      setRawInput(color.toUpperCase());
      return;
    }
    const colordColor = colord(color);
    const converted = converters[colorCodeType](colordColor);

    setRawInput(converted);
  };

  //select =======================================================================

  const handleColorCodeTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newType = e.target.value as ColorTypes;
    setColorCodeType(newType);
    setRawInput(converters[newType](colord(inputColor)));
  };

  //input =======================================================================

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.replace(/\s+/g, '').length >
      colorTypesLength[colorCodeType]
    )
      return e.target.value.slice(-2, -1);

    const formatted = colorFormater(e.target.value);
    setRawInput(formatted);
  };

  const handleBlur = () => {
    if (colorCodeType === 'hex') return;
    const formatted = colorFormater(rawInput);

    setRawInput(formatted);
  };

  const handleFocus = () => {
    const color = colord(inputColor);
    const converted = converters[colorCodeType](color).toUpperCase();
    setRawInput(converted);
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };

  return (
    <>
      {/* <HexColorPicker
        color={inputColor}
        onChange={handleChangeColor}
        onMouseUp={() => handleChangeBackground?.('color', inputColor)}
      /> */}

      <div className="change-background__color-input-wrapper">
        <div className="change-background__color-code-selector-wrapper flex flex-column gap-2 ">
          <InputRGB
            language={language}
            setInputColor={setInputColorRGB}
            inputColor={inputColorRGB}
          />
          <div className='flex gap-2 flex-space-evenly flex-align-baseline'>
          <InputHEX
            inputColor={inputColor}
            language={language}
            setInputColor={setInputColor}
          />
          <Button
            onClick={() => handleChangeColor(defaultDesktopColor || '')}
            type="submit"
          >
            {displayChoicesContent?.settings?.picker?.button}
          </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomColorPicker;
