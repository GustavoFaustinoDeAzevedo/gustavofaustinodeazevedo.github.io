//TODO: Separar em componentes menores para organização do código

import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeBackgroundTextContent } from '../data/changeBackground.data';
import { presetList } from '../data/imageFilters.data';
import actions from '@/store/actions';
import BackgroundControl from './BackgroundControl';

import { BackgroundPreviewDisplay } from '../types/changeBackground.types';
import { SliderGroup, Slider, Radio, Button } from '@/components/ui';
import { EffectValues, FilterValues, Language } from '@/store/slices/settings';
import DesktopBackgroundPreview from './BackgroundPreview';

export interface BackgroundPreviewConfig {
  isBackgroundPreviewImage: boolean;
  display: BackgroundPreviewDisplay;
  color: string;
  image: string;
  effect: EffectValues;
  filters: FilterValues;
}

const ChangeBackgroundMenu = ({ language }: { language: Language }) => {
  // Valores armazenados no redux ==========================================

  const storedDesktopBackgroundColor = useSelector(
    (state: RootState) => state.settings.desktopBackgroundColor
  );
  const storedDesktopBackgroundDefaultColor = useSelector(
    (state: RootState) => state.settings.desktopBackgroundDefaultColor
  );
  const storedDesktopBackgroundImage = useSelector(
    (state: RootState) => state.settings.desktopBackgroundImage
  );
  const storedIsBackgroundImage = useSelector(
    (state: RootState) => state.settings.isBackgroundImage
  );

  const storedDesktopBackgroundEffect = useSelector(
    (state: RootState) => state.settings.desktopBackgroundEffect
  );

  const storedDesktopBackgroundFilters = useSelector(
    (state: RootState) => state.settings.desktopBackgroundFilter
  );

  // useState ==============================================================

  const [backgroundPreviewConfig, setBackgroundPreviewConfig] =
    useState<BackgroundPreviewConfig>({
      isBackgroundPreviewImage: storedIsBackgroundImage,
      display: storedIsBackgroundImage ? 'image' : 'color',
      color: storedDesktopBackgroundColor,
      image: storedDesktopBackgroundImage,
      effect: storedDesktopBackgroundEffect,
      filters: storedDesktopBackgroundFilters,
    });

  // constantes =============================================================

  const displayChoicesRoot = useMemo(
    () => changeBackgroundTextContent[language as Language],
    [language]
  );
  const displayChoicesContent =
    displayChoicesRoot.choices[backgroundPreviewConfig?.display];

  // funções ===============================================================

  // handlers ================================================================

  const { handleChangeBackground } = actions.useSettingsActions();

  const handleChangeBackgroundState = useCallback(
    (key: string, value: any) => {
      setBackgroundPreviewConfig((prev) => {
        if (prev[key as keyof BackgroundPreviewConfig] === value) return prev;
        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [setBackgroundPreviewConfig, backgroundPreviewConfig]
  );

  const handleFilterValue = useCallback(
    (key: keyof FilterValues, value: number | string) => {
      setBackgroundPreviewConfig((prev) => {
        if (prev.filters[key as keyof FilterValues] === value) return prev;
        return {
          ...prev,
          filters: {
            ...prev.filters,
            values: {
              ...prev.filters.values,
              [key]: value,
            },
          },
        };
      });
    },
    [setBackgroundPreviewConfig, backgroundPreviewConfig.filters]
  );

  const handleEffectValue = useCallback(
    (key: keyof EffectValues, value: string | boolean | number) => {
      setBackgroundPreviewConfig((prev) => {
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

  const handleRadioState = (option: BackgroundPreviewDisplay) => {
    handleChangeBackgroundState('display', option);
    handleChangeBackgroundState('isBackgroundPreviewImage', option === 'image');
  };

  const handleApplyChanges = () => {
    handleChangeBackground({
      desktopBackgroundColor: backgroundPreviewConfig.color,
      desktopBackgroundImage: backgroundPreviewConfig.image,
      isBackgroundImage: backgroundPreviewConfig.display === 'image',
      desktopBackgroundEffect: backgroundPreviewConfig.effect,
      desktopBackgroundFilter: backgroundPreviewConfig.filters,
    });
  };

  const handleFilterSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = presetList[language as Language].find(
      (preset) => preset.id === e.target.value
    );
    if (selectedPreset) {
      handleChangeBackgroundState('filters', {
        preset: selectedPreset.id,
        values: selectedPreset.values,
      });
    }
  };

  // Props ==================================================================

  const backgroundControlProps = {
    handleChangeBackgroundState,
    language,
    defaultDesktopColor: storedDesktopBackgroundDefaultColor,
    displayChoicesContent,
    backgroundPreviewColor: backgroundPreviewConfig.color,
    backgroundPreviewDisplay: backgroundPreviewConfig.display,
    backgroundPreviewImage: backgroundPreviewConfig.image,
  };

  const radioProps = {
    fieldsetClassName: 'change-background__options-field border-muted ',
    legendClassName: 'change-background__display-legend ',
    radioClassName: 'change-background__display-option  cursor-pointer',
    options: displayChoicesRoot?.choices,
    onChange: handleRadioState as any,
    name: 'backgroundDisplay',
    fieldsetLegend: displayChoicesRoot?.legend,
    selectedValue: backgroundPreviewConfig.display,
  };

  const sliderFiltersProps = {
    sliderContainerClass:
      'change-background__filter-slider-container border-none p-1 gap-1',
    sliderValuesHandler: handleFilterValue,
    sliderLabelClass: 'change-background__filter-slider-label',
    fieldsetClass:
      backgroundPreviewConfig.display === 'image' ? 'border-none' : undefined,
    inputNumberClass: 'change-background__filter-input-number',
    sliderObjectData: displayChoicesContent?.settings?.filter?.options || {},
    sliderInitialValues: backgroundPreviewConfig.filters.values,
  };

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

  // JSX ====================================================================

  return (
    <div className="change-background__container ">
      <div className="change-background__wrapper">
        <main className="change-background__main">
          <h3 className="change-background__title">
            {displayChoicesContent?.title}
          </h3>

          <DesktopBackgroundPreview
            backgroundPreviewConfig={backgroundPreviewConfig}
            className={'change-background__preview'}
          />
        </main>
        <aside className="change-background__aside border-muted">
          <header className="change-background__aside-header">
            <h3>{displayChoicesContent?.settings?.title}</h3>
            <Radio {...radioProps} />
          </header>
          <main className="change-background__aside-main ">
            {backgroundPreviewConfig.display === 'image' ? (
              <fieldset className="change-background__filter-field border-muted">
                <legend className="margin-left-2 ">
                  {displayChoicesContent?.settings?.filter?.legend}
                </legend>
                <label
                  htmlFor="filterSelector"
                  className="flex gap-1 margin-bottom-1"
                  area-label={
                    language === 'por'
                      ? 'Filtros Predefinidos'
                      : 'Preset Filters'
                  }
                  title={
                    language === 'por'
                      ? 'Filtros Predefinidos'
                      : 'Preset Filters'
                  }
                >
                  <p className="font-courier ">
                    {language === 'por' ? 'Predefinidos:' : 'Presets:'}
                  </p>
                  <select
                    id="filterSelector"
                    name="filterSelector"
                    aria-label={
                      language === 'por'
                        ? 'Estilo de Gradiente'
                        : 'Gradient Style'
                    }
                    title={
                      language === 'por'
                        ? 'Estilo de Gradiente'
                        : 'Gradient Style'
                    }
                    className="font-courier border-radius-3px bg-dark text-color-light"
                    onChange={handleFilterSelector}
                    value={backgroundPreviewConfig?.filters?.preset}
                  >
                    {Object.values(presetList[language] || {}).map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="change-background__filter-content-wrapper">
                  <SliderGroup {...sliderFiltersProps} />
                </div>
              </fieldset>
            ) : (
              <fieldset className="change-background__gradient-field border-muted">
                <legend>
                  {displayChoicesContent?.settings?.effect?.legend}
                </legend>
                <div className="flex gap-1 items-center">
                  <label
                    htmlFor="temporaryCheckboxId"
                    className="font-courier text-m width-6 cursor-pointer"
                  >
                    {!backgroundPreviewConfig.effect.active.includes(
                      '_disabled'
                    )
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
                        !backgroundPreviewConfig.effect.active.includes(
                          '_disabled'
                        )
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
                        onChange={(e) =>
                          handleEffectValue('inverted', e.target.checked)
                        }
                        checked={backgroundPreviewConfig.effect.inverted}
                      />
                      <p
                        className={
                          backgroundPreviewConfig.effect.active.includes(
                            '_disabled'
                          )
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        }
                      >
                        Invert
                      </p>
                    </label>
                    <label className="flex gap-1">
                      <input
                        type="checkbox"
                        disabled={backgroundPreviewConfig.effect.active.includes(
                          '_disabled'
                        )}
                        onChange={(e) =>
                          handleEffectValue('mirrored', e.target.checked)
                        }
                        checked={backgroundPreviewConfig.effect.mirrored}
                      />
                      <p
                        className={
                          backgroundPreviewConfig.effect.active.includes(
                            '_disabled'
                          )
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        }
                      >
                        Mirrored
                      </p>
                    </label>
                  </fieldset>
                  <Radio {...radioGradientProps} />
                </div>
                <Slider
                  sliderLabelClass={
                    backgroundPreviewConfig.effect.active.includes(
                      '_disabled'
                    ) || backgroundPreviewConfig.effect.active === 'radial'
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  }
                  sliderContainerClass={'flex gap-1 justify-center border-none'}
                  inputNumberClass={'change-background__gradient-field-angle'}
                  sliderValue={backgroundPreviewConfig.effect.angle}
                  sliderData={{
                    id: 'angle',
                    label: 'Angle',
                    min: 0,
                    max: 360,
                    step: 1,
                    default: 0,
                  }}
                  sliderValuesHandler={handleAngleValue}
                  disabled={
                    backgroundPreviewConfig.effect.active.includes(
                      '_disabled'
                    ) || backgroundPreviewConfig.effect.active === 'radial'
                  }
                />
              </fieldset>
            )}
            <BackgroundControl {...backgroundControlProps} />
          </main>
          <footer className="change-background__aside-footer border-muted">
            <Button
              onClick={handleApplyChanges}
              className={'change-background__save-button'}
              variant="primary"
            >
              {language === 'eng' ? 'Save' : 'Salvar'}
            </Button>
          </footer>
        </aside>
      </div>
    </div>
  );
};

export default React.memo(ChangeBackgroundMenu);
