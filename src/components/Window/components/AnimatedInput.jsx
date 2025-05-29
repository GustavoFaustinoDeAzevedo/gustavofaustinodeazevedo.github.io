import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const AnimatedInput = ({
  inputClass,
  id,
  type,
  name,
  required,
  ariaLabel,
  inputPlaceholder,
  children,
  textArea = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const placeholderRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused || inputRef.current.value) {
      gsap.to(placeholderRef.current, {
        y: '-1.4rem',
        fontSize: '0.8rem',
        color: 'var(--c-text3)',
        duration: 0.2,
      });
    } else {
      gsap.to(placeholderRef.current, {
        y: 0,
        fontSize: '1rem',
        color: 'var(--c-text)',
        duration: 0.2,
      });
    }
  }, [isFocused]);

  return (
    <div className="input-container">
      <label ref={placeholderRef} className="placeholder" htmlFor={name}>
        {children}
      </label>
      {(!textArea && (
        <input
          ref={inputRef}
          id={id}
          name={name}
          required={required}
          aria-label={ariaLabel}
          className={inputClass}
          placeholder={inputPlaceholder}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== '')}
        />
      )) || (
        <textarea
          ref={inputRef}
          id={id}
          name={name}
          required={required}
          aria-label={ariaLabel}
          className={inputClass}
          placeholder={inputPlaceholder}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== '')}
        ></textarea>
      )}
    </div>
  );
};

export default AnimatedInput;
