export interface RadioOption {
  id: string;
  label: string;
  title: string;
  value: string;
  [key: string]: any;
}

export interface RadioMapperProps {
  name: string;
  options: RadioOption[] | Record<string, RadioOption>;
  selectedValue: string;
  onChange: (value: string) => void;
  fieldsetClassName?: string;
  legendClassName?: string;
  fieldsetLegend?: string;
  radioClassName?: string;
}

const RadioMapper = ({
  name,
  options,
  selectedValue,
  onChange,
  fieldsetClassName,
  legendClassName,
  fieldsetLegend,
  radioClassName,
}: RadioMapperProps) => {
  return (
    <fieldset
      className={fieldsetClassName ?? 'border-none flex flex-col padding-1'}
    >
      {fieldsetLegend && (
        <legend className={legendClassName ?? 'font-bold'}>
          {fieldsetLegend}
        </legend>
      )}

      {Object.values(options).map((option: RadioOption) => (
        <label
          key={option.id}
          htmlFor={option.id}
          className="flex items-center gap-1"
        >
          <input
            type="radio"
            id={option.id}
            name={name}
            className={radioClassName ?? ''}
            value={selectedValue}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioMapper;
