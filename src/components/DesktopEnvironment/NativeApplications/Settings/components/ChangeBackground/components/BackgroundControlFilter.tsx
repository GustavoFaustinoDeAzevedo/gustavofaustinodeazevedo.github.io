import { SliderGroup } from '@components/DesktopEnvironment';
import { Filters, FilterValues, Language } from '@/store/slices/settings';
import { ChangeEvent, useCallback, useState } from 'react';
import { Preset, PresetList } from '../data/imageFilters.data';
import { BackgroundPreviewConfig } from './BackgroundPreferences';
import { ImageChoice } from '../types/changeBackground.data.types';

interface BackgroundControlFilterProps {
  displayChoicesContent: ImageChoice;
  language: string;
  presetList: PresetList;
  backgroundPreviewConfig: BackgroundPreviewConfig;
  handleChangeBackgroundState: any;
  setBackgroundPreviewConfig: any;
}

const BackgroundControlFilter = ({
  displayChoicesContent,
  language,
  presetList,
  backgroundPreviewConfig,
  handleChangeBackgroundState,
  setBackgroundPreviewConfig,
}: BackgroundControlFilterProps) => {
  const [selectorValue, setSelectorValue] = useState(
    backgroundPreviewConfig?.filters?.preset,
  );
  const [customValues, setCustomValues] = useState(
    backgroundPreviewConfig.filters.custom,
  );
  const handleFilterSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = presetList[language as keyof typeof presetList].find(
      (preset: Preset) => preset.id === e.target.value,
    );
    if (selectedPreset) {
      setSelectorValue(selectedPreset.id);
      handleChangeBackgroundState('filters', {
        preset: selectedPreset.id,
        custom: customValues,
        values:
          selectedPreset.id === 'custom' ? customValues : selectedPreset.values,
      });
    }
  };

  const handleFilterValue = useCallback(
    (key: keyof FilterValues, value: number | string) => {
      setBackgroundPreviewConfig((prev: BackgroundPreviewConfig) => {
        if (prev.filters[key as keyof FilterValues] === value) return prev;
        return {
          ...prev,
          filters: {
            ...prev.filters,
            custom: { ...prev.filters.custom, [key]: value },
            values: {
              ...prev.filters.values,
              [key]: value,
            },
          },
        };
      });
      setCustomValues((prev) => {
        return { ...prev, [key]: value };
      });
    },
    [setBackgroundPreviewConfig, backgroundPreviewConfig.filters],
  );

  const handleFilterSliderChange = useCallback(() => {
    if (selectorValue === 'custom') return;
    setSelectorValue('custom');

    setBackgroundPreviewConfig((prev: BackgroundPreviewConfig) => {
      return {
        ...prev,
        filters: {
          ...prev.filters,
          custom: { ...prev.filters.values },
          preset: 'custom',
        },
      };
    });
  }, [selectorValue]);

  const sliderFiltersProps = {
    sliderContainerClass:
      'change-background__filter-slider-container border-none p-1 gap-1',
    sliderValuesHandler: handleFilterValue,
    onChange: handleFilterSliderChange,
    sliderLabelClass: 'change-background__filter-slider-label',
    fieldsetClass:
      backgroundPreviewConfig.display === 'image' ? 'border-none' : undefined,
    inputNumberClass: 'change-background__filter-input-number',
    sliderObjectData: displayChoicesContent?.settings?.filter?.options || {},
    sliderInitialValues:
      selectorValue === 'custom'
        ? backgroundPreviewConfig.filters.custom
        : backgroundPreviewConfig.filters.values,
  };

  return (
    <fieldset className="change-background__filter-field border-muted">
      <legend className="margin-left-2 ">
        {displayChoicesContent?.settings?.filter?.legend}
      </legend>
      <label
        htmlFor="filterSelector"
        className="flex gap-1 margin-bottom-1"
        area-label={
          language === 'por' ? 'Filtros Predefinidos' : 'Preset Filters'
        }
        title={language === 'por' ? 'Filtros Predefinidos' : 'Preset Filters'}
      >
        <p className="font-courier ">
          {language === 'por' ? 'Predefinidos:' : 'Presets:'}
        </p>
        <select
          id="filterSelector"
          name="filterSelector"
          aria-label={
            language === 'por' ? 'Estilo de Gradiente' : 'Gradient Style'
          }
          title={language === 'por' ? 'Estilo de Gradiente' : 'Gradient Style'}
          className="font-courier border-radius-3px bg-dark text-color-light"
          onChange={handleFilterSelector}
          value={selectorValue}
        >
          {Object.values(
            presetList[language as keyof typeof presetList] || {},
          ).map((preset: Preset) => (
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
  );
};

export default BackgroundControlFilter;
