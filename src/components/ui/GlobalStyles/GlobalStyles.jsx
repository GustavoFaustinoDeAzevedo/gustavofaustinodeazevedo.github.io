import styled from 'styled-components';

const BaseLink = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: none;
  font: inherit;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }

  &.active {
    font-weight: bold;
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

export function SmartLink({ href, onClick, children, ...rest }) {
  const isLink = !!href;

  return (
    <BaseLink
      as={isLink ? 'a' : 'button'}
      href={href}
      onClick={onClick}
      type={!isLink ? 'button' : undefined}
      {...rest}
    >
      {children}
    </BaseLink>
  );
}
