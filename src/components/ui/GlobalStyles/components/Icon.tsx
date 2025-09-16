import styled from 'styled-components';
import { iconVariants, iconBaseStyle } from '../utils/icons';

interface IconProps {
  variant?: keyof typeof iconVariants;
}

const Icon = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})<IconProps>(({ variant = '' }) => ({
  ...iconBaseStyle,
  ...iconVariants[variant],
  backgroundColor: 'currentColor',
}));

export default Icon;
