import { useState } from 'react';
import { FilterList } from '../types/changeBackground.data.types';
import SliderItem from './SliderItem';

type SliderMapData = {
  sliderObjectData: FilterList;
  sliderContainerClass: string;
  sliderLabelClass: string;
  inputNumberClass: string;
};

const SliderMapper = ({
  sliderObjectData,
  sliderContainerClass,
  sliderLabelClass,
  inputNumberClass,
}: SliderMapData) => {
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(
    () => {
      const initialValues: Record<string, number> = {};
      Object.values(sliderObjectData).forEach((item) => {
        console.log(item);
        initialValues[item.id] = item.default ?? 0;
      });
      console.log(initialValues);
      return initialValues;
    }
  );

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <>
      {Object.values(sliderObjectData).map((sliderData, index) => (
        <SliderItem
          key={`slider-item-${sliderData.id}-${index}`}
          sliderData={sliderData}
          sliderValue={sliderValues[sliderData.id]}
          onSliderChange={handleSliderChange}
          sliderContainerClass={sliderContainerClass}
          sliderLabelClass={sliderLabelClass}
          inputNumberClass={inputNumberClass}
          index={index}
        />
      ))}
    </>
  );
};

export default SliderMapper;
