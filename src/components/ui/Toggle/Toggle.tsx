import './style.css';

export interface ToggleProps {
  handleToggle: () => void;
  index?: number;
  label?: string;
  isChecked?: boolean;
  isEnabled?: boolean;
  classContainer?: string;
  classBorder?: string;
  classLabel?: string;
  cursor?: { notAllowed: string; allowed: string };
}

const Toggle = ({
  index = 0,
  handleToggle,
  label = '',
  isChecked = false,
  isEnabled = true,
  classContainer = '',
  classBorder = 'round',
  classLabel = 'toggle-label',
  cursor = { notAllowed: 'cursor-not-allowed', allowed: 'cursor-pointer' },
}: ToggleProps) => {
  return (
    <div className={classContainer} key={`toggle-${index}-${label}`}>
      <label
        className={`${classLabel} ${!isEnabled ? cursor.notAllowed : cursor.allowed}`}
        title={label}
        aria-label={label}
        htmlFor={label}
      >
        {label}
      </label>
      <label className={'switch'}>
        <input
          id={label}
          name={label}
          type="checkbox"
          disabled={!isEnabled}
          onChange={handleToggle}
          checked={isChecked}
          title={label}
          aria-label={label}
        />
        <span className={`toggle ${classBorder}`}></span>
      </label>
    </div>
  );
};

export default Toggle;
