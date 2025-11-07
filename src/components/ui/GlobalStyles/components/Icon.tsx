import styled from 'styled-components';
import { iconVariants, iconBaseStyle } from '../utils/icons';

interface IconProps {
  variant?: keyof typeof iconVariants;
}

const Icon = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})<IconProps>(({ variant = 'html-file' }) => {
  const iconVerification = variant in iconVariants;
  return {
    ...iconBaseStyle,
    ...iconVariants[iconVerification ? variant : 'html-file'],
    backgroundColor: 'currentColor',
  };
});

export default Icon;
