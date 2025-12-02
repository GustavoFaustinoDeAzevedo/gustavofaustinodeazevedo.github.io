import styled from 'styled-components';

const StyledDropdownMenu = styled.ul<{
  $isOpen: boolean;
  $top: number;
  $left: number;
}>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  background-color: var(--color-background-2);
  min-width: 160px;
  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  z-index: 9999;
  padding: 0.5rem 0;

  & li {
    color: var(--color-text);
    padding: 0.2rem 1.5rem;
    text-decoration: none;
    display: block;
    cursor: var(--cursor-pointer);

    &:hover {
      background-color: #ffffff1a;
    }
  }

  & hr {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 0.5rem 0;
  }
`;

export default StyledDropdownMenu;
