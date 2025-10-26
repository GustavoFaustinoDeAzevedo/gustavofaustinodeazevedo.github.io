import styled from 'styled-components';
import { FilterValues } from '@/store/slices/settings';
import React from 'react';

interface DesktopBackgroundPreviewStyledProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
  $filters?: FilterValues['values'];
  $backgroundGradient?: 'linear' | 'radial' | 'conic';
  $backgroundGradientValues?: {
    deg?: number;
    opacity: string;
    color: string[];
  };
}

const buildGradient = (
  type: 'linear' | 'radial' | 'conic',
  { deg = 0, color }: { deg?: number; color: string[] }
) => {
  const rgbaStart = `${color[0]}`;
  const rgbaEnd = `${color[1]}`;

  switch (type) {
    case 'linear':
      return `linear-gradient(${deg}deg, ${color[0]} 0%, ${color[1]} 100%)`;
    case 'radial':
      return `repeating-radial-gradient(${color[0]} 0%, ${color[1]} 100%)`;
    case 'conic':
      return `repeating-conic-gradient(${color[0]} 0%, ${color[1]} 100%)`;
    default:
      return '';
  }
};

const DesktopBackgroundPreviewStyled = styled.div<DesktopBackgroundPreviewStyledProps>`
  background: ${({
    $isBackgroundImage,
    $backgroundImage,
    $backgroundColor,
    $backgroundGradient,
    $backgroundGradientValues,
  }) =>
    $isBackgroundImage && $backgroundImage
      ? `url(${$backgroundImage}) no-repeat center/cover`
      : $backgroundGradient && $backgroundGradientValues
      ? buildGradient($backgroundGradient, $backgroundGradientValues)
      : $backgroundColor};

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
