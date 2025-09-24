import { FilterData } from '../../Settings/ChangeBackground/types/changeBackground.data.types';
import React, { useMemo } from 'react';

type SliderItemProps = {
  sliderData: FilterData;
  sliderValue: number;
  onSliderChange: ({ key, value }: { key: string; value: number }) => void;
  sliderContainerClass: string;
  sliderLabelClass: string;
  inputNumberClass: string;
  index: number;
};

const SliderItem = ({
  sliderData,
  sliderValue,
  onSliderChange,
  sliderContainerClass,
  sliderLabelClass,
  inputNumberClass,
  index,
}: SliderItemProps) => {
  return (
    <div className={sliderContainerClass}>
      <label htmlFor="slider" className={sliderLabelClass}>
        {sliderData?.label}
      </label>
      <input
        title={sliderData?.label}
        type="range"
        id={`slider-${sliderData?.id}-${index}`}
        min={sliderData?.min}
        max={sliderData?.max}
        step={sliderData?.step}
        value={sliderValue}
        onChange={(e) =>
          onSliderChange({ key: sliderData.id, value: e.target.valueAsNumber })
        }
      />
      <input
        title={sliderData?.label}
        id={`number-${sliderData?.id}-${index}`}
        className={inputNumberClass}
        type="number"
        value={
          Number(sliderData?.step) < 1
            ? Number(sliderValue).toFixed(2)
            : sliderValue
        }
        min={sliderData?.min}
        max={sliderData?.max}
        step={sliderData?.step}
        onChange={(e) => {
          const value = e.target.valueAsNumber;
          if (!isNaN(value)) {
            onSliderChange({ key: sliderData.id, value });
          }
        }}
      />
    </div>
  );
};

export default React.memo(SliderItem);
