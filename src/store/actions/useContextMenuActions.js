import { useDispatch } from 'react-redux';
import { showContextMenu, hideContextMenu } from '../slices/contextMenuSlice';

const useContextMenuActions = () => {
  const dispatch = useDispatch();

  const handleOpenContextMenu = (x, y, target, element) => {
    dispatch(showContextMenu({ x, y, target, element }));
  };

  const handleHideContextMenu = () => {
    dispatch(hideContextMenu());
  };
  return { handleOpenContextMenu, handleHideContextMenu };
};

export default useContextMenuActions;
