import React, { use, useCallback, useMemo, useState } from 'react';
import SliderItem from './SliderItem';

type SliderMapData = {
  sliderObjectData: Record<string, any>;
  sliderInitialValues: Record<string, number>;
  sliderContainerClass?: string;
  sliderLabelClass?: string;
  inputNumberClass?: string;
  handleParentValues: any;
};

const SliderMapper = ({
  sliderObjectData,
  sliderContainerClass,
  sliderLabelClass,
  sliderInitialValues,
  inputNumberClass,
  handleParentValues,
}: SliderMapData) => {
  const handleSliderChange = useCallback(
    ({ key, value }: { key: string; value: number }) =>
      handleParentValues({ key, value }),
    []
  );

  return (
    <>
      {Object.keys(sliderObjectData).map((key, index) => {
        const sliderValue = useMemo(
          () => sliderInitialValues[key],
          [sliderInitialValues[key]]
        );
        return (
          <SliderItem
            key={`slider-item-${sliderObjectData[key].id}-${index}`}
            sliderData={sliderObjectData[key]}
            sliderValue={sliderValue}
            onSliderChange={handleSliderChange}
            sliderContainerClass={sliderContainerClass ?? ''}
            sliderLabelClass={sliderLabelClass ?? ''}
            inputNumberClass={inputNumberClass ?? ''}
            index={index}
          />
        );
      })}
    </>
  );
};

export default SliderMapper;
