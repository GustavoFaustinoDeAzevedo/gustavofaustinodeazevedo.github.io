import DesktopIcon from '../components/DesktopIcon';
import { placeholder } from '../data/desktopIconsData';

const useDesktopIconsList = (
  language,
  windowList,
  desktopIconsData,
  desktopIconsActions,
  handleOpenWindow
) => {
  const handleAddIcon = desktopIconsActions.handleNewDesktopIcon;

  const handleOnClick = (id, finalTitle, icon) => {
    if (finalTitle === 'Novo' || finalTitle === 'New') {
      handleAddIcon(placeholder);
    } else {
      try {
        if (!windowList.find((win) => win.id === id)) {
          handleOpenWindow(id, finalTitle, icon);
        }
      } catch (error) {
        console.error('Error opening window:', error);
      }
    }
  };
  return desktopIconsData.map(({ id, title, icon }, index) => {
    const finalTitle = language === 'POR' ? title.por : title.eng;
    return (
      <DesktopIcon
        key={`desktop-icon-${id}-${index}`}
        id={id}
        title={finalTitle}
        icon={icon}
        language={language}
        onClick={() => handleOnClick(id, finalTitle, icon)}
      />
    );
  });
};

export default useDesktopIconsList;
