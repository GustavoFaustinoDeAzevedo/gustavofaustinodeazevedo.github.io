import React, { useRef, useState } from 'react';
import StyledButton from './StyledButton';

const Button = ({
  buttonRef,
  children = null,
  onClick = () => {},
  type = 'button' as 'button' | 'reset' | 'submit' | undefined,
  ariaLabel = '',
  variant = 'primary' as
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info',
  title = '',
  className = '',
}: {
  buttonRef?: React.Ref<HTMLButtonElement>;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  ariaLabel?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  title?: string;
  className?: string;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const internalButtonRef = buttonRef ?? useRef(null);

  const handleMouseUp = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <StyledButton
      className={className}
      title={title}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      variant={variant}
      isAnimating={isAnimating}
      ref={internalButtonRef}
      onMouseUp={handleMouseUp}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
