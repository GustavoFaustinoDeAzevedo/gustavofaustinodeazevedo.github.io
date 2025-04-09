import React from 'react';
import StyledButton from '../../styles/components/StyledButton';

const Button = ({ children, onClick, type, ariaLabel, variant }) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      $variant={variant}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
