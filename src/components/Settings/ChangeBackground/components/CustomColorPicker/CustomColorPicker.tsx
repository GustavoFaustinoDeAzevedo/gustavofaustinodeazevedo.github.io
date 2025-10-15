import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
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
    <div className="change-background__color-input-wrapper">
      <div className="change-background__color-code-selector-wrapper flex flex-column gap-2">
        <InputRGB
          language={language}
          inputColor={inputColor}
          handleChangeColor={handleChangeColor}
        />
        <div className="flex gap-2 flex-space-evenly flex-align-baseline">
          <div className="flex flex-row gap-1">
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
          >
            {displayChoicesContent?.settings?.picker?.button ?? 'Reset'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomColorPicker;
