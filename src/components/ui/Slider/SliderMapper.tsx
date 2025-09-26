import { useRef } from 'react';
import SliderItem from './SliderItem';

type SliderMapData = {
  sliderObjectData: Record<string, any>;
  sliderInitialValues: Record<string, number>;
  sliderContainerClass?: string;
  sliderLabelClass?: string;
  inputNumberClass?: string;
  fieldsetClass?: string;
  fieldsetLegendClassName?: string;
  fieldsetLegend?: string;
  sliderValuesHandler: any;
};

const SliderMapper = ({
  fieldsetClass,
  fieldsetLegendClassName,
  fieldsetLegend,
  sliderObjectData,
  sliderContainerClass,
  sliderLabelClass,
  sliderInitialValues,
  inputNumberClass,
  sliderValuesHandler,
}: SliderMapData) => {
  return (
    <fieldset className={fieldsetClass ?? 'border-none'}>
      {fieldsetLegend && (
        <legend className={fieldsetLegendClassName}>{fieldsetLegend}</legend>
      )}
      {Object.keys(sliderObjectData).map((key, index) => (
        <SliderItem
          key={`slider-item-${sliderObjectData[key].id}--${index}`}
          sliderData={sliderObjectData[key]}
          sliderValue={sliderInitialValues[key]}
          sliderValuesHandler={sliderValuesHandler}
          sliderContainerClass={sliderContainerClass ?? ''}
          sliderLabelClass={sliderLabelClass ?? ''}
          inputNumberClass={inputNumberClass ?? ''}
          index={key}
        />
      ))}
    </fieldset>
  );
};

export default SliderMapper;
