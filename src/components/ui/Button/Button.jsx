import React, { useRef, useState } from 'react';
import StyledButton from './StyledButton';


const Button = ({ children, onClick, type, ariaLabel, variant }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef(null);

  const handleMouseUp = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <StyledButton
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      variant={variant}
      isAnimating={isAnimating}
      ref={buttonRef}
      onMouseUp={handleMouseUp}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
