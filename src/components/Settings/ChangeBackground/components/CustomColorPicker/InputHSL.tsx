import { useRef } from 'react';

const InputHSL = () => {
  const hueRef = useRef<HTMLInputElement>(null);
  const satRef = useRef<HTMLInputElement>(null);
  const lightRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    next: React.RefObject<HTMLInputElement>
  ) => {
    if (e.target.value.length === e.target.maxLength) {
      next.current?.focus();
    }
  };

  return (
    <div className="change-background__color-input-wrapper">
      <input
        type="number"
        maxLength={3}
        placeholder="Hue (0-360)"
        ref={hueRef}
        className="change-background__color-input"
        onChange={(e) =>
          handleChange(e, satRef as React.RefObject<HTMLInputElement>)
        }
      />
      <input
        type="number"
        maxLength={3}
        placeholder="Saturation %"
        ref={satRef}
        className="change-background__color-input"
        onChange={(e) =>
          handleChange(e, lightRef as React.RefObject<HTMLInputElement>)
        }
      />
      <input
        type="number"
        maxLength={3}
        className="change-background__color-input"
        placeholder="Lightness %"
        ref={lightRef}
      />
    </div>
  );
};

export default InputHSL;
