import { useState } from 'react';
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
  // const [sliderValues, setSliderValues] =
  //   useState<Record<string, number>>(sliderInitialValues);

  // const handleSliderChange = (key: string, value: number) => {
  //   setSliderValues((prev) => ({
  //     ...prev,
  //     [key]: value,
  //   }));
  //   parentValuesHandler(sliderValues);
  // };

  return (
    <>
      {Object.keys(sliderObjectData).map((key, index) => (
        <SliderItem
          key={`slider-item-${sliderObjectData[key].id}-${index}`}
          sliderData={sliderObjectData[key]}
          sliderValue={sliderInitialValues[key]} //{sliderValues[sliderData.id]}
          onSliderChange={({ key, value }: { key: string; value: number }) =>
            handleParentValues({ key, value })
          }
          sliderContainerClass={sliderContainerClass ?? ''}
          sliderLabelClass={sliderLabelClass ?? ''}
          inputNumberClass={inputNumberClass ?? ''}
          index={index}
        />
      ))}
    </>
  );
};

export default SliderMapper;
