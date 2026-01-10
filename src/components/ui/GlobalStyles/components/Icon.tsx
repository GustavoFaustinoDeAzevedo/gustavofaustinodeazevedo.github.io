import styled from 'styled-components';
import { iconVariants, iconBaseStyle } from '../utils/icons';
import React from 'react';

interface IconProps {
  variant?: keyof typeof iconVariants;
  customPicture?: string;
}
//'/icons/about-me-icon.png'
const IconStyled = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'customPicture',
})<IconProps>(({ variant = 'html-file', customPicture }) => {
  const iconVerification = variant in iconVariants;
  const pictureVerification = !!customPicture;

  if (pictureVerification) {
    return {
      ...iconBaseStyle,
      backgroundImage: `url(${customPicture})`,
    };
  }
  return {
    ...iconBaseStyle,
    ...iconVariants[iconVerification ? variant : 'html-file'],
    backgroundColor: 'currentColor',
  };
});

const IconWrapper: React.FC<IconProps & React.HTMLAttributes<HTMLElement>> =
  React.memo(
    ({ variant, customPicture, ...rest }) => {
      return (
        <IconStyled variant={variant} customPicture={customPicture} {...rest} />
      );
    },

    (prevProps, nextProps) =>
      prevProps.variant === nextProps.variant &&
      prevProps.customPicture === nextProps.customPicture
  );

const Icon = React.memo(IconWrapper);

export default Icon;
