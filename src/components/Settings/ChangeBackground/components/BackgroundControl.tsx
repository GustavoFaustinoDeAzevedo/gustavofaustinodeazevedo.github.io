import CustomColorPicker from './CustomColorPicker';
import CustomImagePicker from './CustomImagePicker';
import { BackgroundControlProps } from '../types/BackgroundControl.types';

const BackgroundControl: React.FC<BackgroundControlProps> = ({
  handleChangeBackground,
  handleUpdateWindowContent,
  language,
  backgroundImage,
  desktopBackgroundColor,
  defaultDesktopColor,
  displayChoicesContent,
  backgroundDisplay,
}) => {
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
