import { useCallback } from 'react';
import actions from '../../store/actions';

const useHandleContextMenu = () => {
  const contextMenuActions = actions.useContextMenuActions();
  const handleOpenContextMenu = contextMenuActions.handleOpenContextMenu;
  return useCallback((e) => {
    if (e.target) {
      handleOpenContextMenu(
        e.clientX,
        e.clientY,
        e.target.closest('.parent') || 'default',
        e.outerHTML
      );
    }
  }, []);
};

export default useHandleContextMenu;
