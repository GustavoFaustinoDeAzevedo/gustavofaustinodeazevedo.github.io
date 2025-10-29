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
        $isGradientEnabled={
          typeof backgroundPreviewConfig.effect.active === 'string' &&
          backgroundPreviewConfig.effect.active.trim().length > 0 &&
          backgroundPreviewConfig.effect.active !== undefined
        }
        $backgroundGradient={backgroundPreviewConfig.effect.active}
        $backgroundGradientAngle={backgroundPreviewConfig.effect.angle}
        $isGradientMirrored={backgroundPreviewConfig.effect.mirrored}
        className={className || 'desktop-background '}
      />
      <div className={`${className}-layer-1`}></div>
    </div>
  );
};

export default DesktopBackgroundPreview;
