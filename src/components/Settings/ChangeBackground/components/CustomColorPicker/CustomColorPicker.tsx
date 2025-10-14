import { HexColorPicker } from 'react-colorful';
import { colord } from 'colord';
import { use, useCallback, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import InputRGB from './InputRGB';
import InputHEX from './InputHEX';
import { Language } from '@/store/slices/settings';

type ColorTypes = 'rgb' | 'hex' | 'hsl';

type CustomColorPickerProps = {
  language: Language;
  backgroundColor?: string;
  handleChangeBackground?: (key: string, value: string) => void;
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
  // useState ===============================================================

  const [inputColor, setInputColor] = useState(
    (backgroundColor as string) || ''
  );

  // picker ===================================================================

  const handleChangeColor = useCallback(
    (color: string) => {
      setInputColor(color);
      handleChangeBackground?.(
        'color',
        color.includes('#') ? color : '#' + color
      );
    },
    [setInputColor, handleChangeBackground]
  );
  return useMemo(
    () => (
      <>
        <div className="change-background__color-input-wrapper">
          <div className="change-background__color-code-selector-wrapper flex flex-column gap-2 ">
            <InputRGB
              language={language}
              handleChangeColor={handleChangeColor}
              inputColor={inputColor}
              setInputColor={setInputColor}
            />
            <div className="flex gap-2 flex-space-evenly flex-align-baseline">
              <div className="flex flex-row gap-1">
                <p className="font-courier">HEX</p>
                <InputHEX
                  inputColor={inputColor}
                  language={language}
                  handleChangeColor={handleChangeColor}
                />
              </div>
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
    ),
    [
      language,
      inputColor,
      handleChangeColor,
      defaultDesktopColor,
      displayChoicesContent,
    ]
  );
};

export default CustomColorPicker;
