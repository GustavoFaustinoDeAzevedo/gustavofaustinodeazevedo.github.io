// src/hooks/useWindowActions.js
import { useDispatch } from 'react-redux';
import { openWindow, closeWindow, focusWindow, updateWindow, resetFocus } from '../slices/windowSlice';

const useWindowActions = () => {
  const dispatch = useDispatch();

  const handleUpdateWindow = (windowData) => {
    dispatch(updateWindow(windowData));
  };

  const handleOpenWindow = (id, title, icon, src, filesData,isUnique) => {
    dispatch(openWindow({ id, title, icon, src, filesData, isUnique }));
  };

  const handleFocusWindow = (id) => {
    dispatch(focusWindow(id));
  };

  const handleCloseWindow = (id) => {
    dispatch(closeWindow(id));
  };

  const handleResetFocus = () => {
    dispatch(resetFocus());
  };

  return { handleOpenWindow, handleCloseWindow, handleFocusWindow, handleResetFocus, handleUpdateWindow };
};

export default useWindowActions;
