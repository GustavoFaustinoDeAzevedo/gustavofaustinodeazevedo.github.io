// StyledButton.jsx
import styled, { keyframes, css } from 'styled-components';
import variantStyles from './buttonStyles';

const buttonPressed = variant => keyframes`
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
  shouldForwardProp: prop => !['variant', 'isAnimating'].includes(prop),
})`

  width: 110px;
  height: 30px;
  border: none;
  text-align: center;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: filter 0.3s ease;
  user-select: none;

  background-color: ${({ variant = 'primary' }) =>
    variantStyles[variant].backgroundColor};
  color: ${({ variant = 'primary' }) =>
    variantStyles[variant].color};

  &:hover {
    filter: brightness(1.4);
  }
  &:active {
    filter: brightness(0.6);
  }

  ${({ isAnimating, variant = 'primary' }) =>
    isAnimating
      ? css`
          animation: ${buttonPressed(variant)} 0.37s ease-out;
        `
      : ''}
`;

export default StyledButton;
