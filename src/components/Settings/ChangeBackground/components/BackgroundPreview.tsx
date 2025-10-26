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
    <>
      <DesktopBackgroundPreviewStyled
        $isBackgroundImage={backgroundPreviewConfig.isBackgroundPreviewImage}
        $backgroundColor={backgroundPreviewConfig.color}
        $backgroundImage={backgroundPreviewConfig.image}
        $filters={backgroundPreviewConfig.filters.values}
        className={className || 'desktop-background '}
      />
      {/* {activeEffect !== 'none' && (
        <DesktopBackgroundPreviewStyled
          $isBackgroundImage={false}
          className="desktop-background__gradient "
          $backgroundGradient={activeEffect as 'linear' | 'radial' | 'conic'}
          // $backgroundGradientValue={effectValue}
        />
      )} */}
    </>
  );
};

export default DesktopBackgroundPreview;
