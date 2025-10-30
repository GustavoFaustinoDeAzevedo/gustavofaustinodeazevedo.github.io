import { Radio, Slider } from '@/components/ui';
import { EffectValues } from '@/store/slices/settings';
import { useCallback } from 'react';

interface BackgroundControlEffectProps {
  language: string;
  backgroundPreviewConfig: any;
  displayChoicesContent: any;
  setBackgroundPreviewConfig: any;
  displayChoicesRoot: any;
}

const BackgroundControlEffect = ({
  language,
  backgroundPreviewConfig,
  displayChoicesContent,
  setBackgroundPreviewConfig,
  displayChoicesRoot,
}: BackgroundControlEffectProps) => {
  const handleEffectValue = useCallback(
    (key: keyof EffectValues, value: string | boolean | number) => {
      setBackgroundPreviewConfig((prev: any) => {
        if (prev.effect[key as keyof EffectValues] === value) return prev;
        return {
          ...prev,
          effect: {
            ...prev.effect,
            [key]: value,
          },
        };
      });
    },
    [setBackgroundPreviewConfig, backgroundPreviewConfig.effect]
  );
  const handleGradientToggle = () => {
    if (!backgroundPreviewConfig.effect.active.includes('_disabled')) {
      handleEffectValue(
        'active',
        `${backgroundPreviewConfig.effect.active}_disabled`
      );
    } else {
      handleEffectValue(
        'active',
        backgroundPreviewConfig.effect.active.replace('_disabled', '')
      );
    }
  };
  const handleAngleValue = (_: string, value: number) =>
    handleEffectValue('angle', value);

  const radioGradientProps = {
    fieldsetClassName: 'change-background__gradient-field-radio font-courier',
    legendClassName: 'change-background__display-legend ',
    radioClassName: 'change-background__display-option  cursor-pointer',
    options:
      displayChoicesRoot?.choices?.color?.settings?.effect?.options || {},
    onChange: (value: string) => handleEffectValue('active', value) as any,
    name: 'backgroundGradient',
    selectedValue: backgroundPreviewConfig.effect.active,
  };
  return (
    <fieldset className="change-background__gradient-field border-muted">
      <legend>{displayChoicesContent?.settings?.effect?.legend}</legend>
      <div className="flex gap-1 items-center">
        <label
          htmlFor="temporaryCheckboxId"
          className="font-courier text-m width-6 cursor-pointer"
        >
          {!backgroundPreviewConfig.effect.active.includes('_disabled')
            ? language === 'por'
              ? 'Ativo'
              : 'Active'
            : language === 'por'
            ? 'Inativo'
            : 'Inactive'}
        </label>
        <label className="switch">
          <input
            id="temporaryCheckboxId"
            type="checkbox"
            onChange={handleGradientToggle}
            checked={
              !backgroundPreviewConfig.effect.active.includes('_disabled')
            }
          />
          <span className="toggle round"></span>
        </label>
      </div>
      <div className="flex">
        <fieldset className="change-background__gradient-field-checkbox font-courier">
          <label className="flex gap-1">
            <input
              type="checkbox"
              disabled={backgroundPreviewConfig.effect.active.includes(
                '_disabled'
              )}
              onChange={(e) => handleEffectValue('inverted', e.target.checked)}
              checked={backgroundPreviewConfig.effect.inverted}
            />
            <p
              className={
                backgroundPreviewConfig.effect.active.includes('_disabled')
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }
            >
              {language === 'por' ? 'Invertido' : 'Inverted'}
            </p>
          </label>
          <label className="flex gap-1">
            <input
              type="checkbox"
              disabled={backgroundPreviewConfig.effect.active.includes(
                '_disabled'
              )}
              onChange={(e) => handleEffectValue('mirrored', e.target.checked)}
              checked={backgroundPreviewConfig.effect.mirrored}
            />
            <p
              className={
                backgroundPreviewConfig.effect.active.includes('_disabled')
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }
            >
              {language === 'por' ? 'Espelhado' : 'Mirrored'}
            </p>
          </label>
        </fieldset>
        <Radio {...radioGradientProps} />
      </div>
      <Slider
        sliderContainerClass={'flex gap-1 justify-center border-none'}
        inputNumberClass={'change-background__gradient-field-angle'}
        sliderValue={backgroundPreviewConfig.effect.angle}
        sliderData={{
          id: 'angle',
          label: language === 'por' ? 'Ângulo' : 'Angle',
          min: 0,
          max: 360,
          step: 1,
          default: 0,
        }}
        sliderValuesHandler={handleAngleValue}
        disabled={
          backgroundPreviewConfig.effect.active.includes('_disabled') ||
          backgroundPreviewConfig.effect.active === 'radial'
        }
      />
    </fieldset>
  );
};

export default BackgroundControlEffect;
