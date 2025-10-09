import { useRef } from 'react';

const InputRGB = () => {
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement>
  ) => {
    if (e.target.value.length === e.target.maxLength) {
      nextRef.current?.focus();
    }
  };

  return (
    <div className="change-background__color-input-wrapper">
      <input
        type="text"
        maxLength={3}
        ref={input1}
        className="change-background__color-input"
        onChange={(e) =>
          handleChange(e, input2 as React.RefObject<HTMLInputElement>)
        }
        title="Input 1"
        placeholder="Enter value for input 1"
      />
      <input
        type="text"
        maxLength={3}
        ref={input2}
        className="change-background__color-input"
        onChange={(e) =>
          handleChange(e, input3 as React.RefObject<HTMLInputElement>)
        }
        title="Input 2"
        placeholder="Enter value for input 2"
      />
      <input
        type="text"
        maxLength={3}
        ref={input3}
        className="change-background__color-input"
        title="Input 3"
        placeholder="Enter value for input 3"
      />
    </div>
  );
};

export default InputRGB;
