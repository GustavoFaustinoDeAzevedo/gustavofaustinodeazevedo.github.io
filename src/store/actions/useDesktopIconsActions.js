import { useDispatch } from 'react-redux';
import { addDesktopIcon, removeDesktopIcon, sortDesktopIcons } from '../slices/desktopIconSlice';


const useDesktopIconsActions = () => {
  const dispatch = useDispatch();

  const handleNewDesktopIcon = (newIconData) => {
    dispatch(addDesktopIcon(newIconData));
  };

  const handleRemoveDesktopIcon = (iconDataToRemove) => {
    dispatch(removeDesktopIcon(iconDataToRemove));
  };

  const handleSortIcons = () => {
    dispatch(sortDesktopIcons());
  };
  return { handleNewDesktopIcon, handleRemoveDesktopIcon, handleSortIcons };
};

export default useDesktopIconsActions;