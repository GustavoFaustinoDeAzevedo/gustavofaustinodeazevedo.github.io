import DesktopIcon from '../../components/DesktopIcon';
import { placeholder } from '../../data/desktopIconsData';

const createIconsList = (
  language,
  windowList,
  desktopIconsData,
  desktopIconsActions,
  handleOpenWindow
) => {
  const handleAddIcon = desktopIconsActions.handleNewDesktopIcon;

  const handleOnClick = (id, windowTitle, windowIcon, src) => {
    if (windowTitle === 'Novo' || windowTitle === 'New') {
      handleAddIcon(placeholder);
    } else {
      try {
        if (!windowList.find((win) => win.id === id)) {
          handleOpenWindow(id, windowTitle, windowIcon, src);
        }
      } catch (error) {
        console.error('Error opening window:', error);
      }
    }
  };
  return desktopIconsData.map(({ id, title, icon, windowParams }, index) => {
    const iconTitle = language === 'POR' ? title.por : title.eng;
    let windowTitle = iconTitle;
    let windowIcon = icon;
    let src = '';
    if (windowParams) {
      windowTitle =
        language === 'POR' ? windowParams.title.por : windowParams.title.eng;
      windowIcon = windowParams.icon;
      src = windowParams.src || '';
    }
    return (
      <DesktopIcon
        key={`desktop-icon-${id}-${index}`}
        id={id}
        title={iconTitle}
        icon={icon}
        language={language}
        onClick={() => handleOnClick(id, windowTitle, windowIcon, src)}
      />
    );
  });
};

export default createIconsList;
