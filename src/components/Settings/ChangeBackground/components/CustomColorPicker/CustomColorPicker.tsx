import { HexColorPicker } from 'react-colorful';
import { colord } from 'colord';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import InputRGB from './InputRGB';
import InputHSL from './InputHSL';

type ColorTypes = 'rgb' | 'hex' | 'hsl';

type CustomColorPickerProps = {
  language: string;
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
  const [colorCodeType, setColorCodeType] = useState<ColorTypes>('rgb');
  const [rawInput, setRawInput] = useState(backgroundColor || '');
  const [inputColor, setInputColor] = useState(backgroundColor || '');
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
        if (p === ',' && !raw.endsWith(',')) return ', ';
        if (raw === ',') return '000, 000, 000';
        if (p === ',' && parts[i - 1] === ',') return '';
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

  return (
    <>
      <HexColorPicker
        color={inputColor}
        onChange={handleChangeColor}
        onMouseUp={() => handleChangeBackground?.('color', inputColor)}
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
            {['rgb', 'hex', 'hsl'].map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {colorCodeType === 'rgb' && <InputRGB />}
        {colorCodeType === 'hsl' && <InputHSL />}
        {colorCodeType === 'hex' && (
          <div className="change-background__color-input-wrapper">
            <input
              key={colorCodeType}
              autoComplete="off"
              type="text"
              name="inputColor"
              id="inputColor"
              value={rawInput}
              onChange={handleInputChange}
              // onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="change-background__color-input"
            />
          </div>
        )}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button
        onClick={() => handleChangeColor(defaultDesktopColor || '')}
        type="submit"
      >
        {displayChoicesContent?.settings?.picker?.button}
      </Button>
    </>
  );
};

export default CustomColorPicker;
