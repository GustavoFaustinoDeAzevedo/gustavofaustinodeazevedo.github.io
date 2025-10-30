import { SliderGroup } from '@/components/ui';
import { FilterValues, Language } from '@/store/slices/settings';
import { useCallback } from 'react';

interface BackgroundControlFilterProps {
  displayChoicesContent: any;
  language: string;
  presetList: any;
  backgroundPreviewConfig: any;
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
  const handleFilterSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = presetList[language as Language].find(
      (preset: any) => preset.id === e.target.value
    );
    if (selectedPreset) {
      handleChangeBackgroundState('filters', {
        preset: selectedPreset.id,
        values: selectedPreset.values,
      });
    }
  };

  const handleFilterValue = useCallback(
    (key: keyof FilterValues, value: number | string) => {
      setBackgroundPreviewConfig((prev: any) => {
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
          value={backgroundPreviewConfig?.filters?.preset}
        >
          {Object.values(presetList[language] || {}).map((preset: any) => (
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
