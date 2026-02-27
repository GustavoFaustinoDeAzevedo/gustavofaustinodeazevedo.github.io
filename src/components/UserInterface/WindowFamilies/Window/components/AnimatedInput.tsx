import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface AnimatedInputProps {
  inputClass?: string;
  id: string;
  type: string;
  name: string;
  required?: boolean;
  ariaLabel: string;
  inputPlaceholder: string;
  label: string;
  textArea?: boolean;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  inputClass = '',
  id,
  type,
  name,
  required,
  ariaLabel,
  inputPlaceholder,
  label,
  textArea = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const placeholderRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Estado inicial fixo
  useEffect(() => {
    gsap.set(placeholderRef.current, {
      y: 0,
      fontSize: '1rem',
      color: 'var(--color-text)',
      opacity: 1,
    });
  }, []);

  // Animações de foco/blur
  useEffect(() => {
    if (isFocused || inputRef.current?.value) {
      gsap.to(placeholderRef.current, {
        y: '-2.3rem',
        fontSize: '0.8rem',
        duration: 0.3,
      });
      if (placeholderRef.current) {
        placeholderRef.current.style.color = 'var(--color-text3)';
      }
    } else {
      gsap.to(placeholderRef.current, {
        y: 0,
        fontSize: '1rem',
        duration: 0.3,
      });
      if (placeholderRef.current) {
        placeholderRef.current.style.color = 'var(--color-text)';
      }
    }
  }, [isFocused]);

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setIsFocused(e.target.value !== '');

  const handleFocus = () => setIsFocused(true);

  return (
    <div className="input-container">
      <label ref={placeholderRef} className="placeholder" htmlFor={name}>
        {label}
      </label>
      {!textArea ? (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={id}
          name={name}
          required={required}
          aria-label={ariaLabel}
          className={inputClass}
          placeholder={inputPlaceholder}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          id={id}
          name={name}
          required={required}
          aria-label={ariaLabel}
          className={inputClass}
          placeholder={inputPlaceholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></textarea>
      )}
    </div>
  );
};

export default React.memo(AnimatedInput);
