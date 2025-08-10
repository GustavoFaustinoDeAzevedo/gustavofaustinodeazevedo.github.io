import CustomColorPicker from './CustomColorPicker';
import CustomImagePicker from './CustomImagePicker';
import { Choice } from '../data/changeBackground.data';

interface BackgroundControlProps {
  handleChangeBackground: (value: string) => void;
  handleUpdateWindowContent: (content: string) => void;
  language: string;
  backgroundImage: string;
  desktopBackgroundColor: string;
  defaultDesktopColor: string;
  displayChoicesContent: Choice;
  backgroundDisplay: 'image' | 'color';
  colorTitle?: string;
}

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
