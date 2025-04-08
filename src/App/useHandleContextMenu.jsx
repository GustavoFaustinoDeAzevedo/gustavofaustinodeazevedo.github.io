import { useCallback } from 'react';
import { showContextMenu } from '../actions/windowActions';

export const useHandleContextMenu = (dispatch) => {
  return useCallback(
    (e) => {
      if (e.target) {
        showContextMenu(
          dispatch,
          e.clientX,
          e.clientY,
          e.target.closest('.parent') || 'default',
          e
        );
      }
    },
    [dispatch]
  );
};
