import { createRef, useMemo, useRef } from 'react';
import DesktopIcon from '../components/DesktopIcon';
import { getDesktopIconProps } from '../utils/desktopIconsProps';
import actions from '../store/actions';
import { useSelector } from 'react-redux';
import { placeholder } from '../data/desktopIconsData';
import useRefs from '../contexts/useRefs';
import { useMachine } from '@xstate/react';
import { windowMachine } from '../machines/windowMachine';

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
