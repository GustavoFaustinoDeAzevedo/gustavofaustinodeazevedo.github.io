import Toggle, { ToggleProps } from './Toggle';

interface ToggleListProps {
  toggles: ToggleProps[];
}

const ToggleList = (
  toggles: ToggleListProps,
  gap: number = 2,
  containerClassName: string = `flex flex-col gap-${gap}`,
) => {
  const toggleListMap =
    Array.isArray(toggles) &&
    toggles.map((toggle: ToggleProps, index: number) => (
      <Toggle
        index={index}
        handleToggle={toggle.handleToggle}
        label={toggle.label}
        isChecked={toggle.isChecked}
        isEnabled={toggle.isEnabled}
        classContainer={toggle.classContainer}
        classBorder={toggle.classBorder}
        classLabel={toggle.classLabel}
        cursor={toggle.cursor}
      />
    ));
  return <ul className={containerClassName}>{toggleListMap}</ul>;
};

export default ToggleList;
