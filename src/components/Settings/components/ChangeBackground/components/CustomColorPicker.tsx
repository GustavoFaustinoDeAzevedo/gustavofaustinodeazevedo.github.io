import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '@components/ui/Button';
import InputRGB from './InputRGB';
import InputHEX from './InputHEX';
import { Language } from '@/store/slices/settings';

type CustomColorPickerProps = {
  language: Language;
  backgroundColor?: string;
  handleChangeBackground?: (key: string, value: string) => void;
  defaultDesktopColor?: string;
  displayChoicesContent?: {
    settings?: {
      picker?: {
        button?: string;
      };
    };
  };
};

const normalizeHex = (color: string) => {
  const cleaned = color.replace(/[^0-9A-F]/gi, '').toUpperCase();
  return `#${cleaned}`;
};

const CustomColorPicker = ({
  language,
  backgroundColor = '',
  handleChangeBackground,
  defaultDesktopColor = '',
  displayChoicesContent,
}: CustomColorPickerProps) => {
  const [inputColor, setInputColor] = useState(normalizeHex(backgroundColor));

  useEffect(() => {
    const formatted = normalizeHex(backgroundColor);
    if (formatted !== inputColor) {
      setInputColor(formatted);
    }
  }, [backgroundColor]);

  const handleChangeColor = useCallback(
    (color: string) => {
      const formatted = normalizeHex(color);
      setInputColor(formatted);
      handleChangeBackground?.('color', formatted);
    },
    [handleChangeBackground]
  );

  return (
    <div className="change-background__color-picker">
      <InputRGB
        language={language}
        inputColor={inputColor}
        className={'change-background__color-rgb'} //main
        handleChangeColor={handleChangeColor}
      />
      <div className="change-background__color-hex">
        <p className="font-courier">HEX</p>
        <InputHEX
          language={language}
          inputColor={inputColor}
          handleChangeColor={handleChangeColor}
        />
      </div>
      <Button
        onClick={() => handleChangeColor(defaultDesktopColor)}
        type="submit"
        className="change-background__color-default-button"
      >
        {displayChoicesContent?.settings?.picker?.button ?? 'Reset'}
      </Button>
    </div>
  );
};

export default React.memo(CustomColorPicker);
