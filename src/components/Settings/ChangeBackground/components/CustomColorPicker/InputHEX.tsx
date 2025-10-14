import { Language } from '@/store/slices/settings';
import React, { use, useCallback } from 'react';

const InputHEX = ({
  language,
  inputColor,
  handleChangeColor,
}: {
  language: Language;
  inputColor: string;
  handleChangeColor: any;
}) => {
  const hexRegex = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    handleChangeColor(value);
  };

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();

      if (hexRegex.test(value)) {
        // valor válido (#RGB ou #RRGGBB)
        handleChangeColor(value);
        return;
      }

      // tenta validar apenas os 3 primeiros caracteres
      const sliced = value.slice(0, 3);
      handleChangeColor(hexRegex.test(sliced) ? sliced : '000');
    },
    [handleChangeColor]
  );

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
        value={inputColor.toUpperCase().replace('#', '')}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={'RRGGBB'}
        className="change-background__color-input width-4 txt-color-info "
      />
    </div>
  );
};

export default React.memo(InputHEX) as typeof InputHEX;
