import styled from 'styled-components';
import { iconVariants, iconBaseStyle } from '../utils/icons';

const Icon = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ variant = '' }) => ({
  ...iconBaseStyle,
  ...iconVariants[variant],
  backgroundColor: 'currentColor',
}));

export default Icon;
