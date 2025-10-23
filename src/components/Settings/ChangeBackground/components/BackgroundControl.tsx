import CustomColorPicker from './CustomColorPicker';
import CustomImagePicker from './CustomImagePicker';
import { ChangeBackgroundProps } from '../types/changeBackground.types';

const BackgroundControl = ({
  handleChangeBackgroundState,
  handleUpdateWindowContent,
  language,
  backgroundPreviewImage,
  backgroundPreviewColor,
  defaultDesktopColor,
  displayChoicesContent,
  backgroundPreviewDisplay,
}: ChangeBackgroundProps) => {
  return (
    <fieldset className="change-background__picker-field border-muted">
      <legend>{displayChoicesContent?.settings?.picker?.legend}</legend>
      {backgroundPreviewDisplay === 'image' ? (
        <div className="change-background__picker-wrapper">
          <CustomImagePicker
            handleChangeBackgroundState={handleChangeBackgroundState}
            handleUpdateWindowContent={handleUpdateWindowContent}
            language={language}
            displayChoicesContent={displayChoicesContent}
            backgroundPreviewImage={backgroundPreviewImage}
          />
        </div>
      ) : (
        <div className="change-background__picker-wrapper">
          <CustomColorPicker
            language={language}
            backgroundColor={backgroundPreviewColor}
            handleChangeBackground={handleChangeBackgroundState}
            defaultDesktopColor={defaultDesktopColor}
            displayChoicesContent={displayChoicesContent}
          />
        </div>
      )}
    </fieldset>
  );
};

export default BackgroundControl;
