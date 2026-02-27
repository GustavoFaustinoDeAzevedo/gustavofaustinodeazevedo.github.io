import { EffectValues, FilterValues } from '@/store/slices/settings';
import styled from 'styled-components';

interface DesktopBackgroundProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
  $filters?: FilterValues;
  $effect?: EffectValues;
}

function generateAlphaStops(
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

const gradientTypes = (key: string) => {
  const gradientFunctions = {
    linear: (stops: string[], deg: number | undefined) =>
      `linear-gradient(${deg}deg,${stops.join(', ')} )`,
    radial: (stops: string[], _: number | undefined) =>
      `radial-gradient(circle at center,${stops.join(', ')})`,
    conic: (stops: string[], deg: number | undefined) =>
      `conic-gradient(${stops.join(` ${deg}deg, `)})`,
  };
  return gradientFunctions[key as keyof typeof gradientFunctions];
};

const temporaryGradient = (
  backgroundColor: string,
  gradientEffect?: string,
  deg?: number,
  mirrored?: boolean,
  inverted?: boolean
) => {
  const minAlpha = inverted ? 255 : 0;
  const maxAlpha = inverted ? 0 : 255;
  const gradientAlphaStops = generateAlphaStops(
    100,
    minAlpha,
    maxAlpha,
    mirrored
  );
  const stops = gradientAlphaStops.map(
    (alpha, i) =>
      `${backgroundColor}${alpha} ${Math.round(
        (i / (gradientAlphaStops.length - 1)) * 100
      )}%`
  );
  const gradient = gradientTypes(gradientEffect as string);
  return gradient(stops, deg);
};

const DesktopBackgroundStyled = styled.div<DesktopBackgroundProps>`
  background: ${({
    $isBackgroundImage,
    $backgroundImage,
    $backgroundColor,
    $effect,
  }) => {
    const { active, angle, inverted, mirrored } = $effect || {};
    const isGradientEnabled = !active?.includes('_disabled');

    return $isBackgroundImage && $backgroundImage
      ? `url(${$backgroundImage}) repeat center/cover ${
          $backgroundColor || '#000000'
        }`
      : isGradientEnabled
      ? temporaryGradient(
          $backgroundColor || '#000000',
          active,
          angle,
          mirrored,
          inverted
        )
      : $backgroundColor || '#000000';
  }};

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
