import styled from 'styled-components';
import { iconVariants, iconBaseStyle } from '../utils/icons';

interface IconProps {
  variant?: keyof typeof iconVariants;
  customPicture?: string;
}
//'/icons/about-me-icon.png'
const Icon = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
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

export default Icon;
