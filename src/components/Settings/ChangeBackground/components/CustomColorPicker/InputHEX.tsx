import { Language } from '@/store/slices/settings';
import { memo, useEffect, useState } from 'react';

const InputHEX = ({
  language,
  inputColor,
  handleChangeColor,
}: {
  language: Language;
  inputColor: string;
  handleChangeColor: any;
}) => {
  const [hex, setHex] = useState(inputColor);
  const hexRegex = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

  useEffect(() => setHex(inputColor), [inputColor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setHex(value);
    if (hexRegex.test(value)) {
      // valor válido (#RGB ou #RRGGBB)
      handleChangeColor(value);
    }
  };

  return (
    <div className="change-background__color-input-wrapper flex flex-row flex-flex-start flex-align-center gap-0">
      <div className="txt-bold font-courier">#</div>
      <input
        key={'hex'}
        autoComplete="off"
        type="text"
        name="inputColor"
        id="inputColor"
        maxLength={6}
        title={language === 'eng' ? 'Hex Color' : 'Cor em Hexadecimal'}
        value={hex.toUpperCase().replace('#', '')}
        onChange={handleChange}
        // onBlur={handleBlur}
        placeholder={'RRGGBB'}
        className="change-background__color-input width-4 txt-color-info "
      />
    </div>
  );
};

export default memo(InputHEX) as typeof InputHEX;
