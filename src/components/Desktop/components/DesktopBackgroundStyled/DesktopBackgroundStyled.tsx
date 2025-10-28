import { FilterValues } from '@/store/slices/settings';
import styled from 'styled-components';

interface DesktopBackgroundProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
  $filters?: FilterValues;
  $effect?: string;
}

const temporaryGradient = (
  backgroundColor: string,
  gradientEffect?: string
) => {
  const gradientStops = [
    `${backgroundColor}99 0%`,
    `${backgroundColor}b3 40%`,
    `${backgroundColor}e6 75%`,
    `${backgroundColor} 100%`,
  ];
  switch (gradientEffect) {
    case 'normal':
      return `linear-gradient(50deg,${gradientStops.join(', ')} )`;
    case 'invert':
      return `linear-gradient(230deg,${gradientStops.join(', ')})`;
    default:
      return `${backgroundColor}`;
  }
};

const DesktopBackgroundStyled = styled.div<DesktopBackgroundProps>`
  background: ${(props) =>
    props.$isBackgroundImage && props.$backgroundImage
      ? `${props.$backgroundColor} url(${props.$backgroundImage}) no-repeat center/cover`
      : temporaryGradient(props.$backgroundColor || '#000000', props.$effect)};

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
