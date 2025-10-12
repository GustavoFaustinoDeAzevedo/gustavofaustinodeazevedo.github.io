import { Language } from '@/store/slices/settings';

const InputHEX = ({
  language,
  inputColor,
  setInputColor,
}: {
  language: Language;
  inputColor: string;
  setInputColor: any;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputColor(e.target.value.toUpperCase());
  };

  const handleBlur = () => {
    setInputColor(inputColor.toUpperCase());
  };

  return (
    <div className="change-background__color-input-wrapper flex flex-row flex-flex-start flex-align-center gap-0">
      <i className="txt-bold font-courier">#</i>
      <input
        key={'hex'}
        autoComplete="off"
        type="text"
        name="inputColor"
        id="inputColor"
        maxLength={6}
        title={language === 'eng' ? 'Hex Color' : 'Cor em Hexadecimal'}
        value={inputColor.toUpperCase()}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={'RRGGBB'}
        className="change-background__color-input width-4 txt-color-info margin-left-1"
      />
    </div>
  );
};

export default InputHEX;
