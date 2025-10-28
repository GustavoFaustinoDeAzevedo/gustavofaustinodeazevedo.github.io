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
    <div className={`${className}-container`}>
      <DesktopBackgroundPreviewStyled
        $isBackgroundImage={backgroundPreviewConfig.isBackgroundPreviewImage}
        $backgroundColor={backgroundPreviewConfig.color}
        $backgroundImage={backgroundPreviewConfig.image}
        $filters={backgroundPreviewConfig.filters.values}
        $backgroundGradient={backgroundPreviewConfig.effect}
        className={className || 'desktop-background '}
      />
      <div className={`${className}-layer-1`}></div>
    </div>
  );
};

export default DesktopBackgroundPreview;
