import styled, { keyframes, css } from 'styled-components';
import variantStyles from './buttonStyles';

type VariantKey = keyof typeof variantStyles;

interface StyledButtonProps {
  variant?: VariantKey;
  isAnimating?: boolean;
}

const buttonPressed = (variant: VariantKey) => keyframes`
  0% {
    outline: 1px double ${variantStyles[variant].backgroundColor};
  }
  50% {
    outline-style: solid;
  }
  100% {
    outline: 10px double transparent;
  }
`;

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'isAnimating'].includes(prop),
})<StyledButtonProps>`
  padding: 3px 10px;
  min-width: fit-content;
  max-width: 8rem;
  height: 30px;
  border: none;
  text-align: center;
  border-radius: var(--border-radius);
  cursor: pointer;
  box-shadow: 0 0 4px 2px inset #00000040;
  font-weight: bold;
  transition: filter 0.3s ease;
  user-select: none;

  background-color: ${({ variant = 'primary' }) =>
    variantStyles[variant].backgroundColor};
  color: ${({ variant = 'primary' }) => variantStyles[variant].color};

  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.6);
  }

  ${({ isAnimating, variant = 'primary' }) =>
    isAnimating &&
    css`
      animation: ${buttonPressed(variant)} 0.37s ease-out;
    `}
`;

export default StyledButton;
