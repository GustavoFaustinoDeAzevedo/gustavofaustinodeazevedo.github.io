import styled from 'styled-components';
import { FilterValues } from '@/store/slices/settings';

interface DesktopBackgroundPreviewStyledProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
  $filters?: FilterValues;
}

const DesktopBackgroundPreviewStyled = styled.img<DesktopBackgroundPreviewStyledProps>`
  background: ${(props) =>
    props.$isBackgroundImage && props.$backgroundImage
      ? `url(${props.$backgroundImage})`
      : props.$backgroundColor};

  filter: blur(${(props) => props.$filters?.blur}px)
    brightness(${(props) => props.$filters?.brightness})
    contrast(${(props) => props.$filters?.contrast})
    grayscale(${(props) => props.$filters?.grayscale})
    hue-rotate(${(props) => props.$filters?.hueRotate}deg)
    invert(${(props) => props.$filters?.invert})
    saturate(${(props) => props.$filters?.saturate})
    sepia(${(props) => props.$filters?.sepia});
`;

export default DesktopBackgroundPreviewStyled;
