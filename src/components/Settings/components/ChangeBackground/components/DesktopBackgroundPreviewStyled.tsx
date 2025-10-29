import styled from 'styled-components';
import { FilterValues } from '@/store/slices/settings';
import React from 'react';

interface DesktopBackgroundPreviewStyledProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
  $filters?: FilterValues['values'];
  $isGradientEnabled?: boolean;
  $backgroundGradient?: string;
  $backgroundGradientAngle?: number;
  $isGradientMirrored?: boolean;
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
      `repeating-radial-gradient(${stops.join(', ')})`,
    conic: (stops: string[], deg: number | undefined) =>
      `conic-gradient(${stops.join(` ${deg}deg, `)})`,
  };
  return gradientFunctions[key as keyof typeof gradientFunctions];
};

const temporaryGradient = (
  backgroundColor: string,
  gradientEffect?: string,
  deg?: number,
  mirrored?: boolean
) => {
  const gradientAlphaStops = generateAlphaStops(100, 255, 0, mirrored);
  const stops = gradientAlphaStops.map(
    (alpha, i) =>
      `${backgroundColor}${alpha} ${Math.round(
        (i / (gradientAlphaStops.length - 1)) * 100
      )}%`
  );
  const gradient = gradientTypes(gradientEffect as string);
  console.log(gradient(stops, deg));
  return gradient(stops, deg);
};

const DesktopBackgroundPreviewStyled = styled.div<DesktopBackgroundPreviewStyledProps>`
  background: ${({
    $isBackgroundImage,
    $backgroundImage,
    $backgroundColor,
    $isGradientEnabled,
    $backgroundGradient,
    $backgroundGradientAngle,
    $isGradientMirrored,
  }) => {
    console.log($isGradientEnabled);
    return $isBackgroundImage && $backgroundImage
      ? `url(${$backgroundImage}) no-repeat center/cover`
      : $isGradientEnabled
      ? temporaryGradient(
          $backgroundColor || '#000000',
          $backgroundGradient,
          $backgroundGradientAngle,
          $isGradientMirrored
        )
      : $backgroundColor;
  }};

  filter: ${({ $filters, $isBackgroundImage, $backgroundImage }) => {
    const f = $filters || ({} as FilterValues['values']);
    const baseFilters = [`brightness(${f.brightness})`];

    const imageFilters =
      $isBackgroundImage && $backgroundImage
        ? [
            `blur(${f.blur}px)`,
            `contrast(${f.contrast})`,
            `grayscale(${f.grayscale})`,
            `hue-rotate(${f.hue}deg)`,
            `invert(${f.invert})`,
            `saturate(${f.saturation})`,
            `sepia(${f.sepia})`,
          ]
        : [];

    return [...imageFilters, ...baseFilters].join(' ');
  }};
`;

export default React.memo(DesktopBackgroundPreviewStyled);
