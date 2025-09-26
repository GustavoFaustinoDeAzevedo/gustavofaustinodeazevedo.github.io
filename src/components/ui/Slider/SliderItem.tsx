import { FilterData } from '../../Settings/ChangeBackground/types/changeBackground.data.types';
import React, { useCallback } from 'react';

type SliderItemProps = {
  sliderData: FilterData;
  sliderValue: number;
  sliderValuesHandler: any;
  sliderContainerClass: string;
  sliderLabelClass: string;
  inputNumberClass: string;
  index: string;
};

const SliderItem = React.memo(
  ({
    sliderData,
    sliderValue,
    sliderValuesHandler,
    sliderContainerClass,
    sliderLabelClass,
    inputNumberClass,
    index,
  }: SliderItemProps) => {
    if (!sliderData) return null;
    const displayValue = sliderValue.toFixed(sliderData?.step < 1 ? 2 : 0);
    const handlerOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        sliderValuesHandler(index, e.target.valueAsNumber),
      [index, sliderValuesHandler]
    );
    return (
      <div className={sliderContainerClass}>
        <label htmlFor="slider" className={sliderLabelClass}>
          {sliderData.label}
        </label>
        <input
          title={sliderData.label}
          type="range"
          key={`slider-${sliderData.id}-${index}`}
          id={`slider-${sliderData.id}-${index}`}
          min={sliderData.min}
          max={sliderData.max}
          step={sliderData.step}
          value={sliderValue}
          onChange={handlerOnChange}
        />
        <input
          title={sliderData.label}
          id={sliderData.id}
          key={`number-${sliderData.id}-${index}`}
          className={inputNumberClass}
          type="number"
          value={displayValue}
          min={sliderData.min}
          max={sliderData.max}
          step={sliderData.step}
          onChange={handlerOnChange}
        />
      </div>
    );
  }
);

export default SliderItem;
