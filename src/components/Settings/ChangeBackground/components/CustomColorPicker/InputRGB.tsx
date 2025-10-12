import { Slider } from '@/components/ui';
import { Language } from '@/store/slices/settings';
import { useState } from 'react';

const InputRGB = ({
  language,
  setInputColor,
  inputColor,
}: {
  language: Language;
  setInputColor: any;
  inputColor: string;
}) => {
  const [rgb, setRgb] = useState({
    r: Number(inputColor.split(',')[0].trim()),
    g: Number(inputColor.split(',')[1].trim()),
    b: Number(inputColor.split(',')[2].trim()),
  });
  const { r, g, b } = rgb;
  const handleInput = () => {
    if (r.length === 0 || g.length === 0 || b.length === 0) return;
    if (Number(r) > 255 || Number(g) > 255 || Number(b) > 255) return;
    setInputColor(`rgb(${r}, ${g}, ${b})`);
  };

  const handleSliderInput = (key: string, newValue: number) => {
    setRgb((prev) => ({ ...prev, [key]: newValue }));
    if (key === 'r' && (newValue < 0 || newValue > 255)) return;
    if (key === 'g' && (newValue < 0 || newValue > 255)) return;
    if (key === 'b' && (newValue < 0 || newValue > 255)) return;
    setInputColor(
      `rgb(${key === 'r' ? newValue : r}, ${key === 'g' ? newValue : g}, ${
        key === 'b' ? newValue : b
      })`
    );
  };

  const colorsData = {
    r: {
      id: 'r',
      label: language === 'eng' ? 'Red' : 'Vermelho',
      min: 0,
      max: 255,
      step: 1,
      default: Number(r),
      handler: (e: any) => {
        const value = e.target.value;
        if (value.length > 3) return;
        if (Number(value) > 255) return;
        setRgb((prev) => ({ ...prev, r: value }));
      },
    },
    g: {
      id: 'g',
      label: language === 'eng' ? 'Green' : 'Verde',
      min: 1,
      max: 255,
      step: 1,
      default: Number(g),
      handler: (e: any) => {
        const value = e.target.value;
        if (value.length > 3) return;
        if (Number(value) > 255) return;
        setRgb((prev) => ({ ...prev, g: value }));
      },
    },
    b: {
      id: 'b',
      label: language === 'eng' ? 'Blue' : 'Azul',
      min: 0,
      max: 255,
      step: 1,
      default: Number(b),
      handler: (e: any) => {
        const value = e.target.value;
        if (value.length > 3) return;
        if (Number(value) > 255) return;
        setRgb((prev) => ({ ...prev, b: value }));
      },
    },
  };

  return (
    <div className="change-background__color-input-wrapper">
      <Slider
        sliderObjectData={colorsData}
        sliderInitialValues={rgb}
        sliderValuesHandler={handleSliderInput}
        inputNumberActive={false}
      />
      <div className="flex flex-row gap-2 flex-space-evenly ">
        {Object.values(colorsData).map((value) => (
          <input
            type="number"
            min={0}
            max={255}
            maxLength={3}
            key={value.id}
            value={value.default}
            onInput={value.handler}
            className={`change-background__color-input ${value.id}`}
            title={value.label}
            placeholder={value.id.toUpperCase()}
          />

          // <input
          //   type="number"
          //   min={0}
          //   max={255}
          //   maxLength={3}
          //   onInput={handleInput}
          //   className="change-background__color-input g"
          //   title={language === 'eng' ? 'Green' : 'Verde'}
          //   placeholder="G"
          // />
        ))}
      </div>
    </div>
  );
};

export default InputRGB;
