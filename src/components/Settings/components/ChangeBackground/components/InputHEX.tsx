import { Language } from '@/store/slices/settings';
import { memo, useEffect, useState } from 'react';

type InputHEXProps = {
  language: Language;
  inputColor: string;
  handleChangeColor: (hex: string) => void;
};

const InputHEX = ({
  language,
  inputColor,
  handleChangeColor,
}: InputHEXProps) => {
  const [hex, setHex] = useState(formatHex(inputColor));
  const hexRegex = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;

  function formatHex(value: string) {
    const cleaned = value.replace(/[^0-9A-F]/gi, '').toUpperCase();
    return `#${cleaned}`;
  }

  useEffect(() => {
    const formatted = formatHex(inputColor);
    if (formatted !== hex) {
      setHex(formatted);
    }
  }, [inputColor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatHex(raw);
    setHex(formatted);

    if (hexRegex.test(formatted)) {
      handleChangeColor(formatted);
    }
  };

  return (
    <div className="change-background__hex-input-wrapper flex flex-row flex-flex-start flex-align-center gap-0">
      <div className="text-bold font-courier">#</div>
      <input
        autoComplete="off"
        type="text"
        name="inputColor"
        id="inputColor"
        maxLength={6}
        title={language === 'eng' ? 'Hex Color' : 'Cor em Hexadecimal'}
        value={hex.replace('#', '')}
        onChange={handleChange}
        placeholder="RRGGBB"
        className="change-background__color-main-input width-4 text-color-info"
      />
    </div>
  );
};

export default memo(InputHEX);
