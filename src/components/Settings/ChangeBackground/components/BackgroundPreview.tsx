import { BackgroundPreviewConfig } from './ChangeBackgroundMenu';
import DesktopBackgroundPreviewStyled from './DesktopBackgroundPreviewStyled';
import { EffectValue } from '../../../../store/slices/settings/settingsSlice.types';

export interface DesktopBackgroundPreviewProps {
  className?: string;
  backgroundPreviewConfig: BackgroundPreviewConfig;
}

const DesktopBackgroundPreview = ({
  className,
  backgroundPreviewConfig,
}: DesktopBackgroundPreviewProps) => {
  const effectList = backgroundPreviewConfig.effect;
  const activeEffect = effectList.active;
  const effectValue = effectList.gradient[activeEffect as keyof EffectValue];
  return (
    <div className={`${className}-container`}>
      <DesktopBackgroundPreviewStyled
        $isBackgroundImage={backgroundPreviewConfig.isBackgroundPreviewImage}
        $backgroundColor={backgroundPreviewConfig.color}
        $backgroundImage={backgroundPreviewConfig.image}
        $filters={backgroundPreviewConfig.filters.values}
        className={className || 'desktop-background '}
      />
      <div className={`${className}-layer-1`}></div>
    </div>
  );
};

export default DesktopBackgroundPreview;
