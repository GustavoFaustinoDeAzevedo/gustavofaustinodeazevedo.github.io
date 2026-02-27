import { BackgroundPreviewConfig } from './BackgroundPreferences';
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
          backgroundPreviewConfig.effect.active !== undefined &&
          !backgroundPreviewConfig.effect.active.includes('_disabled')
        }
        $backgroundGradient={backgroundPreviewConfig.effect.active}
        $backgroundGradientAngle={backgroundPreviewConfig.effect.angle}
        $isGradientInverted={backgroundPreviewConfig.effect.inverted}
        $isGradientMirrored={backgroundPreviewConfig.effect.mirrored}
        className={className || 'desktop-background '}
      />
      <div className={`${className}-layer-1`}></div>
    </div>
  );
};

export default DesktopBackgroundPreview;
