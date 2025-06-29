// src/hooks/useWindowActions.js
import { useDispatch } from 'react-redux';
import { openWindow, closeWindow, focusWindow, updateWindow, resetFocus } from '../slices/windowSlice';

const useWindowActions = () => {
  const dispatch = useDispatch();

  const handleUpdateWindow = (windowData) => {
    dispatch(updateWindow(windowData));
  };

  const handleOpenWindow = (windowData) => {
    const data = typeof windowData === 'string' ? JSON.parse(windowData) : windowData;
    const { id, title, icon, src, children, isUnique, type, index } = data;
    dispatch(openWindow({ id, title, icon, src, children, isUnique, type, index }));
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
