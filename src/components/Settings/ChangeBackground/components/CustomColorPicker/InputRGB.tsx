import { Slider } from '@/components/ui';
import { Language } from '@/store/slices/settings';
import { re } from 'mathjs';
import React, { useState, useMemo, useCallback, useEffect } from 'react';

const InputRGB = ({
  language,
  handleChangeColor,
  inputColor,
  setInputColor,
}: {
  language: Language;
  handleChangeColor: (hex: string) => void;
  inputColor: string;
  setInputColor: (color: string) => void;
}) => {
  console.log(inputColor, 'inputColor');

  // Converte RGB para HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  };

  // Converte HEX inicial para objeto RGB =================================
  const initialRgb = useCallback(() => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(inputColor);
    if (!result) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }, [inputColor]);

  // Estado local para os valores RGB e HEX ===============================
  const [rgb, setRgb] = useState(initialRgb);
  const { r, g, b } = useMemo(() => rgb, [rgb]);
  const hexColor = useMemo(() => rgbToHex(r, g, b), [r, g, b]);

  // sempre que inputColor mudar, atualiza o estado dos sliders
  useEffect(() => {
    const shortRegex = /^#?([0-9A-F])([0-9A-F])([0-9A-F])$/i;
    const longRegex = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;

    let result = longRegex.exec(inputColor) || shortRegex.exec(inputColor);
    if (!result) return;

    const newRgb = {
      r: parseInt(
        result[1].length === 1 ? result[1] + result[1] : result[1],
        16
      ),
      g: parseInt(
        result[2].length === 1 ? result[2] + result[2] : result[2],
        16
      ),
      b: parseInt(
        result[3].length === 1 ? result[3] + result[3] : result[3],
        16
      ),
    };

    setRgb(newRgb);
  }, [inputColor]);

  // Atualiza estado e notifica o pai =====================================
  const handleSliderInput = useCallback(
    (key: keyof typeof rgb, newValue: number) => {
      setRgb((prev) => {
        const updated = { ...prev, [key]: newValue };
        if (
          updated.r >= 0 &&
          updated.r <= 255 &&
          updated.g >= 0 &&
          updated.g <= 255 &&
          updated.b >= 0 &&
          updated.b <= 255
        ) {
          setInputColor(hexColor);
          setRgb((prev) => ({ ...prev, [key]: newValue }));
        }
        return updated;
      });
    },
    [handleChangeColor]
  );

  const handleSliderCommit = useCallback(() => {
    handleChangeColor(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, [rgb, handleChangeColor]);

  // Dados dos sliders e inputs memoizados =============================
  const colorsData = useMemo(
    () => ({
      r: {
        id: 'r',
        label: language === 'eng' ? 'Red' : 'Vermelho',
        min: 0,
        max: 255,
        step: 1,
        value: r,
        handler: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(e.target.value);
          if (value >= 0 && value <= 255) {
            setRgb((prev) => ({ ...prev, r: value }));
            handleChangeColor(rgbToHex(value, g, b));
          }
        },
      },
      g: {
        id: 'g',
        label: language === 'eng' ? 'Green' : 'Verde',
        min: 0,
        max: 255,
        step: 1,
        value: g,
        handler: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(e.target.value);
          if (value >= 0 && value <= 255) {
            setRgb((prev) => ({ ...prev, g: value }));
            handleChangeColor(rgbToHex(r, value, b));
          }
        },
      },
      b: {
        id: 'b',
        label: language === 'eng' ? 'Blue' : 'Azul',
        min: 0,
        max: 255,
        step: 1,
        value: b,
        handler: (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(e.target.value);
          if (value >= 0 && value <= 255) {
            setRgb((prev) => ({ ...prev, b: value }));
            handleChangeColor(rgbToHex(r, g, value));
          }
        },
      },
    }),
    [r, g, b, language]
  );

  return (
    <div className="change-background__color-input-wrapper">
      <Slider
        sliderObjectData={colorsData}
        sliderInitialValues={rgb}
        sliderClass="change-background__color-slider"
        sliderValuesHandler={handleSliderInput}
        onMouseUp={handleSliderCommit}
        onTouchEnd={handleSliderCommit}
        accentColors={[
          `linear-gradient(to right, rgb(0,${g},${b}), rgb(255,${g},${b}))`,
          `linear-gradient(to right, rgb(${r},0,${b}), rgb(${r},255,${b}))`,
          `linear-gradient(to right, rgb(${r},${g},0), rgb(${r},${g},255))`,
        ]}
        inputNumberActive={false}
      />

      <div className="flex flex-row gap-2 flex-space-evenly">
        {Object.values(colorsData).map((value) => (
          <input
            type="number"
            min={0}
            max={255}
            key={value.id}
            value={value.value}
            onChange={value.handler}
            onWheel={(e) => e.preventDefault()}
            onMouseUp={() => {
              handleChangeColor(rgbToHex(r, g, b));
            }}
            onBlur={() => handleChangeColor(rgbToHex(r, g, b))}
            className={`change-background__color-input ${value.id}`}
            title={value.label}
            placeholder={value.id.toUpperCase()}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(InputRGB) as typeof InputRGB;
