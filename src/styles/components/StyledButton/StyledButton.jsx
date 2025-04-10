import { styled } from 'styletron-react';
import variantStyles from './buttonStyles';

const buttonPressedAnimation = (variant) => {
  return {
    '0%': {
      // boxShadow: `0px 0px 0px 0px ${variantStyles[variant].backgroundColor}`,
      outline: `1px double ${variantStyles[variant].backgroundColor}`,
    },
    '50%':{
      outlineStyle: 'solid',
    },
    '100%': {
      // boxShadow: '0px 0px 2px 10px #00000000',
      outline: '10px double  #00000000'
    },
  };
};

const StyledButton = styled(
  'button',
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
    ...variantStyles[$variant], // Estilos de variante

    ':hover': {
      filter: 'brightness(140%)',
    },
    ':active': {
      filter: 'brightness(60%)',
    },

    // Aplica os keyframes de animação dinamicamente
    animationName: $isAnimating ? buttonPressedAnimation($variant) : 'none',
    animationDuration: $isAnimating ? '0.37s' : 'none',
    animationTimingFunction: 'ease-out',
  })
);

export default StyledButton;
