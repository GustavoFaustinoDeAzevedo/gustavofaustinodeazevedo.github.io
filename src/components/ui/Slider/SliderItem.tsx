import React, { useCallback } from 'react';

export type SliderData = {
  id: string;
  label: string;
  step: number;
  min: number;
  max: number;
  default: number;
  accentColor?: string;
};

type SliderItemProps = {
  sliderData: SliderData;
  sliderValue: number;
  sliderValuesHandler: any;
  sliderContainerClass?: string;
  accentColor?: string;
  sliderLabelClass?: string;
  inputNumberClass?: string;
  onMouseUp?: any;
  onTouchEnd?: any;
  sliderClass?: string;
  index?: string;
  inputNumberActive?: boolean[] | boolean | any;
  disabled?: boolean;
};

const SliderItem = React.memo(
  ({
    sliderData,
    sliderValue,
    sliderValuesHandler,
    sliderContainerClass,
    accentColor,
    sliderLabelClass,
    inputNumberClass,
    onMouseUp,
    onTouchEnd,
    sliderClass,
    index,
    inputNumberActive = true,
    disabled = false,
  }: SliderItemProps) => {

    if (!sliderData) return null;
    if (sliderValue === undefined || isNaN(sliderValue)) return null;
    const displayValue = Number(sliderValue).toFixed(
      sliderData?.step < 1 ? 2 : 0
    );
    const handlerOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) =>
        sliderValuesHandler(index, e.target.valueAsNumber),
      [index, sliderValuesHandler]
    );
    return (
      <div
        className={
          sliderContainerClass ??
          'flex flex-space-between gap-1 flex-align-center'
        }
      >
        <label
          htmlFor="slider"
          className={sliderLabelClass ?? 'inline-block font-courier'}
        >
          {sliderData.label}
        </label>
        <input
          title={sliderData.label}
          type="range"
          className={sliderClass}
          style={{ background: accentColor }}
          key={`slider-${sliderData.id}-${index}`}
          id={`slider-${sliderData.id}-${index}`}
          onMouseUp={onMouseUp ?? null}
          onTouchEnd={onTouchEnd ?? null}
          aria-valuemin={sliderData.min}
          aria-valuemax={sliderData.max}
          min={sliderData.min}
          max={sliderData.max}
          step={sliderData.step}
          value={sliderValue}
          onChange={handlerOnChange}
          disabled={disabled}
        />
        {inputNumberActive && (
          <input
            title={sliderData.label}
            id={sliderData.id}
            key={`number-${sliderData.id}-${index}`}
            className={inputNumberClass ?? 'w-16 text-center font-courier'}
            type="number"
            value={displayValue}
            min={sliderData.min}
            max={sliderData.max}
            step={sliderData.step}
            onChange={handlerOnChange}
            disabled={disabled}
          />
        )}
      </div>
    );
  }
);

export default SliderItem;
