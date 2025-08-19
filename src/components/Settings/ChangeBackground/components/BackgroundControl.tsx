import CustomColorPicker from './CustomColorPicker';
import CustomImagePicker from './CustomImagePicker';
import { ChangeBackgroundProps } from '../types/changeBackground.types';

const BackgroundControl = ({
  handleChangeBackground,
  handleUpdateWindowContent,
  language,
  backgroundImage,
  desktopBackgroundColor,
  defaultDesktopColor,
  displayChoicesContent,
  backgroundDisplay,
}: ChangeBackgroundProps) => {
  return backgroundDisplay === 'image' ? (
    <div className="change-background__picker-wrapper">
      <CustomImagePicker
        handleChangeBackground={handleChangeBackground}
        handleUpdateWindowContent={handleUpdateWindowContent}
        language={language}
        displayChoicesContent={displayChoicesContent}
        backgroundImage={backgroundImage}
      />
    </div>
  ) : (
    <div className="change-background__picker-wrapper">
      <CustomColorPicker
        backgroundColor={desktopBackgroundColor}
        handleChangeBackground={handleChangeBackground}
        defaultDesktopColor={defaultDesktopColor}
        displayChoicesContent={displayChoicesContent}
      />
    </div>
  );
};

export default BackgroundControl;
