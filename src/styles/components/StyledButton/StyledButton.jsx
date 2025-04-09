import { styled } from 'styletron-react';
import variantStyles from './buttonStyles';

const StyledButton = styled('button', ({ $variant = 'primary' }) => ({
  padding: ' 0.8rem 2rem;',
  border: 'none',
  borderRadius: 'var(--border-radius)',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'filter 300ms ease',
  userSelect: 'none',
  ...variantStyles[$variant],
  ':hover': {
    filter: 'brightness(140%)',
  },
}));

export default StyledButton;
