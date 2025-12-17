import SliderItem, { SliderData } from './SliderItem';

type SliderMapData = {
  sliderObjectData: Record<string, SliderData>;
  sliderInitialValues: Record<string, number> | number[] | any;
  sliderValuesHandler: any;

  sliderContainerClass?: string;
  sliderLabelClass?: string;
  inputNumberClass?: string;
  fieldsetClass?: string;
  fieldsetLegendClassName?: string;
  sliderClass?: string;
  accentColors?: string[];
  fieldsetLegend?: string;
  onMouseUp?: any;
  onTouchEnd?: any;
  inputNumberActive?: boolean[] | boolean | any;
  ignoredList?: string[];
  disabledList?: string[];
};

const SliderMapper = ({
  fieldsetClass,
  fieldsetLegendClassName,
  fieldsetLegend,
  sliderObjectData,
  sliderContainerClass,
  onMouseUp,
  onTouchEnd,
  accentColors,
  sliderLabelClass,
  sliderInitialValues,
  sliderClass,
  inputNumberClass,
  sliderValuesHandler,
  inputNumberActive,
  ignoredList,
  disabledList,
}: SliderMapData) => {
  if (sliderObjectData === undefined || sliderInitialValues === undefined)
    return;

  return (
    <fieldset className={fieldsetClass ?? 'border-none flex-column gap-2'}>
      {fieldsetLegend && (
        <legend className={fieldsetLegendClassName}>{fieldsetLegend}</legend>
      )}
      {Object.keys(sliderObjectData).map(
        (key: string, index: number) =>
          typeof sliderInitialValues[
            key as keyof typeof sliderInitialValues
          ] === 'number' &&
          !ignoredList?.includes(key) && (
            <SliderItem
              key={`slider-item-${sliderObjectData[key].id}--${index}`}
              sliderData={sliderObjectData[key]}
              sliderValue={
                typeof sliderInitialValues === 'number'
                  ? sliderInitialValues
                  : sliderInitialValues[key as keyof typeof sliderInitialValues]
              }
              sliderValuesHandler={sliderValuesHandler}
              sliderContainerClass={sliderContainerClass}
              sliderClass={sliderClass}
              onMouseUp={onMouseUp}
              onTouchEnd={onTouchEnd}
              accentColor={
                accentColors?.[index] ??
                (Array.isArray(sliderObjectData[key].accentColor)
                  ? ''
                  : sliderObjectData[key].accentColor)
              }
              sliderLabelClass={sliderLabelClass}
              inputNumberClass={inputNumberClass}
              index={key}
              inputNumberActive={inputNumberActive}
            />
          )
      )}
    </fieldset>
  );
};

export default SliderMapper;
