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
  $isGradientInverted?: boolean;
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

const DesktopBackgroundPreviewStyled = styled.div<DesktopBackgroundPreviewStyledProps>`
  background: ${({
    $isBackgroundImage,
    $backgroundImage,
    $backgroundColor,
    $isGradientEnabled,
    $backgroundGradient,
    $backgroundGradientAngle,
    $isGradientInverted,
    $isGradientMirrored,
  }) => {
    return $isBackgroundImage && $backgroundImage
      ? `url(${$backgroundImage}) repeat center/cover ${
          $backgroundColor || '#000000'
        }`
      : $isGradientEnabled
      ? temporaryGradient(
          $backgroundColor || '#000000',
          $backgroundGradient,
          $backgroundGradientAngle,
          $isGradientMirrored,
          $isGradientInverted
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
