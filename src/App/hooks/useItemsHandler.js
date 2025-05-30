import { useCallback } from 'react';
import { contextMenuData } from '../../data/contextMenuData';
import { useSelector } from 'react-redux';

export const useItemsHandler = () => {
  const contextMenu = useSelector((state) => state.contextMenu);

  return useCallback(() => {
    const { target } = contextMenu;
    const finalTarget = target?.closest?.('.parent');
    const dataInfo = finalTarget?.dataset?.info
      ? JSON.parse(finalTarget.dataset.info)
      : {};

    const targetContextId = dataInfo?.targetContextId || 'default';

    const firstScope = contextMenuData.find(
      (data) => data.targetContextId === targetContextId
    );

    return firstScope?.actions || contextMenuData[0]?.actions || [];
  }, [contextMenu]);
};
