import { FilterValues } from '@/store/slices/settings';
import styled from 'styled-components';

interface DesktopBackgroundProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
  $filters?: FilterValues;
  $effect?: string;
}

const temporaryGradient = (backgroundColor: string) =>
  `linear-gradient(50deg,${backgroundColor}30 0%, ${backgroundColor}60 33%, ${backgroundColor}90 66%,  ${backgroundColor} 100%)`;

const DesktopBackgroundStyled = styled.div<DesktopBackgroundProps>`
  background: ${(props) =>
    props.$isBackgroundImage && props.$backgroundImage
      ? `${props.$backgroundColor} url(${props.$backgroundImage}) no-repeat center/cover`
      : temporaryGradient(props.$backgroundColor || '#000000')};

  filter: ${(props) => {
    const f = props?.$filters?.values;
    const filters = [];

    if (props.$isBackgroundImage && props.$backgroundImage) {
      filters.push(
        `blur(${f?.blur}px)`,
        `contrast(${f?.contrast})`,
        `grayscale(${f?.grayscale})`,
        `hue-rotate(${f?.hue}deg)`,
        `invert(${f?.invert})`,
        `saturate(${f?.saturation})`,
        `sepia(${f?.sepia})`
      );
    }
    filters.push(`brightness(${f?.brightness})`);
    return filters.join(' ');
  }};
`;

export default DesktopBackgroundStyled;
