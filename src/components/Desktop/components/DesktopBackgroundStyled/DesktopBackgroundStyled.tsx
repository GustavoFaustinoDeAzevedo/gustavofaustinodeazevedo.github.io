import { FilterValues } from '@/store/slices/settings';
import styled from 'styled-components';

interface DesktopBackgroundProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
  $filters?: FilterValues;
  $effect?: string;
}

function generateSoftCenterAlphaStops(
  count = 100,
  minAlpha = 153,
  maxAlpha = 255,
  mirrored = false
) {
  const length = mirrored ? Math.floor(count / 2) : count;
  const fadeOut = Array.from({ length }, (_, i) => {
    const alpha = Math.round(maxAlpha - (maxAlpha - minAlpha) * (i / length));
    return alpha.toString(16).padStart(2, '0');
  });

  if (!mirrored) return fadeOut;
  const fadeIn = [...fadeOut].reverse();
  return [...fadeOut, ...fadeIn];
}

const alphaStops = generateSoftCenterAlphaStops();
const alphaStopsInverted = generateSoftCenterAlphaStops(100, 255, 0);

const temporaryGradient = (
  backgroundColor: string,
  gradientEffect?: string
) => {
  const gradientAlphaStops =
    gradientEffect === 'invert' ? alphaStopsInverted : alphaStops;
  const stops = gradientAlphaStops.map(
    (alpha, i) =>
      `${backgroundColor}${alpha} ${Math.round(
        (i / (gradientAlphaStops.length - 1)) * 100
      )}%`
  );
  switch (gradientEffect) {
    case 'linear':
      return `linear-gradient(50deg,${stops.join(', ')} )`;
    case 'radial':
      return `linear-gradient(230deg,${stops.join(', ')})`;
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
