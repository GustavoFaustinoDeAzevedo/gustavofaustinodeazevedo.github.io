import { useCallback } from 'react';
import { contextMenuData } from '../data/contextMenuData';

export const useItemsHandler = (state) => {
  return useCallback(() => {
    const { target } = state.contextMenu;
    const finalTarget = target?.closest?.('.parent');
    const dataInfo = finalTarget?.dataset?.info
      ? JSON.parse(finalTarget.dataset.info)
      : {};
    const targetContextId = dataInfo?.targetContextId || 'default';

    const firstScope = contextMenuData.find(
      (data) => data.targetContextId === targetContextId
    );
    return firstScope?.actions || contextMenuData[0]?.actions || [];
  }, [state.contextMenu]);
};
