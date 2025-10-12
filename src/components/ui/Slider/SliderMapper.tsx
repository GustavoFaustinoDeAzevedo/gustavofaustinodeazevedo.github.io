import SliderItem from './SliderItem';

type SliderMapData = {
  sliderObjectData: Record<string, any>;
  sliderInitialValues: Record<string, number> | number[] | any;

  sliderContainerClass?: string;
  sliderLabelClass?: string;
  inputNumberClass?: string;
  fieldsetClass?: string;
  fieldsetLegendClassName?: string;
  fieldsetLegend?: string;
  sliderValuesHandler: any;
  inputNumberActive?: boolean[] | boolean | any;
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
  inputNumberActive,
}: SliderMapData) => {
  return (
    <fieldset className={fieldsetClass ?? 'border-none flex-column gap-2'}>
      {fieldsetLegend && (
        <legend className={fieldsetLegendClassName}>{fieldsetLegend}</legend>
      )}
      {Object.keys(sliderObjectData).map((key, index) => (
        <SliderItem
          key={`slider-item-${sliderObjectData[key].id}--${index}`}
          sliderData={sliderObjectData[key]}
          sliderValue={sliderInitialValues[key]}
          sliderValuesHandler={sliderValuesHandler}
          sliderContainerClass={sliderContainerClass}
          sliderLabelClass={sliderLabelClass}
          inputNumberClass={inputNumberClass}
          index={key}
          inputNumberActive={inputNumberActive}
        />
      ))}
    </fieldset>
  );
};

export default SliderMapper;
