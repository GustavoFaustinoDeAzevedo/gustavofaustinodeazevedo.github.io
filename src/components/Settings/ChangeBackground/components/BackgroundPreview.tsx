import { Filter } from '../types/changeBackground.data.types';
import { BackgroundPreviewConfig } from './ChangeBackground';
import DesktopBackgroundPreviewStyled from './DesktopBackgroundPreviewStyled';

export interface DesktopBackgroundPreviewProps {
  className?: string;
  backgroundPreviewConfig: BackgroundPreviewConfig;
}

const DesktopBackgroundPreview = ({
  className,
  backgroundPreviewConfig,
}: DesktopBackgroundPreviewProps) => {
  console.log(backgroundPreviewConfig);
  return (
    <DesktopBackgroundPreviewStyled
      $isBackgroundImage={backgroundPreviewConfig.isBackgroundPreviewImage}
      $backgroundColor={backgroundPreviewConfig.color}
      $backgroundImage={backgroundPreviewConfig.image}
      $filters={backgroundPreviewConfig.filters}
      className={className || 'desktop-background'}
    />
  );
};

export default DesktopBackgroundPreview;
