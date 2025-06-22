import styled, { keyframes } from 'styled-components';

const buttonPressedAnimation = (variant) => {
  return {
    '0%': {
      outline: `1px double ${variantStyles[variant].backgroundColor}`,
    },
    '50%': {
      outlineStyle: 'solid',
    },
    '100%': {
      outline: '10px double  #00000000',
    },
  };
};

const StyledDropdown = styled(
  'ul',
  ({ $variant = 'primary', $isAnimating }) => ({
    width: '110px',
    height: '30px',
    border: 'none',
    textAlign: 'center',
    borderRadius: 'var(--border-radius)',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'filter 300ms ease',
    userSelect: 'none',
    ...variantStyles[$variant],

    ':hover': {
      filter: 'brightness(140%)',
    },
    ':active': {
      filter: 'brightness(60%)',
    },

    animationName: $isAnimating ? buttonPressedAnimation($variant) : 'none',
    animationDuration: $isAnimating ? '0.37s' : 'none',
    animationTimingFunction: 'ease-out',
  })
);

export default StyledDropdown;
