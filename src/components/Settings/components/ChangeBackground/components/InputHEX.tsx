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
    <div className="input-hex__container">
      <strong className="input-hex__highlight">
        <span>#</span>
        <span className="input-hex__highlight--red">
          {hex.replace('#', '').slice(0, 2)}
        </span>
        <span className="input-hex__highlight--green">
          {hex.replace('#', '').slice(2, 4)}
        </span>
        <span className="input-hex__highlight--blue">
          {hex.replace('#', '').slice(4, 6)}
        </span>
      </strong>
      <input
        autoComplete="off"
        type="text"
        name="inputColor"
        id="inputColor"
        maxLength={7}
        title={language === 'eng' ? 'Hex Color' : 'Cor em Hexadecimal'}
        value={`${hex.replace('#', '')}`}
        onChange={handleChange}
        placeholder="RRGGBB"
        className="input-hex"
      />
    </div>
  );
};

export default memo(InputHEX);
