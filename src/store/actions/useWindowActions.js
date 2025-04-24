// src/hooks/useWindowActions.js
import { useDispatch } from 'react-redux';
import { openWindow, closeWindow, focusWindow, maximizeWindow, minimizeWindow, restoreWindow, resetFocus } from '../slices/windowSlice';

const useWindowActions = () => {
  const dispatch = useDispatch();

  const handleWindowUpdate = (data) => {
    dispatch(updateWindow(data));
  }

  const handleOpenWindow = (id, title, icon) => {
    dispatch(openWindow({ id, title, icon }));
  };

  const handleFocusWindow = (id) => {
    dispatch(focusWindow(id));
  };

  const handleCloseWindow = (id) => {
    dispatch(closeWindow(id));
  };

  const handleMaximizeWindow = (id) => {
    dispatch(maximizeWindow(id));
  };

  const handleMinimizeWindow = (id) => {
    dispatch(minimizeWindow(id));
  };

  const handleRestoreWindow = (id) => {
    dispatch(restoreWindow(id));
  }

  const handleResetFocus = () => {
    dispatch(resetFocus());
  }
  return { handleOpenWindow, handleCloseWindow, handleFocusWindow, handleMaximizeWindow, handleMinimizeWindow, handleResetFocus, handleRestoreWindow };
};

export default useWindowActions;
