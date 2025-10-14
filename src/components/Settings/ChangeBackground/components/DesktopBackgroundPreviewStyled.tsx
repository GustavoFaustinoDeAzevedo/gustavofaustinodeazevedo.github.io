import styled from 'styled-components';
import { FilterValues } from '@/store/slices/settings';
import React from 'react';

interface DesktopBackgroundPreviewStyledProps {
  $isBackgroundImage?: boolean;
  $backgroundImage?: string;
  $backgroundColor?: string;
  $filters?: FilterValues;
}

const DesktopBackgroundPreviewStyled = styled.img<DesktopBackgroundPreviewStyledProps>`
  background: ${(props) =>
    props.$isBackgroundImage && props.$backgroundImage
      ? `${
          props.$backgroundColor?.includes('#')
            ? props.$backgroundColor
            : `#${props.$backgroundColor}`
        } url(${props.$backgroundImage}) no-repeat center/cover`
      : props.$backgroundColor};

  filter: ${(props) => {
    const f = props.$filters;
    const filters = [];

    if (props.$isBackgroundImage && props.$backgroundImage) {
      filters.push(
        `blur(${f?.blur}px)`,
        `contrast(${f?.contrast})`,
        `grayscale(${f?.grayscale})`,
        `hue-rotate(${f?.hueRotate}deg)`,
        `invert(${f?.invert})`,
        `saturate(${f?.saturate})`,
        `sepia(${f?.sepia})`
      );
    }
    filters.push(`brightness(${f?.brightness})`);
    return filters.join(' ');
  }};
`;

export default React.memo(DesktopBackgroundPreviewStyled);
