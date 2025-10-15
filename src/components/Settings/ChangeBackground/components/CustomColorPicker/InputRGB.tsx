import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Slider } from '@/components/ui';
import { Language } from '@/store/slices/settings';

type RGB = { r: number; g: number; b: number };

const hexToRgb = (hex: string): RGB => {
  const shortRegex = /^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i;
  const longRegex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
  const result = longRegex.exec(hex) || shortRegex.exec(hex);

  if (!result) return { r: 0, g: 0, b: 0 };

  const parse = (val: string) =>
    parseInt(val.length === 1 ? val + val : val, 16);

  return {
    r: parse(result[1]),
    g: parse(result[2]),
    b: parse(result[3]),
  };
};

const rgbToHex = ({ r, g, b }: RGB): string =>
  [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

const InputRGB = ({
  language,
  handleChangeColor,
  inputColor,
}: {
  language: Language;
  handleChangeColor: (hex: string) => void;
  inputColor: string;
}) => {
  const [rgb, setRgb] = useState<RGB>(() => hexToRgb(inputColor));

  // Atualiza RGB quando inputColor muda externamente
  useEffect(() => {
    setRgb(hexToRgb(inputColor));
  }, [inputColor]);

  const updateChannel = useCallback(
    (channel: keyof RGB, value: number) => {
      setRgb((prev) => {
        const updated = { ...prev, [channel]: value };
       
        return updated;
      });
    },
    [handleChangeColor]
  );

  const colorsData = useMemo(() => {
    const labels = {
      r: language === 'eng' ? 'Red' : 'Vermelho',
      g: language === 'eng' ? 'Green' : 'Verde',
      b: language === 'eng' ? 'Blue' : 'Azul',
    };

    return (['r', 'g', 'b'] as (keyof RGB)[]).reduce((acc, key) => {
      acc[key] = {
        id: key,
        label: labels[key],
        min: 0,
        max: 255,
        step: 1,
        value: rgb[key],
        handler: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(e.target.value);
          if (!isNaN(value) && value >= 0 && value <= 255) {
            updateChannel(key, value);
          }
        },
      };
      return acc;
    }, {} as Record<keyof RGB, any>);
  }, [rgb, language, updateChannel]);

  const handleSliderInput = useCallback(
    (key: keyof RGB, value: number) => {
      updateChannel(key, value);
    },
    [updateChannel]
  );

  return (
    <div className="change-background__color-input-wrapper">
      <Slider
        sliderObjectData={colorsData}
        sliderInitialValues={rgb}
        sliderClass="change-background__color-slider"
        sliderValuesHandler={handleSliderInput}
        onMouseUp={() => handleChangeColor(rgbToHex(rgb))}
        onTouchEnd={() => handleChangeColor(rgbToHex(rgb))}
        accentColors={[
          `linear-gradient(to right, rgb(0,${rgb.g},${rgb.b}), rgb(255,${rgb.g},${rgb.b}))`,
          `linear-gradient(to right, rgb(${rgb.r},0,${rgb.b}), rgb(${rgb.r},255,${rgb.b}))`,
          `linear-gradient(to right, rgb(${rgb.r},${rgb.g},0), rgb(${rgb.r},${rgb.g},255))`,
        ]}
        inputNumberActive={false}
      />

      <div className="flex flex-row gap-2 flex-space-evenly">
        {Object.values(colorsData).map((value) => (
          <input
            key={value.id}
            type="number"
            min={0}
            max={255}
            value={value.value}
            onChange={value.handler}
            onMouseUp={() => handleChangeColor(rgbToHex(rgb))}
            onTouchEnd={() => handleChangeColor(rgbToHex(rgb))}
            onKeyUp={() => handleChangeColor(rgbToHex(rgb))}
            className={`change-background__color-input ${value.id}`}
            title={value.label}
            placeholder={value.id.toUpperCase()}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(InputRGB);
