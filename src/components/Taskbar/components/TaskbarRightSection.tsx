import Clock from './Clock';
import LanguageSelector from './LanguageSelector';

type TaskbarRightSectionProps = {
  handleChangeDoubleCkick: (value: boolean) => void;
  isMobile: boolean;
  toggleMenuVisibility: (menuKey: string) => void;
  language: 'eng' | 'por';
  handleChangeLanguage: (lang: 'eng' | 'por') => void;
  isDoubleClick: boolean;
};

const TaskbarRightSection = ({
  handleChangeDoubleCkick,
  isMobile,
  toggleMenuVisibility,
  language,
  handleChangeLanguage,
  isDoubleClick,
}: TaskbarRightSectionProps) => {
  return (
    <section className="taskbar-right-section">
      {!isMobile && (
        <label className="container">
          {language === 'eng'
            ? `Double Click To Open Files`
            : `Duplo Clique Para Abrir Arquivos`}
          <input
            type="checkbox"
            checked={isDoubleClick}
            onChange={() => handleChangeDoubleCkick(!isDoubleClick)}
          />
          <span className="checkmark"></span>
        </label>
      )}
      <LanguageSelector
        isMobile={isMobile}
        language={language}
        onChangeLanguage={handleChangeLanguage}
      />
      <Clock />
      {/* <BatteryStatus /> */}
    </section>
  );
};

export default TaskbarRightSection;
