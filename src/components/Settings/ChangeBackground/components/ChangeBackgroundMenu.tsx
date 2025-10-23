//TODO: Adicionar opções para gradiente assim como a visualização

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { changeBackgroundTextContent } from '../data/changeBackground.data';
import actions from '@/store/actions';
import BackgroundControl from './BackgroundControl';

import {
  BackgroundPreviewDisplay,
  ChangeBackgroundProps,
} from '../types/changeBackground.types';
import { Slider, Radio, Button } from '@/components/ui';
import {
  EffectValue,
  EffectValues,
  FilterValues,
  Language,
} from '@/store/slices/settings';
import DesktopBackgroundPreview from './BackgroundPreview';

export interface BackgroundPreviewConfig {
  isBackgroundPreviewImage: boolean;
  display: BackgroundPreviewDisplay;
  color: string;
  image: string;
  effect: EffectValues;
  filters: FilterValues;
}

const ChangeBackgroundMenu = ({
  handleUpdateWindowContent,
  language,
  content,
}: ChangeBackgroundProps) => {
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
            [key]: value,
          },
        };
      });
    },
    [setBackgroundPreviewConfig, backgroundPreviewConfig.filters]
  );

  const handleEffectValue = useCallback(
    (key: keyof EffectValues, value: number | string) => {
      setBackgroundPreviewConfig((prev) => {
        if (prev.effect.gradient[key as keyof EffectValue] === value)
          return prev;
        return {
          ...prev,
          effect: {
            ...prev.effect,
            gradient: {
              ...prev.effect.gradient,
              [key]: value,
            },
          },
        };
      });
    },
    [setBackgroundPreviewConfig, backgroundPreviewConfig.effect]
  );

  // handlers ================================================================

  const { handleChangeBackground } = actions.useSettingsActions();

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

  const handleSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeBackgroundState('effect', {
      ...backgroundPreviewConfig?.effect,
      active: e.target.value,
    });
  };

  // Props ==================================================================

  const backgroundControlProps = {
    handleChangeBackgroundState,
    handleUpdateWindowContent,
    language,
    content,
    defaultDesktopColor: storedDesktopBackgroundDefaultColor,
    displayChoicesContent,
    backgroundPreviewColor: backgroundPreviewConfig.color,
    backgroundPreviewDisplay: backgroundPreviewConfig.display,
    backgroundPreviewImage: backgroundPreviewConfig.image,
  };

  const radioProps = {
    fieldsetClassName: 'change-background__options-field border-muted',
    legendClassName: 'change-background__display-legend',
    radioClassName: 'change-background__display-option',
    options: displayChoicesRoot?.choices,
    onChange: handleRadioState as any,
    name: 'backgroundDisplay',
    fieldsetLegend: displayChoicesContent?.label,
    selectedValue: backgroundPreviewConfig.display,
  };

  const sliderFiltersProps = {
    sliderContainerClass:
      'change-background__filter-slider-container border-none p-1 gap-1',
    sliderValuesHandler: handleFilterValue,
    sliderLabelClass: 'change-background__filter-slider-label',
    fieldsetClass:
      backgroundPreviewConfig.display === 'image' ? 'border-none' : undefined,
    // fieldsetLegend:
    //   backgroundPreviewConfig.display === 'image'
    //     ? displayChoicesContent?.settings?.filter?.legend
    //     : undefined,
    inputNumberClass: 'change-background__filter-input-number',
    sliderObjectData: displayChoicesContent?.settings?.filter?.options || {},
    sliderInitialValues: backgroundPreviewConfig.filters,
  };

  const sliderEffectsProps = {
    sliderContainerClass: 'change-background__effect-slider-container',
    sliderValuesHandler: handleEffectValue,
    sliderLabelClass: 'change-background__effect-slider-label',
    fieldsetClass: 'border-none',
    fieldsetLegend: '',
    inputNumberClass: 'change-background__effect-input-number',
    sliderObjectData: displayChoicesContent?.settings?.filter?.options || {},
    sliderInitialValues: backgroundPreviewConfig?.effect?.gradient,
    ignoredList: ['conic', 'radial', 'linear'].filter(
      (item) => item !== backgroundPreviewConfig?.effect?.active
    ),
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
            className={'change-background__preview border-muted'}
          />
        </main>
        <aside className="change-background__aside border-muted">
          <header className="change-background__aside-header">
            <h3>{displayChoicesContent?.settings?.title}</h3>
          </header>
          <main className="change-background__aside-main ">
            <Radio {...radioProps} />
            {backgroundPreviewConfig.display === 'image' ? (
              <fieldset className="change-background__filter-field border-muted">
                <legend className="margin-left-2">
                  {displayChoicesContent?.settings?.filter?.legend}
                </legend>
                <div className="change-background__filter-content-wrapper border-muted overflow-y-scroll ">
                  <Slider {...sliderFiltersProps} />
                </div>
              </fieldset>
            ) : (
              ''
              // <fieldset className="change-background__filter-field border-muted">
              //   <legend>
              //     {displayChoicesContent?.settings?.filter?.legend}
              //   </legend>
              //   <select
              //     aria-label={
              //       language === 'por'
              //         ? 'Estilo de Gradiente'
              //         : 'Gradient Style'
              //     }
              //     title={
              //       language === 'por'
              //         ? 'Estilo de Gradiente'
              //         : 'Gradient Style'
              //     }
              //     className="font-courier border-radius-3px bg-dark txt-color-light"
              //     onChange={handleSelector}
              //     value={backgroundPreviewConfig?.effect?.active}
              //   >
              //     {Object.values(
              //       displayChoicesContent?.settings?.filter?.options || {}
              //     ).map((option) => (
              //       <option key={option.id} value={option.id}>
              //         {option.label}
              //       </option>
              //     ))}
              //   </select>
              //   {backgroundPreviewConfig?.effect?.active !== 'none' && (
              //     <Slider {...sliderEffectsProps} />
              //   )}
              // </fieldset>
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
