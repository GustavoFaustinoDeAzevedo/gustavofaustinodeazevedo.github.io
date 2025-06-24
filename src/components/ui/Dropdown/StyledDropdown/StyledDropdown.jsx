import styled, { keyframes, css } from 'styled-components';

const dropdownPressed = () => keyframes`
  0% {
    outline: 1px double;
  }
  50% {
    outline-style: solid;
  }
  100% {
    outline: 10px double transparent;
  }
`;

const StyledDropdown = styled.ul.withConfig({
  shouldForwardProp: (prop) => !['isAnimating'].includes(prop),
})`
  width: 100%;
  max-width: 200px;
  height: auto;
  border: 1px var(--border-style) var(--c-border);
  text-align: left;
  border-radius: 5px;
  cursor: pointer;
  transform: translateY(-100%);
  display: none;

  transition: filter 300ms ease;
  user-select: none;

  background-color: var(--c-background1);
  color: var(--c-text);

  ${({ isAnimating }) =>
    isAnimating &&
    css`
      animation: ${dropdownPressed()} 0.37s ease-out;
    `}
`;

export default StyledDropdown;
