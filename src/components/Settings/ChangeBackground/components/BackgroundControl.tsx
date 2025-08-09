import CustomColorPicker from './CustomColorPicker';
import CustomImagePicker from './CustomImagePicker';
import { Choice } from '../data/changeBackgroundTextContent';

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
    <div className="change-background__aside-picker">
      <CustomImagePicker
        handleChangeBackground={handleChangeBackground}
        handleUpdateWindowContent={handleUpdateWindowContent}
        language={language}
        displayChoicesContent={displayChoicesContent}
        backgroundImage={backgroundImage}
      />
    </div>
  ) : (
    <div className="change-background__aside-picker">
      <p>{displayChoicesContent?.settings?.picker?.legend}</p>
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
