import React from 'react';
import { Filter } from '../types/changeBackground.data.types';
import { BackgroundPreviewConfig } from './ChangeBackgroundMenu';
import DesktopBackgroundPreviewStyled from './DesktopBackgroundPreviewStyled';

export interface DesktopBackgroundPreviewProps {
  className?: string;
  backgroundPreviewConfig: BackgroundPreviewConfig;
}

const DesktopBackgroundPreview = ({
  className,
  backgroundPreviewConfig,
}: DesktopBackgroundPreviewProps) => {
  return (
    <>
      <DesktopBackgroundPreviewStyled
        $isBackgroundImage={backgroundPreviewConfig.isBackgroundPreviewImage}
        $backgroundColor={backgroundPreviewConfig.color}
        $backgroundImage={backgroundPreviewConfig.image}
        $filters={backgroundPreviewConfig.filters}
        className={className || 'desktop-background'}
      />
      {backgroundPreviewConfig.effect.type !== 'none' && (
        <DesktopBackgroundPreviewStyled
          $isBackgroundImage={false}
          className="desktop-background__gradient"
          $backgroundColor={backgroundPreviewConfig.effect.type}
        />
      )}
    </>
  );
};

export default DesktopBackgroundPreview;
